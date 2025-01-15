FROM golang:alpine3.20 AS task-install
RUN go install github.com/go-task/task/v3/cmd/task@latest

FROM node:22-alpine AS deps
WORKDIR /app
COPY Taskfile.yaml package.json package-lock.json ./
COPY .taskfiles ./.taskfiles
COPY --link --from=task-install /go/bin/task /usr/local/bin/task
RUN task js:deps

FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY Taskfile.yaml tsconfig.json vite.config.mjs package.json ./
COPY .taskfiles ./.taskfiles
COPY client ./client
COPY --link --from=task-install /go/bin/task /usr/local/bin/task
COPY --link --from=deps /app/node_modules ./node_modules
RUN task js:build

FROM golang:alpine3.20 AS backend-build
WORKDIR /app
RUN apk add build-base
COPY embed_dev.go embed_prod.go main.go go.mod go.sum Taskfile.yaml ./
COPY .taskfiles ./.taskfiles
COPY internal ./internal
COPY sql ./sql
COPY --link --from=task-install /go/bin/task /usr/local/bin/task
COPY --link --from=frontend-build /app/client/dist ./client/dist
RUN task go:build

FROM alpine:3.21.2 AS runner
LABEL org.opencontainers.image.title="jot"
LABEL org.opencontainers.image.description="a self-hosted tool for jotting things down"
LABEL org.opencontainers.image.url="https://github.com/s992/jot"
LABEL org.opencontainers.image.documentation="https://github.com/s992/jot"
LABEL org.opencontainers.image.source="https://github.com/s992/jot"

WORKDIR /app
COPY --link --from=backend-build /app/build/jot /bin/jot
RUN mkdir /app/data
ENV JOT_PORT=3000
ENV JOT_DB_DIR=/app/data
EXPOSE $JOT_PORT
VOLUME /app/data

CMD ["/bin/jot"]
