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

func TestCreateOrder(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/orders", handlers.CreateOrder)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := handlers.CreateOrderInput{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	jsonValue, _ := json.Marshal(order)
	req, _ := http.NewRequest("POST", "/orders", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Order
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, order.UserID, response["data"].UserID)
	assert.Equal(t, order.OrderDate, response["data"].OrderDate)
	assert.Equal(t, order.TotalAmount, response["data"].TotalAmount)
}

func TestGetOrders(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/orders", handlers.GetOrders)

	req, _ := http.NewRequest("GET", "/orders", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetOrder(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/orders/:id", handlers.GetOrder)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	req, _ := http.NewRequest("GET", "/orders/"+strconv.Itoa(int(order.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Order
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, order.UserID, response["data"].UserID)
	assert.Equal(t, order.OrderDate, response["data"].OrderDate)
	assert.Equal(t, order.TotalAmount, response["data"].TotalAmount)
}

func TestUpdateOrder(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/orders/:id", handlers.UpdateOrder)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	updatedOrder := handlers.CreateOrderInput{UserID: user.ID, OrderDate: "2023-10-02", TotalAmount: 150.75}
	jsonValue, _ := json.Marshal(updatedOrder)
	req, _ := http.NewRequest("PUT", "/orders/"+strconv.Itoa(int(order.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Order
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedOrder.UserID, response["data"].UserID)
	assert.Equal(t, updatedOrder.OrderDate, response["data"].OrderDate)
	assert.Equal(t, updatedOrder.TotalAmount, response["data"].TotalAmount)
}

func TestDeleteOrder(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/orders/:id", handlers.DeleteOrder)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	req, _ := http.NewRequest("DELETE", "/orders/"+strconv.Itoa(int(order.ID)), nil)
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
