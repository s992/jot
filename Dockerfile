FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY tsconfig.json vite.config.mjs package.json ./
COPY client ./client
COPY --link --from=deps /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV VITE_JOT_PRODUCTION=true
RUN npm run build

FROM golang:alpine3.20 AS backend-build
WORKDIR /app
RUN apk add build-base
RUN go install github.com/go-task/task/v3/cmd/task@latest
COPY embed_dev.go embed_prod.go main.go go.mod go.sum Taskfile.yaml ./
COPY internal ./internal
COPY sql ./sql
COPY --link --from=frontend-build /app/client/dist ./client/dist
RUN task build-go

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
