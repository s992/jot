//go:build !production

package main

import "embed"

// unused in dev mode since we run a separate vite server
var ClientFiles embed.FS
