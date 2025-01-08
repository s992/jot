package server

import (
	"embed"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/s992/jot/internal/generated/db"
	"github.com/s992/jot/internal/generated/proto/jot/v1/jotv1connect"
)

type ServerConfig struct {
	ClientFiles embed.FS
	Port        int
	Queries     *db.Queries
}

func Run(config *ServerConfig, isProduction bool) error {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"*"},
	}))

	tagService := NewTagService(config.Queries)
	tagSvcPath, tagSvcHandler := jotv1connect.NewTagServiceHandler(tagService)
	r.Mount(tagSvcPath, tagSvcHandler)

	jotService := NewJotService(config.Queries)
	logLineSvcPath, logLineSvcHandler := jotv1connect.NewJotServiceHandler(jotService)
	r.Mount(logLineSvcPath, logLineSvcHandler)

	if isProduction {
		r.Handle("/*", SPAHandler(config.ClientFiles))
	}

	addr := fmt.Sprintf(":%d", config.Port)
	fmt.Printf("Server running at %s\n", addr)

	return http.ListenAndServe(addr, r)
}
