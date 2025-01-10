package config

import (
	"log"

	"github.com/spf13/viper"
)

type envConfig struct {
	DbDir string `mapstructure:"JOT_DB_DIR"`
	Port  int    `mapstructure:"JOT_PORT"`
}

var Env *envConfig

func InitEnv() {
	Env = loadEnvVariables()
}

func loadEnvVariables() (config *envConfig) {
	viper.SetConfigType("env")
	viper.SetDefault("JOT_DB_DIR", "/tmp")
	viper.SetDefault("JOT_PORT", "3000")
	viper.AutomaticEnv()

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal(err)
	}

	return
}
