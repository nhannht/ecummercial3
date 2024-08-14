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
	if mode == "test" {
		DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
		if err != nil {
			log.Fatalf("Could not connect to sqlite3 db: %v", err)
		}

	} else {
		DB, err = gorm.Open(sqlite.Open("gorm.sqlite3"), &gorm.Config{})
		if err != nil {
			log.Fatalf("Could not connect to sqlite3 db: %v", err)
		}
	}
	fmt.Println("Connected to database")

	if mode == "development" {
		dbDropTables := DB.Migrator().DropTable(
			&models.User{},
			&models.Category{},
			&models.Order{},
			&models.OrderItem{},
			&models.Payment{},
			&models.Product{},
			&models.Review{},
			&models.ShippingInfo{},
		)
		if dbDropTables != nil {
			log.Fatalf("Could not drop tables: %v", dbDropTables)
		}

	}

	migrateErr := DB.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Order{},
		&models.OrderItem{},
		&models.Payment{},
		&models.Product{},
		&models.Review{},
		&models.ShippingInfo{},
	)

	if migrateErr != nil {
		return
	}

	if mode == "development" {
		fillDbWithRandomData()
	}

}
