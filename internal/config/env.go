package config

import (
	"log"

	"github.com/spf13/viper"
)

type envConfig struct {
	DbDir      string `mapstructure:"JOT_DB_DIR"`
	Port       int    `mapstructure:"JOT_PORT"`
	Production bool   `mapstructure:"JOT_PRODUCTION"`
}

var Env *envConfig

func InitEnv() {
	Env = loadEnvVariables()
}

func loadEnvVariables() (config *envConfig) {
	viper.AddConfigPath(".")
	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.SetDefault("JOT_DB_DIR", "/data")
	viper.SetDefault("JOT_PORT", "3000")
	viper.SetDefault("JOT_PRODUCTION", true)
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("Error reading env file: ", err)
	}

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal(err)
	}

	return
}
