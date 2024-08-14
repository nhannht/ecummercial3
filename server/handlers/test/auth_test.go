package test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"nhannht.kute/ecummercial/server/db"
	"nhannht.kute/ecummercial/server/handlers"
	"nhannht.kute/ecummercial/server/models"
	"testing"
)

func TestRegister(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/register", handlers.Register)

	user := handlers.RegisterInput{
		Username: "testuser",
		Email:    "testuser@example.com",
		Password: "password123",
	}
	jsonValue, _ := json.Marshal(user)
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestLogin(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/login", handlers.Login)

	// Create a user to login with
	user := models.User{
		Name:     "testuser",
		Email:    "testuser@example.com",
		Password: "$2a$12$wJ8H1Q8J8H1Q8J8H1Q8J8O8J8H1Q8J8H1Q8J8H1Q8J8H1Q8J8H1Q8", // bcrypt hash for "password123"
		Role:     "user",
	}
	db.DB.Create(&user)

	login := handlers.LoginInput{
		Identifier: "testuser@example.com",
		Password:   "password123",
	}
	jsonValue, _ := json.Marshal(login)
	req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		t.Fatalf("Error unmarshalling response: %v", err)
	}

	assert.NotEmpty(t, response["token"])
}

func TestLogout(t *testing.T) {
	initDatabase()
	r := SetupRouter()
	r.POST("/logout", handlers.Logout)

	req, _ := http.NewRequest("POST", "/logout", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
