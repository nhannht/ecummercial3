package db

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"nhannht.kute/ecummercial/server/models"
	"os"
)

var DB *gorm.DB

func ConnectAndMigrateDatabase() {
	var dbErr error

	mode := os.Getenv("MODE")
	if mode == "test" {
		DB, dbErr = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
		if dbErr != nil {
			log.Fatalf("Could not connect to sqlite3 db: %v", dbErr)
		}

	} else {
		DB, dbErr = gorm.Open(sqlite.Open("gorm.sqlite3"), &gorm.Config{})
		if dbErr != nil {
			log.Fatalf("Could not connect to sqlite3 db: %v", dbErr)
		}
	}
	fmt.Println("Connected to database")

	if mode == "debug" {
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
		log.Println("Successfully dropped tables")

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

	if mode == "debug" {
		fillDbWithRandomData()
	}

}
