-- name: CreateJot :one
insert into
  jot (content, tag_id)
values
  (sqlc.arg ('content'), sqlc.arg ('tag_id')) returning *
;

-- name: ListJots :many
select
  j.id,
  j.created_at,
  j.updated_at,
  j.content,
  j.pinned,
  j.deleted,
  sqlc.embed (t)
from
  jot j
  left join tag t on j.tag_id = t.id
where
  j.deleted = false
  and (
    sqlc.arg ('searchTerm') is null
    or j.content glob concat ('*', sqlc.arg ('searchTerm'), '*')
    or t.name glob concat ('*', sqlc.arg ('searchTerm'), '*')
  )
order by
  j.pinned desc,
  j.created_at desc
limit
  sqlc.arg ('limit')
offset
  sqlc.arg ('offset')
;

-- name: UpdateJot :one
update jot
set
  pinned = sqlc.arg ('pinned'),
  deleted = sqlc.arg ('deleted'),
  updated_at = current_timestamp
where
  id = sqlc.arg ('id') returning *
;

-- name: GetJotById :one
select
  j.id,
  j.created_at,
  j.updated_at,
  j.content,
  j.pinned,
  j.deleted,
  sqlc.embed (t)
from
  jot j
  inner join tag t on j.tag_id = t.id
where
  j.id = sqlc.arg ('id')
;
