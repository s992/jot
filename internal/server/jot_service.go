package server

import (
	"context"
	"database/sql"
	"fmt"

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
		Limit:      req.Msg.PageSize,
		Offset:     offset,
		SearchTerm: req.Msg.SearchTerm,
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

func (s *jotService) UpdateJot(ctx context.Context, req *connect.Request[pb.UpdateJotRequest]) (*connect.Response[pb.Jot], error) {
	jot, err := s.validateAndGetJot(ctx, req.Msg.JotId)
	if err != nil {
		return nil, err
	}

	if jot.Deleted {
		return nil, connect.NewError(connect.CodeFailedPrecondition, fmt.Errorf("cannot modify deleted jot"))
	}

	params := db.UpdateJotParams{
		ID:      req.Msg.JotId,
		Pinned:  req.Msg.Pinned,
		Deleted: req.Msg.Deleted,
	}

	updatedJot, err := s.q.UpdateJot(ctx, params)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, fmt.Errorf("failed to update jot: %w", err))
	}

	fullJot, err := s.validateAndGetJot(ctx, updatedJot.ID)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&pb.Jot{JotId: jot.ID,
		CreatedAt: timestamppb.New(fullJot.CreatedAt),
		UpdatedAt: timestamppb.New(fullJot.UpdatedAt),
		Content:   fullJot.Content,
		Pinned:    fullJot.Pinned,
		Deleted:   fullJot.Deleted,
		Tag: &pb.Tag{
			TagId: fullJot.Tag.ID,
			Name:  fullJot.Tag.Name,
		}}), nil
}

func (s *jotService) validateAndGetJot(ctx context.Context, id int64) (db.GetJotByIdRow, error) {
	jot, err := s.q.GetJotById(ctx, id)
	if err == sql.ErrNoRows {
		return db.GetJotByIdRow{}, connect.NewError(connect.CodeNotFound, fmt.Errorf("jot not found"))
	}
	if err != nil {
		return db.GetJotByIdRow{}, connect.NewError(connect.CodeInternal, fmt.Errorf("failed to get jot: %w", err))
	}
	return jot, nil
}

func (s *jotService) validateNotDeleted(jot db.GetJotByIdRow) error {
	if jot.Deleted {
		return connect.NewError(connect.CodeFailedPrecondition, fmt.Errorf("cannot modify deleted jot"))
	}
	return nil
}
