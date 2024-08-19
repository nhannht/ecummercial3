package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"nhannht.kute/ecummercial/server/db"
	"os"
)

func main() {

	db.ConnectAndMigrateDatabase()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()

	r.Use(cors.Default())

	setupRoute(r)
	// same as
	// config := cors.DefaultConfig()
	// config.AllowAllOrigins = true
	// router.Use(cors.New(config))
	certFile := os.Getenv("CERT_FILE")
	certKey := os.Getenv("CERT_KEY")
	if certFile == "" || certKey == "" {
		ginRunErr := r.Run(":" + port)
		if ginRunErr != nil {
			log.Fatalf("Cannot start server: %v", ginRunErr)
		}
	} else {
		ginRunErr := r.RunTLS(":"+port, certFile, certKey)
		if ginRunErr != nil {
			log.Fatalf("Cannot start server: %v", ginRunErr)
		}
	}

}
