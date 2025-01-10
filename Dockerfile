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
COPY embed_dev.go embed_prod.go main.go go.mod go.sum ./
COPY internal ./internal
COPY sql ./sql
COPY --link --from=frontend-build /app/client/dist ./client/dist
RUN CGO_ENABLED=1 go build -o /bin/jot -tags production .

FROM golang:alpine3.20 AS runner
WORKDIR /app
COPY --link --from=backend-build /bin/jot /bin/jot
RUN mkdir /app/data
ENV JOT_PORT=3000
ENV JOT_DB_DIR=/app/data
EXPOSE $JOT_PORT

CMD ["/bin/jot"]
