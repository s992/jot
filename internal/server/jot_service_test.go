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

type JotServiceSuite struct {
	suite.Suite
	svc *server.JotService
	db  *sql.DB
	ctx context.Context
}

func (s *JotServiceSuite) SetupTest() {
	database, err := setupDb()
	if err != nil {
		log.Fatal(err)
	}

	queries := db.New(database)
	s.db = database
	s.ctx = context.Background()
	s.svc = server.NewJotService(queries)
}

func (s *JotServiceSuite) TearDownTest() {
	if err := s.db.Close(); err != nil {
		log.Fatal(err)
	}
}

func TestJotServiceSuite(t *testing.T) {
	s := &JotServiceSuite{}
	suite.Run(t, s)
}

func (s *JotServiceSuite) TestCreateJot() {
	tests := []struct {
		name    string
		request *jotv1.CreateJotRequest
		setup   func()
		verify  func(*jotv1.Jot)
		wantErr bool
	}{
		{
			name: "creates new jot with new tag",
			request: &jotv1.CreateJotRequest{
				TagName: "new-tag",
				Content: "test content",
			},
			verify: func(jot *jotv1.Jot) {
				require.NotZero(s.T(), jot.JotId)
				require.Equal(s.T(), "test content", jot.Content)
				require.NotNil(s.T(), jot.Tag)
				require.Equal(s.T(), "new-tag", jot.Tag.Name)
				require.False(s.T(), jot.Pinned)
				require.False(s.T(), jot.Deleted)
			},
		},
		{
			name: "creates new jot with existing tag",
			setup: func() {
				makeTag(s.db, 2, "existing-tag")
			},
			request: &jotv1.CreateJotRequest{
				TagName: "existing-tag",
				Content: "test content",
			},
			verify: func(jot *jotv1.Jot) {
				require.NotZero(s.T(), jot.JotId)
				require.Equal(s.T(), "test content", jot.Content)
				require.NotNil(s.T(), jot.Tag)
				require.Equal(s.T(), int64(2), jot.Tag.TagId)
				require.Equal(s.T(), "existing-tag", jot.Tag.Name)
			},
		},
	}

	for _, tt := range tests {
		s.Run(tt.name, func() {
			if tt.setup != nil {
				tt.setup()
			}

			res, err := s.svc.CreateJot(s.ctx, &connect.Request[jotv1.CreateJotRequest]{
				Msg: tt.request,
			})

			if tt.wantErr {
				require.Error(s.T(), err)
				return
			}

			require.NoError(s.T(), err)
			require.NotNil(s.T(), res)
			require.NotNil(s.T(), res.Msg)

			tt.verify(res.Msg)
		})
	}
}

