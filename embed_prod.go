//go:build production

package main

import "embed"

//go:embed client/dist/*
var ClientFiles embed.FS
