package server

import (
	"context"

	"connectrpc.com/connect"
	pb "github.com/s992/jot/internal/generated/proto/jot/v1"

	"github.com/s992/jot/internal/generated/db"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TagService struct {
	q *db.Queries
}

func NewTagService(q *db.Queries) *TagService {
	return &TagService{q: q}
}

func (s *TagService) FindTags(ctx context.Context, req *connect.Request[pb.FindTagsRequest]) (*connect.Response[pb.FindTagsResponse], error) {
	tags, err := s.q.ListTagsByFrecency(ctx, req.Msg.SearchTerm)

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to list tags: %v", err)
	}

	pbTags := make([]*pb.Tag, len(tags))
	for i, tag := range tags {
		pbTags[i] = &pb.Tag{
			TagId: tag.ID,
			Name:  tag.Name,
		}
	}

	return connect.NewResponse(&pb.FindTagsResponse{
		Tags: pbTags,
	}), nil
}
