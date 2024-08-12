package db

import (
	"github.com/go-faker/faker/v4"
	"golang.org/x/crypto/bcrypt"
	"log"
	"nhannht.kute/ecummercial/lib"
	"nhannht.kute/ecummercial/models"
)

func createAdminUser() {
	var user models.User
	email := "admin@nhannht.kute"
	name := "admin"
	password := "admin123"
	role := "admin"
	if err := DB.Where("email = ?", email).First(&user).Error; err == nil {
		// Admin user already exists
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	admin := models.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
		Role:     role,
	}

	if err := DB.Create(&admin).Error; err != nil {
		log.Fatal("Failed to create admin user:", err)
	}

	log.Println("Admin user created successfully")
}

func createRandomUsers() {
	for i := 0; i < 10; i++ {
		user := models.User{}
		fakerErr := faker.FakeData(&user)
		if fakerErr != nil {
			log.Fatalf("Error creating fake user: %v", fakerErr)
		} else {
			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			user.Password = string(hashedPassword)
			DB.Create(&user)

			log.Printf("Successfully created fake user: %+v\n", user)
		}
	}
	faker.ResetUnique()
}

func createRandomCategories() {
	for i := 0; i < 10; i++ {
		category := models.Category{}
		fakerErr := faker.FakeData(&category)
		if fakerErr != nil {
			log.Fatalf("Error creating fake category: %v", fakerErr)
		} else {
			DB.Create(&category)
			var products []models.Product
			DB.Find(&products)
			if len(products) > 0 {
				productI, pickErr := lib.PickRandomElement(products)
				if pickErr != nil {
					log.Fatalf("Cannot pick random user  %v", pickErr)
				}
				product, ok := productI.(models.Product)
				if !ok {
					log.Fatalf("Cannot cast user to models.User %v", pickErr)
				}

				addCategoryErr := DB.Model(&product).Association("Categories").Append(&category)

				if addCategoryErr != nil {
					log.Fatalf("Cannot add category to user %v", addCategoryErr)
				}
			}
			log.Printf("Successfully created fake category: %+v\n", category)
		}

		DB.Create(&category)
	}

	faker.ResetUnique()
}

func createRandomProducts() {
	for i := 0; i < 10; i++ {
		product := models.Product{}
		fakerErr := faker.FakeData(&product)
		if fakerErr != nil {
			log.Fatalf("Error creating fake product: %v", fakerErr)
		} else {
			DB.Create(&product)

			log.Printf("Successfully created fake product: %+v\n", product)
		}
	}
	faker.ResetUnique()
}

func createRandomOrders() {
	for i := 0; i < 10; i++ {
		order := models.Order{}
		fakerErr := faker.FakeData(&order)
		if fakerErr != nil {
			log.Fatalf("Error creating fake order: %v", fakerErr)
		} else {
			var users []models.User
			DB.Find(&users)

			if len(users) > 0 {
				userI, pickErr := lib.PickRandomElement(users)
				if pickErr != nil {
					log.Fatalf("Cannot pick random user  %v", pickErr)
				}

				user, ok := userI.(models.User)
				if !ok {
					log.Fatalln("Cannot convert user to models.User ")
				}

				order.UserID = user.ID
				order.User = user
			}

			DB.Create(&order)

			log.Printf("Successfully created fake order: %+v\n", order)
		}
	}
	faker.ResetUnique()
}

func createRandomOrderItems() {
	for i := 0; i < 10; i++ {
		orderItem := models.OrderItem{}
		fakerErr := faker.FakeData(&orderItem)
		if fakerErr != nil {
			log.Fatalf("Error creating fake order item: %v", fakerErr)
		} else {
			DB.Create(&orderItem)

			var products []models.Product
			DB.Find(&products)
			var orders []models.Order
			DB.Find(&orders)
			if len(products) > 0 {
				productI, pickErr := lib.PickRandomElement(products)
				if pickErr != nil {
					log.Fatalf("Cannot pick random product  %v", pickErr)
				}
				product, ok := productI.(models.Product)
				if !ok {
					log.Fatalln("Cannot convert product to models.Product ")
				}
				orderItem.ProductID = product.ID
				orderItem.Product = product
			}
			if len(orders) > 0 {
				orderI, pickErr := lib.PickRandomElement(orders)
				if pickErr != nil {
					log.Fatalf("Cannot pick random order  %v", pickErr)
				}
				order, ok := orderI.(models.Order)
				if !ok {
					log.Fatalln("Cannot convert order to models.Order ")
				}
				orderItem.OrderID = order.ID
				orderItem.Order = order
			}
			DB.Create(&orderItem)

			log.Printf("Successfully created fake order item: %+v\n", orderItem)
		}
	}
	faker.ResetUnique()
}

func createRandomPayments() {
	for i := 0; i < 10; i++ {
		payment := models.Payment{}
		fakerErr := faker.FakeData(&payment)
		if fakerErr != nil {
			log.Fatalf("Error creating fake payment: %v", fakerErr)
		} else {
			DB.Create(&payment)

			var orders []models.Order
			DB.Find(&orders)
			if len(orders) > 0 {
				orderI, pickErr := lib.PickRandomElement(orders)
				if pickErr != nil {
					log.Fatalf("Cannot pick random order  %v", pickErr)
				}
				order, ok := orderI.(models.Order)
				if !ok {
					log.Fatalln("Cannot convert order to models.Order ")
				}
				payment.OrderID = order.ID
				payment.Order = order
			}
			DB.Create(&payment)

			log.Printf("Successfully created fake payment: %+v\n", payment)
		}
	}
	faker.ResetUnique()
}

func createRandomReviews() {
	for i := 0; i < 10; i++ {
		review := models.Review{}
		fakerErr := faker.FakeData(&review)
		if fakerErr != nil {
			log.Fatalf("Error creating fake review: %v", fakerErr)
		} else {
			DB.Create(&review)
			var users []models.User
			var products []models.Product
			DB.Find(&users)
			DB.Find(&products)
			if len(users) > 0 {
				userI, pickErr := lib.PickRandomElement(users)
				if pickErr != nil {
					log.Fatalf("Cannot pick random user  %v", pickErr)
				}
				user, ok := userI.(models.User)
				if !ok {
					log.Fatalln("Cannot convert user to models.User ")
				}
				review.UserID = user.ID
				review.User = user
			}
			if len(products) > 0 {
				productI, pickErr := lib.PickRandomElement(products)
				if pickErr != nil {
					log.Fatalf("Cannot pick random product  %v", pickErr)
				}
				product, ok := productI.(models.Product)
				if !ok {
					log.Fatalln("Cannot convert product to models.Product ")
				}
				review.ProductID = product.ID
				review.Product = product
			}
			DB.Create(&review)

			log.Printf("Successfully created fake review: %+v\n", review)
		}
	}
	faker.ResetUnique()
}

func fillDbWithRandomData() {
	createAdminUser()
	createRandomUsers()
	createRandomProducts()
	createRandomOrders()
	createRandomReviews()
	createRandomPayments()
	createRandomOrderItems()
	createRandomCategories()
}
