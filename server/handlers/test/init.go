package test

import (
	"github.com/gin-gonic/gin"
	"log"
	"nhannht.kute/ecummercial/server/db"
	"os"
)

func initDatabase() {
	err := os.Setenv("mode", "test")
	if err != nil {
		log.Fatalf("Cannot set mode to test %v", err)
	}
	db.ConnectAndMigrateDatabase()

}
func SetupRouter() *gin.Engine {

	r := gin.Default()
	return r
}
