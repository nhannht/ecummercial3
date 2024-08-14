package test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/handlers"
	"nhannht.kute/ecummercial/server/models"
	"strconv"
	"testing"
)

func TestCreatePayment(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/payments", handlers.CreatePayment)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	payment := handlers.CreatePaymentInput{OrderID: order.ID, PaymentDate: "2023-10-02", Amount: 100.50, PaymentMethod: "Credit Card"}
	jsonValue, _ := json.Marshal(payment)
	req, _ := http.NewRequest("POST", "/payments", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Payment
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, payment.OrderID, response["data"].OrderID)
	assert.Equal(t, payment.PaymentDate, response["data"].PaymentDate)
	assert.Equal(t, payment.Amount, response["data"].Amount)
	assert.Equal(t, payment.PaymentMethod, response["data"].PaymentMethod)
}

func TestGetPayments(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/payments", handlers.GetPayments)

	req, _ := http.NewRequest("GET", "/payments", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetPayment(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/payments/:id", handlers.GetPayment)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	payment := models.Payment{OrderID: order.ID, PaymentDate: "2023-10-02", Amount: 100.50, PaymentMethod: "Credit Card"}
	db.DB.Create(&payment)

	req, _ := http.NewRequest("GET", "/payments/"+strconv.Itoa(int(payment.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Payment
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, payment.OrderID, response["data"].OrderID)
	assert.Equal(t, payment.PaymentDate, response["data"].PaymentDate)
	assert.Equal(t, payment.Amount, response["data"].Amount)
	assert.Equal(t, payment.PaymentMethod, response["data"].PaymentMethod)
}

func TestUpdatePayment(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/payments/:id", handlers.UpdatePayment)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	payment := models.Payment{OrderID: order.ID, PaymentDate: "2023-10-02", Amount: 100.50, PaymentMethod: "Credit Card"}
	db.DB.Create(&payment)

	updatedPayment := handlers.CreatePaymentInput{OrderID: order.ID, PaymentDate: "2023-10-03", Amount: 150.75, PaymentMethod: "Debit Card"}
	jsonValue, _ := json.Marshal(updatedPayment)
	req, _ := http.NewRequest("PUT", "/payments/"+strconv.Itoa(int(payment.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Payment
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedPayment.OrderID, response["data"].OrderID)
	assert.Equal(t, updatedPayment.PaymentDate, response["data"].PaymentDate)
	assert.Equal(t, updatedPayment.Amount, response["data"].Amount)
	assert.Equal(t, updatedPayment.PaymentMethod, response["data"].PaymentMethod)
}

func TestDeletePayment(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/payments/:id", handlers.DeletePayment)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	order := models.Order{UserID: user.ID, OrderDate: "2023-10-01", TotalAmount: 100.50}
	db.DB.Create(&order)

	payment := models.Payment{OrderID: order.ID, PaymentDate: "2023-10-02", Amount: 100.50, PaymentMethod: "Credit Card"}
	db.DB.Create(&payment)

	req, _ := http.NewRequest("DELETE", "/payments/"+strconv.Itoa(int(payment.ID)), nil)
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
