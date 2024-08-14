package test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"nhannht.kute/ecummercial/handlers"
	"nhannht.kute/ecummercial/models"
	"nhannht.kute/ecummercial/server/db"
	"strconv"
	"testing"
)

func TestCreateProduct(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/products", handlers.CreateProduct)

	product := handlers.CreateProductInput{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	jsonValue, _ := json.Marshal(product)
	req, _ := http.NewRequest("POST", "/products", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Product
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, product.Name, response["data"].Name)
	assert.Equal(t, product.Description, response["data"].Description)
	assert.Equal(t, product.Price, response["data"].Price)
	assert.Equal(t, product.Stock, response["data"].Stock)
}

func TestGetProducts(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/products", handlers.GetProducts)

	req, _ := http.NewRequest("GET", "/products", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetProduct(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/products/:id", handlers.GetProduct)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	req, _ := http.NewRequest("GET", "/products/"+strconv.Itoa(int(product.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Product
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, product.Name, response["data"].Name)
	assert.Equal(t, product.Description, response["data"].Description)
	assert.Equal(t, product.Price, response["data"].Price)
	assert.Equal(t, product.Stock, response["data"].Stock)
}

func TestUpdateProduct(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/products/:id", handlers.UpdateProduct)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	updatedProduct := handlers.CreateProductInput{Name: "Gaming Laptop", Description: "An updated high-end gaming laptop", Price: 1600.00, Stock: 8}
	jsonValue, _ := json.Marshal(updatedProduct)
	req, _ := http.NewRequest("PUT", "/products/"+strconv.Itoa(int(product.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Product
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedProduct.Name, response["data"].Name)
	assert.Equal(t, updatedProduct.Description, response["data"].Description)
	assert.Equal(t, updatedProduct.Price, response["data"].Price)
	assert.Equal(t, updatedProduct.Stock, response["data"].Stock)
}

func TestDeleteProduct(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/products/:id", handlers.DeleteProduct)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	req, _ := http.NewRequest("DELETE", "/products/"+strconv.Itoa(int(product.ID)), nil)
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
