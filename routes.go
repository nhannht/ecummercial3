package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"nhannht.kute/ecummercial/server/handlers"
)

func setupRoute(r *gin.Engine) {
	r.Static("uploads/products", "./uploads/products")
	r.StaticFile("/robots.txt", "./server_statics/robots.txt")
	protected := r.Group("/")
	protected.Use(handlers.AuthMiddleware())
	adminProtected := r.Group("/")
	userProtected := r.Group("/")
	adminProtected.Use(handlers.AuthMiddleware(), handlers.AdminMiddleware())
	userProtected.Use(handlers.AuthMiddleware(), handlers.UserMiddleware())
	{
		r.POST("/register", handlers.Register)
		r.POST("/login", handlers.Login)
		//r.POST("/logout", handlers.Logout)
	}

	{
		adminProtected.POST("/users", handlers.CreateUser)
		adminProtected.GET("/users", handlers.GetUsers)
		r.GET("/users/:id", handlers.GetUser)
		adminProtected.PUT("/users/:id", handlers.UpdateUser)
		adminProtected.DELETE("/users/:id", handlers.DeleteUser)

	}

	{
		adminProtected.POST("/products", handlers.CreateProduct)
		r.GET("/products", handlers.GetProducts)
		r.GET("/products/:id", handlers.GetProduct)
		adminProtected.PUT("/products/:id", handlers.UpdateProduct)
		adminProtected.DELETE("/products/:id", handlers.DeleteProduct)
		r.GET("/products/prices", handlers.GetMinMaxPrice)
	}

	{
		protected.POST("/orders", handlers.CreateOrder)
		r.GET("/orders", handlers.GetOrders)
		r.GET("/orders/:id", handlers.GetOrder)
		adminProtected.PUT("/orders/:id", handlers.UpdateOrder)
		adminProtected.DELETE("/orders/:id", handlers.DeleteOrder)
	}
	{
		protected.POST("/orderitems", handlers.CreateOrderItem)
		protected.GET("/orderitems", handlers.GetOrderItems)
		protected.GET("/orderitems/:id", handlers.GetOrderItem)
		adminProtected.PUT("/orderitems/:id", handlers.UpdateOrderItem)
		adminProtected.DELETE("/orderitems/:id", handlers.DeleteOrderItem)

	}
	{
		adminProtected.POST("/categories", handlers.CreateCategory)
		r.GET("/categories", handlers.GetCategories)
		r.GET("/categories/:id", handlers.GetCategory)
		adminProtected.PUT("/categories/:id", handlers.UpdateCategory)
		adminProtected.DELETE("/categories/:id", handlers.DeleteCategory)
	}
	{
		protected.POST("/reviews", handlers.CreateReview)
		r.GET("/reviews", handlers.GetReviews)
		r.GET("/reviews/:id", handlers.GetReview)
		adminProtected.PUT("/reviews/:id", handlers.UpdateReview)
		adminProtected.DELETE("/reviews/:id", handlers.DeleteReview)
	}
	{
		adminProtected.POST("/payments", handlers.CreatePayment)
		r.GET("/payments", handlers.GetPayments)
		r.GET("/payments/:id", handlers.GetPayment)
		adminProtected.PUT("/payments/:id", handlers.UpdatePayment)
		adminProtected.DELETE("/payments/:id", handlers.DeletePayment)

	}
	r.GET("/product-images/:imageName", handlers.ServeProductImage)
	r.GET("/images/others/:imageName", handlers.ServeOtherImage)
	adminProtected.POST("/upload/other", handlers.UploadOtherImage)
	r.GET("/config/homepage/section1", handlers.GetConfHomePageSection1)
	adminProtected.POST("/config/homepage/section1", handlers.EditConfHomePageSection1)

	r.GET("/config/toq", handlers.GetConfTermsAndConditionsPage)
	adminProtected.POST("/config/terms-and-conditions/main", handlers.EditConfTermsAndConditionsPage)

	r.GET("/config/aboutus", handlers.GetConfAboutPage)
	adminProtected.POST("/config/aboutus", handlers.EditConfAboutPage)

	r.GET("/config/contact", handlers.GetConfContactPage)
	adminProtected.POST("/config/contact", handlers.EditConfContactPage)
	adminProtected.POST("/checkout/validate-order", handlers.ValidateOrder)

	r.GET("/config/faq", handlers.GetFAQ)
	adminProtected.POST("/config/faq", handlers.EditFAQ)

	adminProtected.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Test route"})
	})

	adminProtected.GET("/admin/analytic", handlers.GetAnalyticData)

}
