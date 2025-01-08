//go:build !production

package server

func Init(config *ServerConfig) error {
	return Run(config, false)
}
