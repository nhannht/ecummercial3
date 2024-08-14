package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"nhannht.kute/ecummercial/server/db"
)

func main() {

	db.ConnectAndMigrateDatabase()

	r := gin.Default()
	r.Use(cors.Default())

	setupRoute(r)
	// same as
	// config := cors.DefaultConfig()
	// config.AllowAllOrigins = true
	// router.Use(cors.New(config))
	ginRunErr := r.Run(":8080")
	if ginRunErr != nil {
		return
	}
}
