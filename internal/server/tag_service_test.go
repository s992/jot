package server_test

import (
	"context"
	"database/sql"
	"log"
	"testing"

	"connectrpc.com/connect"
	_ "github.com/mattn/go-sqlite3"

	"github.com/s992/jot/internal/generated/db"
	jotv1 "github.com/s992/jot/internal/generated/proto/jot/v1"
	"github.com/s992/jot/internal/server"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type TagServiceSuite struct {
	suite.Suite
	svc *server.TagService
	db  *sql.DB
	ctx context.Context
}

func (s *TagServiceSuite) SetupTest() {
	database, err := setupDb()
	if err != nil {
		log.Fatal(err)
	}

	queries := db.New(database)
	s.db = database
	s.ctx = context.Background()
	s.svc = server.NewTagService(queries)
}

func (s *TagServiceSuite) TearDownTest() {
	if err := s.db.Close(); err != nil {
		log.Fatal(err)
	}
}

func TestTagServiceSuite(t *testing.T) {
	s := &TagServiceSuite{}
	suite.Run(t, s)
}

func (s *TagServiceSuite) TestFindTags() {
	tests := []struct {
		name     string
		setup    func()
		request  *jotv1.FindTagsRequest
		expected *jotv1.FindTagsResponse
		wantErr  bool
	}{
		{
			name:    "returns empty list when no tags exist",
			request: &jotv1.FindTagsRequest{},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{},
			},
		},
		{
			name: "lists all tags when no search term",
			setup: func() {
				makeTag(s.db, 1, "tagA")
				makeTag(s.db, 2, "another-one")
				makeTag(s.db, 3, "tagB")
			},
			request: &jotv1.FindTagsRequest{},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{
					{TagId: 1, Name: "tagA"},
					{TagId: 2, Name: "another-one"},
					{TagId: 3, Name: "tagB"},
				},
			},
		},
		{
			name: "lists all tags with empty search term",
			setup: func() {
				makeTag(s.db, 1, "tagA")
				makeTag(s.db, 2, "another-one")
				makeTag(s.db, 3, "tagB")
			},
			request: &jotv1.FindTagsRequest{
				SearchTerm: stringPtr(""),
			},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{
					{TagId: 1, Name: "tagA"},
					{TagId: 2, Name: "another-one"},
					{TagId: 3, Name: "tagB"},
				},
			},
		},
		{
			name: "returns empty list for non-existent tag search",
			setup: func() {
				makeTag(s.db, 1, "tagA")
				makeTag(s.db, 2, "another-one")
				makeTag(s.db, 3, "tagB")
			},
			request: &jotv1.FindTagsRequest{
				SearchTerm: stringPtr("i don't exist"),
			},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{},
			},
		},
		{
			name: "finds exact tag match",
			setup: func() {
				makeTag(s.db, 1, "tagA")
				makeTag(s.db, 2, "another-one")
				makeTag(s.db, 3, "tagB")
			},
			request: &jotv1.FindTagsRequest{
				SearchTerm: stringPtr("tagA"),
			},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{
					{TagId: 1, Name: "tagA"},
				},
			},
		},
		{
			name: "finds partial tag matches",
			setup: func() {
				makeTag(s.db, 1, "tagA")
				makeTag(s.db, 2, "another-one")
				makeTag(s.db, 3, "tagB")
			},
			request: &jotv1.FindTagsRequest{
				SearchTerm: stringPtr("tag"),
			},
			expected: &jotv1.FindTagsResponse{
				Tags: []*jotv1.Tag{
					{TagId: 1, Name: "tagA"},
					{TagId: 3, Name: "tagB"},
				},
			},
		},
	}

	for _, tt := range tests {
		s.Run(tt.name, func() {
			if tt.setup != nil {
				tt.setup()
			}

			res, err := s.svc.FindTags(s.ctx, &connect.Request[jotv1.FindTagsRequest]{
				Msg: tt.request,
			})

			if tt.wantErr {
				require.Error(s.T(), err)
				return
			}

			require.NoError(s.T(), err)
			require.NotNil(s.T(), res)
			require.Equal(s.T(), tt.expected, res.Msg)
		})
	}
}
