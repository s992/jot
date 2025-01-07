package server

import (
	"context"
	"database/sql"

	"connectrpc.com/connect"
	pb "github.com/s992/jot/internal/generated/proto/jot/v1"

	"github.com/s992/jot/internal/generated/db"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type jotService struct {
	q *db.Queries
}

func NewJotService(q *db.Queries) *jotService {
	return &jotService{q: q}
}

func (s *jotService) CreateJot(ctx context.Context, req *connect.Request[pb.CreateJotRequest]) (*connect.Response[pb.Jot], error) {
	tag, err := s.q.GetTagByName(ctx, req.Msg.TagName)
	if err == sql.ErrNoRows {
		tag, err = s.q.CreateTag(ctx, req.Msg.TagName)
		if err != nil {
			return nil, status.Errorf(codes.Internal, "failed to create tag: %v", err)
		}
	} else if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get tag: %v", err)
	}

	jot, err := s.q.CreateJot(ctx, db.CreateJotParams{
		Content: req.Msg.Content,
		TagID:   tag.ID,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create jot: %v", err)
	}

	return connect.NewResponse(&pb.Jot{
		JotId:     jot.ID,
		CreatedAt: timestamppb.New(jot.CreatedAt),
		UpdatedAt: timestamppb.New(jot.UpdatedAt),
		Content:   jot.Content,
		Pinned:    jot.Pinned,
		Deleted:   jot.Deleted,
		Tag: &pb.Tag{
			TagId: tag.ID,
			Name:  tag.Name,
		},
	}), nil
}

func (s *jotService) ListJots(ctx context.Context, req *connect.Request[pb.ListJotsRequest]) (*connect.Response[pb.ListJotsResponse], error) {
	if req.Msg.Page < 1 {
		req.Msg.Page = 1
	}
	if req.Msg.PageSize < 1 {
		req.Msg.PageSize = 100
	}

	offset := (req.Msg.Page - 1) * req.Msg.PageSize

	jots, err := s.q.ListJots(ctx, db.ListJotsParams{
		Limit:  req.Msg.PageSize,
		Offset: offset,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to list jots: %v", err)
	}

	pbJots := make([]*pb.Jot, len(jots))
	for i, jot := range jots {
		pbJots[i] = &pb.Jot{
			JotId:     jot.ID,
			CreatedAt: timestamppb.New(jot.CreatedAt),
			UpdatedAt: timestamppb.New(jot.UpdatedAt),
			Content:   jot.Content,
			Pinned:    jot.Pinned,
			Deleted:   jot.Deleted,
			Tag: &pb.Tag{
				TagId: jot.Tag.ID,
				Name:  jot.Tag.Name,
			},
		}
	}

	return connect.NewResponse(&pb.ListJotsResponse{
		Jots: pbJots,
	}), nil
}