func (s *JotServiceSuite) TestListJots() {
	makeTag(s.db, 1, "tag-a")
	makeTag(s.db, 2, "tag-b")
	makeJot(s.db, 1, "content 1", 1, false, false)
	makeJot(s.db, 2, "content 2", 1, true, false)
	makeJot(s.db, 3, "other content", 2, false, false)
	makeJot(s.db, 4, "deleted content", 1, false, true)

	tests := []struct {
		name     string
		request  *jotv1.ListJotsRequest
		expected *jotv1.ListJotsResponse
	}{
		{
			name: "lists all non-deleted jots",
			request: &jotv1.ListJotsRequest{
				Page:     1,
				PageSize: 10,
			},
			expected: &jotv1.ListJotsResponse{
				Jots: []*jotv1.Jot{
					{JotId: 2, Content: "content 2", Pinned: true, Tag: &jotv1.Tag{TagId: 1, Name: "tag-a"}},
					{JotId: 1, Content: "content 1", Tag: &jotv1.Tag{TagId: 1, Name: "tag-a"}},
					{JotId: 3, Content: "other content", Tag: &jotv1.Tag{TagId: 2, Name: "tag-b"}},
				},
			},
		},
		{
			name: "searches content",
			request: &jotv1.ListJotsRequest{
				Page:       1,
				PageSize:   10,
				SearchTerm: stringPtr("content 2"),
			},
			expected: &jotv1.ListJotsResponse{
				Jots: []*jotv1.Jot{
					{JotId: 2, Content: "content 2", Pinned: true, Tag: &jotv1.Tag{TagId: 1, Name: "tag-a"}},
				},
			},
		},
		{
			name: "searches tag",
			request: &jotv1.ListJotsRequest{
				Page:       1,
				PageSize:   10,
				SearchTerm: stringPtr("tag-b"),
			},
			expected: &jotv1.ListJotsResponse{
				Jots: []*jotv1.Jot{
					{JotId: 3, Content: "other content", Tag: &jotv1.Tag{TagId: 2, Name: "tag-b"}},
				},
			},
		},
		{
			name: "paginates results",
			request: &jotv1.ListJotsRequest{
				Page:     1,
				PageSize: 2,
			},
			expected: &jotv1.ListJotsResponse{
				Jots: []*jotv1.Jot{
					{JotId: 2, Content: "content 2", Pinned: true, Tag: &jotv1.Tag{TagId: 1, Name: "tag-a"}},
					{JotId: 1, Content: "content 1", Tag: &jotv1.Tag{TagId: 1, Name: "tag-a"}},
				},
			},
		},
	}

	for _, tt := range tests {
		s.Run(tt.name, func() {
			res, err := s.svc.ListJots(s.ctx, &connect.Request[jotv1.ListJotsRequest]{
				Msg: tt.request,
			})

			require.NoError(s.T(), err)
			require.NotNil(s.T(), res)

			// Only compare the fields we care about for the test
			for i, jot := range res.Msg.Jots {
				expected := tt.expected.Jots[i]
				require.Equal(s.T(), expected.JotId, jot.JotId)
				require.Equal(s.T(), expected.Content, jot.Content)
				require.Equal(s.T(), expected.Pinned, jot.Pinned)
				require.Equal(s.T(), expected.Tag.TagId, jot.Tag.TagId)
				require.Equal(s.T(), expected.Tag.Name, jot.Tag.Name)
			}
		})
	}
}

func (s *JotServiceSuite) TestUpdateJot() {
	makeTag(s.db, 1, "tag-a")
	makeJot(s.db, 1, "content 1", 1, false, false)
	makeJot(s.db, 2, "deleted content", 1, false, true)

	tests := []struct {
		name    string
		request *jotv1.UpdateJotRequest
		verify  func(*jotv1.Jot)
		wantErr bool
	}{
		{
			name: "pins a jot",
			request: &jotv1.UpdateJotRequest{
				JotId:  1,
				Pinned: true,
			},
			verify: func(jot *jotv1.Jot) {
				require.Equal(s.T(), int64(1), jot.JotId)
				require.True(s.T(), jot.Pinned)
				require.False(s.T(), jot.Deleted)
			},
		},
		{
			name: "deletes a jot",
			request: &jotv1.UpdateJotRequest{
				JotId:   1,
				Deleted: true,
			},
			verify: func(jot *jotv1.Jot) {
				require.Equal(s.T(), int64(1), jot.JotId)
				require.False(s.T(), jot.Pinned)
				require.True(s.T(), jot.Deleted)
			},
		},
		{
			name: "fails for non-existent jot",
			request: &jotv1.UpdateJotRequest{
				JotId:  999,
				Pinned: true,
			},
			wantErr: true,
		},
		{
			name: "cannot modify deleted jot",
			request: &jotv1.UpdateJotRequest{
				JotId:  2,
				Pinned: true,
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		s.Run(tt.name, func() {
			res, err := s.svc.UpdateJot(s.ctx, &connect.Request[jotv1.UpdateJotRequest]{
				Msg: tt.request,
			})

			if tt.wantErr {
				require.Error(s.T(), err)
				return
			}

			require.NoError(s.T(), err)
			require.NotNil(s.T(), res)
			require.NotNil(s.T(), res.Msg)

			tt.verify(res.Msg)
		})
	}
}

func stringPtr(s string) *string {
	return &s
}
