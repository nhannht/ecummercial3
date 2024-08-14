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

func TestCreateCategory(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/categories", handlers.CreateCategory)

	category := handlers.CreateCategoryInput{CategoryName: "Electronics"}
	jsonValue, _ := json.Marshal(category)
	req, _ := http.NewRequest("POST", "/categories", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Category
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}

	assert.Equal(t, category.CategoryName, response["data"].CategoryName)
}

func TestGetCategories(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/categories", handlers.GetCategories)

	req, _ := http.NewRequest("GET", "/categories", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetCategory(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/categories/:id", handlers.GetCategory)

	category := models.Category{CategoryName: "Electronics"}
	db.DB.Create(&category)

	req, _ := http.NewRequest("GET", "/categories/"+strconv.Itoa(int(category.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Category
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, category.CategoryName, response["data"].CategoryName)
}

func TestUpdateCategory(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/categories/:id", handlers.UpdateCategory)

	category := models.Category{CategoryName: "Electronics"}
	db.DB.Create(&category)

	updatedCategory := handlers.CreateCategoryInput{CategoryName: "Home Appliances"}
	jsonValue, _ := json.Marshal(updatedCategory)
	req, _ := http.NewRequest("PUT", "/categories/"+strconv.Itoa(int(category.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.Category
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedCategory.CategoryName, response["data"].CategoryName)
}

func TestDeleteCategory(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/categories/:id", handlers.DeleteCategory)

	category := models.Category{CategoryName: "Electronics"}
	db.DB.Create(&category)

	req, _ := http.NewRequest("DELETE", "/categories/"+strconv.Itoa(int(category.ID)), nil)
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
