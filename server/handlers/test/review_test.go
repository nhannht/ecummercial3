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

func TestCreateReview(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/reviews", handlers.CreateReview)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	review := handlers.CreateReviewInput{UserID: user.ID, ProductID: product.ID, Rating: 5, Comment: "Excellent product!", ReviewDate: "2023-10-01"}
	jsonValue, _ := json.Marshal(review)
	req, _ := http.NewRequest("POST", "/reviews", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Review
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, review.Rating, response["data"].Rating)
	assert.Equal(t, review.Comment, response["data"].Comment)
	assert.Equal(t, review.ReviewDate, response["data"].ReviewDate)
}

func TestGetReviews(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/reviews", handlers.GetReviews)

	req, _ := http.NewRequest("GET", "/reviews", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetReview(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/reviews/:id", handlers.GetReview)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	review := models.Review{UserID: user.ID, ProductID: product.ID, Rating: 5, Comment: "Excellent product!", ReviewDate: "2023-10-01"}
	db.DB.Create(&review)

	req, _ := http.NewRequest("GET", "/reviews/"+strconv.Itoa(int(review.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Review
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, review.Rating, response["data"].Rating)
	assert.Equal(t, review.Comment, response["data"].Comment)
	assert.Equal(t, review.ReviewDate, response["data"].ReviewDate)
}

func TestUpdateReview(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/reviews/:id", handlers.UpdateReview)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	review := models.Review{UserID: user.ID, ProductID: product.ID, Rating: 5, Comment: "Excellent product!", ReviewDate: "2023-10-01"}
	db.DB.Create(&review)

	updatedReview := handlers.CreateReviewInput{UserID: user.ID, ProductID: product.ID, Rating: 4, Comment: "Good product!", ReviewDate: "2023-10-02"}
	jsonValue, _ := json.Marshal(updatedReview)
	req, _ := http.NewRequest("PUT", "/reviews/"+strconv.Itoa(int(review.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Review
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedReview.Rating, response["data"].Rating)
	assert.Equal(t, updatedReview.Comment, response["data"].Comment)
	assert.Equal(t, updatedReview.ReviewDate, response["data"].ReviewDate)
}

func TestDeleteReview(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/reviews/:id", handlers.DeleteReview)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123", Role: "user"}
	db.DB.Create(&user)

	product := models.Product{Name: "Laptop", Description: "A high-end gaming laptop", Price: 1500.00, Stock: 10}
	db.DB.Create(&product)

	review := models.Review{UserID: user.ID, ProductID: product.ID, Rating: 5, Comment: "Excellent product!", ReviewDate: "2023-10-01"}
	db.DB.Create(&review)

	req, _ := http.NewRequest("DELETE", "/reviews/"+strconv.Itoa(int(review.ID)), nil)
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
