package db

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"nhannht.kute/ecummercial/models"
	"os"
)

var DB *gorm.DB

func ConnectAndMigrateDatabase() {
	err := godotenv.Load(".env")
	mode := os.Getenv("mode")
	if err != nil {
		log.Printf("could not load env file: %v,"+
			" this bug can happend when running test, manually set env using os.Setenv please", err)
	}
	DB, err = gorm.Open(sqlite.Open("gorm.sqlite3"), &gorm.Config{})
	fmt.Println("Connected to database")

	if mode == "development" {
		dbDropTables := DB.Migrator().DropTable(
			&models.User{},
			&models.Category{},
			&models.Address{},
			&models.Order{},
			&models.OrderItem{},
			&models.Payment{},
			&models.Product{},
			&models.Review{},
		)
		if dbDropTables != nil {
			log.Fatalf("Could not drop tables: %v", dbDropTables)
		}
	}

	migrateErr := DB.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Address{},
		&models.Order{},
		&models.OrderItem{},
		&models.Payment{},
		&models.Product{},
		&models.Review{},
	)
	if migrateErr != nil {
		return
	}

}
