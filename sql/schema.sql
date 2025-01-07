create table if not exists tag (id integer primary key, name text unique not null)
;

create table if not exists jot (
  id integer primary key,
  content text not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  pinned boolean not null default false,
  deleted boolean not null default false,
  tag_id integer not null,
  foreign key (tag_id) references tag (id)
)
;
