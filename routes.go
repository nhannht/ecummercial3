package main

import (
	"github.com/gin-gonic/gin"
	"nhannht.kute/ecummercial/handlers"
)

func setupRoute(r *gin.Engine) {
	protected := r.Group("/")
	protected.Use(handlers.AuthMiddleware())
	{
		r.POST("/register", handlers.Register)
		r.POST("/login", handlers.Login)
		protected.POST("/logout", handlers.Logout)
	}

	{
		protected.POST("/users", handlers.CreateUser)
		protected.GET("/users", handlers.GetUsers)
		r.GET("/users/:id", handlers.GetUser)
		protected.PUT("/users/:id", handlers.UpdateUser)
		protected.DELETE("/users/:id", handlers.DeleteUser)

	}

	{
		protected.POST("/products", handlers.CreateProduct)
		r.GET("/products", handlers.GetProducts)
		r.GET("/products/:id", handlers.GetProduct)
		protected.PUT("/products/:id", handlers.UpdateProduct)
		protected.DELETE("/products/:id", handlers.DeleteProduct)
	}

	{
		protected.POST("/orders", handlers.CreateOrder)
		r.GET("/orders", handlers.GetOrders)
		r.GET("/orders/:id", handlers.GetOrder)
		protected.PUT("/orders/:id", handlers.UpdateOrder)
		protected.DELETE("/orders/:id", handlers.DeleteOrder)
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

}
