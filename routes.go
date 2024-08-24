package main

import (
	"github.com/gin-gonic/gin"
	"nhannht.kute/ecummercial/server/handlers"
)

func setupRoute(r *gin.Engine) {
	r.Static("uploads/products", "./uploads/products")
	protected := r.Group("/")
	protected.Use(handlers.AuthMiddleware())
	{
		r.POST("/register", handlers.Register)
		r.POST("/login", handlers.Login)
		r.POST("/logout", handlers.Logout)
	}

	{
		r.POST("/users", handlers.CreateUser)
		r.GET("/users", handlers.GetUsers)
		r.GET("/users/:id", handlers.GetUser)
		r.PUT("/users/:id", handlers.UpdateUser)
		r.DELETE("/users/:id", handlers.DeleteUser)

	}

	{
		r.POST("/products", handlers.CreateProduct)
		r.GET("/products", handlers.GetProducts)
		r.GET("/products/:id", handlers.GetProduct)
		r.PUT("/products/:id", handlers.UpdateProduct)
		r.DELETE("/products/:id", handlers.DeleteProduct)
		r.GET("/products/prices", handlers.GetMinMaxPrice)
	}

	{
		r.POST("/orders", handlers.CreateOrder)
		r.GET("/orders", handlers.GetOrders)
		r.GET("/orders/:id", handlers.GetOrder)
		r.PUT("/orders/:id", handlers.UpdateOrder)
		r.DELETE("/orders/:id", handlers.DeleteOrder)
	}
	{
		r.POST("/orderitems", handlers.CreateOrderItem)
		r.GET("/orderitems", handlers.GetOrderItems)
		r.GET("/orderitems/:id", handlers.GetOrderItem)
		r.PUT("/orderitems/:id", handlers.UpdateOrderItem)
		r.DELETE("/orderitems/:id", handlers.DeleteOrderItem)

	}
	{
		r.POST("/categories", handlers.CreateCategory)
		r.GET("/categories", handlers.GetCategories)
		r.GET("/categories/:id", handlers.GetCategory)
		r.PUT("/categories/:id", handlers.UpdateCategory)
		r.DELETE("/categories/:id", handlers.DeleteCategory)
	}
	{
		r.POST("/reviews", handlers.CreateReview)
		r.GET("/reviews", handlers.GetReviews)
		r.GET("/reviews/:id", handlers.GetReview)
		r.PUT("/reviews/:id", handlers.UpdateReview)
		r.DELETE("/reviews/:id", handlers.DeleteReview)
	}
	{
		r.POST("/payments", handlers.CreatePayment)
		r.GET("/payments", handlers.GetPayments)
		r.GET("/payments/:id", handlers.GetPayment)
		r.PUT("/payments/:id", handlers.UpdatePayment)
		r.DELETE("/payments/:id", handlers.DeletePayment)

	}
	r.GET("/product-images/:imageName", handlers.ServeProductImage)
	r.GET("/images/others/:imageName", handlers.ServeOtherImage)
	r.POST("/upload/other", handlers.UploadOtherImage)
	r.GET("/configuration/homepage/section1", handlers.GetConfHomePageSection1)
	r.POST("/configuration/homepage/section1", handlers.EditConfHomePageSection1)

	r.GET("/configuration/termandcondition/main", handlers.GetConfTermsAndConditionsPage)
	r.POST("/configuration/termandcondition/main", handlers.EditConfTermsAndConditionsPage)

	r.GET("/configuration/aboutus/main", handlers.GetConfAboutPage)
	r.POST("/configuration/aboutus/main", handlers.EditConfAboutPage)

	r.GET("/configuration/faq/main", handlers.GetConfFAQPage)
	r.POST("/configuration/faq/main", handlers.EditConfFAQPage)

	r.GET("/configuration/contact/main", handlers.GetConfContactPage)
	r.POST("/configuration/contact/main", handlers.EditConfContactPage)
	r.POST("/checkout/validate-order", handlers.ValidateOrder)

}
