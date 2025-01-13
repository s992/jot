-- name: ListTagsByFrecency :many
select
  t.id,
  t.name
from
  tag t
  left join jot j on j.tag_id = t.id
where
  t.name glob concat ('*', sqlc.arg ('tagName'), '*')
group by
  t.id
order by
  count(j.id) desc,
  max(j.created_at) desc
limit
  100
;

-- name: GetTagByName :one
select
  *
from
  tag
where
  name = sqlc.arg ('name')
limit
  1
;

-- name: CreateTag :one
insert into
  tag (name)
values
  (sqlc.arg ('name')) returning *
;
