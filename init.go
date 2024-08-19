package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("could not load env file: %v,"+
			" this bug can happend when running test, manually set env using os.Setenv please", err)
	}
	mode := os.Getenv("MODE")
	gin.SetMode(mode)

}
