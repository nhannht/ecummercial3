package db

import (
	"github.com/go-faker/faker/v4"
	"golang.org/x/crypto/bcrypt"
	"log"
	"nhannht.kute/ecummercial/server/lib"
	"nhannht.kute/ecummercial/server/models"
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

func createRandomUsers(t int) {
	for i := 0; i < t; i++ {
		user := models.User{}
		fakerErr := faker.FakeData(&user)
		if fakerErr != nil {
			log.Fatalf("Error creating fake user: %v", fakerErr)
		} else {
			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			user.Password = string(hashedPassword)
			DB.Create(&user)

			//log.Printf("Successfully created fake user: %+v\n", user)
		}
	}
	log.Printf("Successfully created %v fake users", t)
	faker.ResetUnique()
}

func createRandomCategories(t int) {
	for i := 0; i < t; i++ {
		category := models.Category{}
		fakerErr := faker.FakeData(&category)
		if fakerErr != nil {
			log.Fatalf("Error creating fake category: %v", fakerErr)
		} else {
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
			//log.Printf("Successfully created fake category: %+v\n", category)
		}

		//DB.Create(&category)
	}
	log.Printf("Successfully created %v fake categories", t)

	faker.ResetUnique()
}

func createRandomProducts(t int) {
	for i := 0; i < t; i++ {
		product := models.Product{}
		fakerErr := faker.FakeData(&product)
		if fakerErr != nil {
			log.Fatalf("Error creating fake product: %v", fakerErr)
		} else {
			DB.Create(&product)

			//log.Printf("Successfully created fake product: %+v\n", product)
		}
	}
	log.Printf("Successfully created %v fake products", t)
	faker.ResetUnique()
}

func createRandomOrders(t int) {
	for i := 0; i < t; i++ {
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
			}

			DB.Create(&order)

			//log.Printf("Successfully created fake order: %+v\n", order)
		}
	}
	log.Printf("Successfully created %v fake orders", t)
	faker.ResetUnique()
}

func createRandomOrderItems(t int) {
	for i := 0; i < t; i++ {
		orderItem := models.OrderItem{}
		fakerErr := faker.FakeData(&orderItem)
		if fakerErr != nil {
			log.Fatalf("Error creating fake order item: %v", fakerErr)
		} else {
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
			}
			DB.Create(&orderItem)

			//log.Printf("Successfully created fake order item: %+v\n", orderItem)
		}
	}
	log.Printf("Successfully created %v fake order items", t)
	faker.ResetUnique()
}

func createRandomPayments(t int) {
	for i := 0; i < t; i++ {
		payment := models.Payment{}
		fakerErr := faker.FakeData(&payment)
		if fakerErr != nil {
			log.Fatalf("Error creating fake payment: %v", fakerErr)
		} else {

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
			}
			DB.Create(&payment)

			//log.Printf("Successfully created fake payment: %+v\n", payment)
		}
	}
	log.Printf("Successfully created %v fake payments", t)
	faker.ResetUnique()
}

func createRandomReviews(t int) {
	for i := 0; i < t; i++ {
		review := models.Review{}
		fakerErr := faker.FakeData(&review)
		if fakerErr != nil {
			log.Fatalf("Error creating fake review: %v", fakerErr)
		} else {
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
			}
			DB.Create(&review)

			//log.Printf("Successfully created fake review: %+v\n", review)
		}
	}
	log.Printf("Successfully created %v fake reviews", t)
	faker.ResetUnique()
}

func createRandomShippingInfo(t int) {
	for i := 0; i < t; i++ {
		shippingInfo := models.ShippingInfo{}
		fakerErr := faker.FakeData(&shippingInfo)
		if fakerErr != nil {
			log.Fatalf("Error creating fake shipping info: %v", fakerErr)
		} else {
			var orders []models.Order
			DB.Find(&orders)
			if len(orders) > 0 {
				orderI, pickErr := lib.PickRandomElement(orders)
				if pickErr != nil {
					log.Fatalf("Cannot pick random order %v", pickErr)
				}
				order, ok := orderI.(models.Order)
				if !ok {
					log.Fatalln("Cannot convert order to models.Order")
				}
				shippingInfo.OrderID = order.ID
			}
			DB.Create(&shippingInfo)

			//log.Printf("Successfully created fake shipping info: %+v\n", shippingInfo)
		}
	}
	log.Printf("Successfully created %v fake shipping info", t)
	faker.ResetUnique()
}

func fillDbWithRandomData() {
	createAdminUser()
	createRandomUsers(10)
	createRandomProducts(50)
	createRandomOrders(10)
	createRandomReviews(10)
	createRandomPayments(10)
	createRandomOrderItems(10)
	createRandomCategories(20)
	createRandomShippingInfo(10)
}
