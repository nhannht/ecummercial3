package test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"nhannht.kute/ecummercial/db"
	"nhannht.kute/ecummercial/handlers"
	"nhannht.kute/ecummercial/models"
	"strconv"
	"testing"
)

func TestCreateOrderItem(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/order-items", handlers.CreateOrderItem)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.DB.Create(&product)

	orderItem := handlers.CreateOrderItemInput{OrderID: order.ID, ProductID: product.ID, Quantity: 1, Price: 1000.00}
	jsonValue, _ := json.Marshal(orderItem)
	req, _ := http.NewRequest("POST", "/order-items", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.OrderItem
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, orderItem.OrderID, response["data"].OrderID)
	assert.Equal(t, orderItem.ProductID, response["data"].ProductID)
	assert.Equal(t, orderItem.Quantity, response["data"].Quantity)
	assert.Equal(t, orderItem.Price, response["data"].Price)
}

func TestGetOrderItems(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/order-items", handlers.GetOrderItems)

	req, _ := http.NewRequest("GET", "/order-items", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetOrderItem(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/order-items/:id", handlers.GetOrderItem)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.DB.Create(&product)

	orderItem := models.OrderItem{OrderID: order.ID, ProductID: product.ID, Quantity: 1, Price: 1000.00}
	db.DB.Create(&orderItem)

	req, _ := http.NewRequest("GET", "/order-items/"+strconv.Itoa(int(orderItem.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.OrderItem
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, orderItem.OrderID, response["data"].OrderID)
	assert.Equal(t, orderItem.ProductID, response["data"].ProductID)
	assert.Equal(t, orderItem.Quantity, response["data"].Quantity)
	assert.Equal(t, orderItem.Price, response["data"].Price)
}

func TestUpdateOrderItem(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/order-items/:id", handlers.UpdateOrderItem)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.DB.Create(&product)

	orderItem := models.OrderItem{OrderID: order.ID, ProductID: product.ID, Quantity: 1, Price: 1000.00}
	db.DB.Create(&orderItem)

	updatedOrderItem := handlers.CreateOrderItemInput{OrderID: order.ID, ProductID: product.ID, Quantity: 2, Price: 2000.00}
	jsonValue, _ := json.Marshal(updatedOrderItem)
	req, _ := http.NewRequest("PUT", "/order-items/"+strconv.Itoa(int(orderItem.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.OrderItem
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedOrderItem.OrderID, response["data"].OrderID)
	assert.Equal(t, updatedOrderItem.ProductID, response["data"].ProductID)
	assert.Equal(t, updatedOrderItem.Quantity, response["data"].Quantity)
	assert.Equal(t, updatedOrderItem.Price, response["data"].Price)
}

func TestDeleteOrderItem(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/order-items/:id", handlers.DeleteOrderItem)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	product := models.Product{Name: "Laptop", Price: 1000.00}
	db.DB.Create(&product)

	orderItem := models.OrderItem{OrderID: order.ID, ProductID: product.ID, Quantity: 1, Price: 1000.00}
	db.DB.Create(&orderItem)

	req, _ := http.NewRequest("DELETE", "/order-items/"+strconv.Itoa(int(orderItem.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]bool
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, true, response["data"])
}
