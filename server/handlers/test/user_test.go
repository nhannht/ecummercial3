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

func TestCreateUser(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/users", handlers.CreateUser)

	user := handlers.CreateUserInput{Name: "John Doe", Email: "john@example.com", Password: "password123"}
	jsonValue, _ := json.Marshal(user)
	req, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.User
	mError := json.Unmarshal(w.Body.Bytes(), &response)
	if mError != nil {
		log.Printf("Error unmarshalling response: %v", mError)
	}
	//fmt.Printf("response is %v", response)

	assert.Equal(t, user.Name, response["data"].Name)
	assert.Equal(t, user.Email, response["data"].Email)
}

func TestGetUsers(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/users", handlers.GetUsers)

	req, _ := http.NewRequest("GET", "/users", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetUser(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.GET("/users/:id", handlers.GetUser)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123"}
	db.DB.Create(&user)

	req, _ := http.NewRequest("GET", "/users/"+strconv.Itoa(int(user.ID)), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.User
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, user.Name, response["data"].Name)
	assert.Equal(t, user.Email, response["data"].Email)
}

func TestUpdateUser(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.PUT("/users/:id", handlers.UpdateUser)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123"}
	db.DB.Create(&user)

	updatedUser := handlers.CreateUserInput{Name: "Jane Doe", Email: "jane@example.com", Password: "newpassword123"}
	jsonValue, _ := json.Marshal(updatedUser)
	req, _ := http.NewRequest("PUT", "/users/"+strconv.Itoa(int(user.ID)), bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]models.User
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		return
	}

	assert.Equal(t, updatedUser.Name, response["data"].Name)
	assert.Equal(t, updatedUser.Email, response["data"].Email)
}

func TestDeleteUser(t *testing.T) {
	initDatabase()

	r := SetupRouter()
	r.DELETE("/users/:id", handlers.DeleteUser)

	user := models.User{Name: "John Doe", Email: "john@example.com", Password: "password123"}
	db.DB.Create(&user)

	req, _ := http.NewRequest("DELETE", "/users/"+strconv.Itoa(int(user.ID)), nil)
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
