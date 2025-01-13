package server_test

import (
	"context"
	"database/sql"
	"fmt"
	"io"
	"os"
)

func setupDb() (*sql.DB, error) {
	database, err := sql.Open("sqlite3", "file:test?mode=memory&_foreign_keys=on")
	if err != nil {
		return nil, err
	}

	schemaFile, err := os.Open("../../sql/schema.sql")
	if err != nil {
		return nil, err
	}

	defer func() {
		schemaFile.Close()
	}()

	schema, err := io.ReadAll(schemaFile)
	if err != nil {
		return nil, err
	}

	ctx := context.Background()

	_, err = database.ExecContext(ctx, string(schema))
	if err != nil {
		return nil, err
	}

	return database, nil
}

func makeTag(db *sql.DB, id int, name string) error {
	_, err := db.ExecContext(context.Background(), fmt.Sprintf("insert into tag (id, name) values (%d, '%s')", id, name))
	return err
}

func makeJot(db *sql.DB, id int, content string, tagId int, pinned bool, deleted bool) error {
	_, err := db.ExecContext(context.Background(), fmt.Sprintf("insert into jot (id, content, tag_id, pinned, deleted) values (%d, '%s', %d, %t, %t)", id, content, tagId, pinned, deleted))
	return err
}
