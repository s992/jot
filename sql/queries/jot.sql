-- name: CreateJot :one
insert into
  jot (content, tag_id)
values
  (sqlc.arg('content'), sqlc.arg('tag_id')) returning *
;

-- name: ListJots :many
select
  j.id,
  j.created_at,
  j.updated_at,
  j.content,
  j.pinned,
  j.deleted,
  sqlc.embed(t)
from
  jot j
  left join tag t on j.tag_id = t.id
where
  j.deleted = false
order by
  j.pinned desc,
  j.created_at desc
limit
  sqlc.arg('limit')
offset
  sqlc.arg('offset')
;
