package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func EditConfHomePageSection1(c *gin.Context) {
	// Retrieve form data
	description := c.PostForm("description")
	buttonText := c.PostForm("buttonText")
	link := c.PostForm("link")
	heading := c.PostForm("heading")

	// Handle image upload
	file, err := c.FormFile("image")
	var imagePath string
	var hashedFileName string
	if err != nil {
		log.Printf("Error retrieving image: %v, fallback using placeholder image", err)
		hashedFileName = "placeholder.svg"
	} else {
		sanitizedFileName := sanitizeFileName(file.Filename)
		hashedFileName = hashFileName(sanitizedFileName) + filepath.Ext(sanitizedFileName)
		imagePath = fmt.Sprintf("upload/others/%s", hashedFileName)

		// Create the directory if it doesn't exist
		if err := os.MkdirAll(filepath.Dir(imagePath), os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
			return
		}

		// Save the uploaded file to the specified path
		if err := c.SaveUploadedFile(file, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
	}

	// Create the new config data
	configData := map[string]string{
		"description": description,
		"buttonText":  buttonText,
		"link":        link,
		"heading":     heading,
		"image":       hashedFileName,
	}

	// Convert the config data to JSON
	jsonData, err := json.Marshal(configData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal config data"})
		return
	}
	log.Printf("Print config data: %s", string(jsonData))

	// Write the JSON data to the file
	filePath := "config/homepage/section1.json"
	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write config file"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "Configuration updated successfully"})
}

func GetConfHomePageSection1(c *gin.Context) {
	// Define the path to the JSON file
	filePath := "config/homepage/section1.json"

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open config file"})
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read config file"})
		return
	}

	// Parse the JSON content
	var configData map[string]interface{}
	if err := json.Unmarshal(byteValue, &configData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse config file"})
		return
	}

	// Return the parsed content as a JSON response
	c.JSON(http.StatusOK, configData)
}

func GetConfAboutPage(c *gin.Context) {
	// Define the path to the JSON file
	filePath := "config/aboutus/config.json"

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open config file"})
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read config file"})
		return
	}

	// Parse the JSON content
	var configData map[string]interface{}
	if err := json.Unmarshal(byteValue, &configData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse config file"})
		return
	}

	// Return the parsed content as a JSON response
	c.JSON(http.StatusOK, configData)
}

func EditConfAboutPage(c *gin.Context) {
	// Retrieve form data
	content := c.PostForm("content")

	// Create the new config data
	configData := map[string]string{
		"content": content,
	}

	// Convert the config data to JSON
	jsonData, err := json.Marshal(configData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal config data"})
		return
	}
	log.Printf("Print config data: %s", string(jsonData))

	// Write the JSON data to the file
	filePath := "config/aboutus/config.json"
	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write config file"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "Configuration updated successfully"})
}

func GetConfContactPage(c *gin.Context) {
	// Define the path to the JSON file
	filePath := "config/contact/config.json"

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open config file"})
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read config file"})
		return
	}

	// Parse the JSON content
	var configData map[string]interface{}
	if err := json.Unmarshal(byteValue, &configData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse config file"})
		return
	}

	// Return the parsed content as a JSON response
	c.JSON(http.StatusOK, configData)
}

func EditConfContactPage(c *gin.Context) {
	// Retrieve form data
	phone := c.PostForm("phone")
	address := c.PostForm("address")
	twitter := c.PostForm("twitter")
	facebook := c.PostForm("facebook")
	instagram := c.PostForm("instagram")

	// Create the new config data
	configData := map[string]string{
		"phone":     phone,
		"address":   address,
		"twitter":   twitter,
		"facebook":  facebook,
		"instagram": instagram,
	}

	// Convert the config data to JSON
	jsonData, err := json.Marshal(configData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal config data"})
		return
	}
	log.Printf("Print config data: %s", string(jsonData))

	// Write the JSON data to the file
	filePath := "config/contact/config.json"
	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write config file"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "Configuration updated successfully"})
}

func GetConfTermsAndConditionsPage(c *gin.Context) {
	// Define the path to the JSON file
	filePath := "config/termandcondition/config.json"

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open config file"})
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read config file"})
		return
	}

	// Parse the JSON content
	var configData map[string]interface{}
	if err := json.Unmarshal(byteValue, &configData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse config file"})
		return
	}

	// Return the parsed content as a JSON response
	c.JSON(http.StatusOK, configData)
}

func EditConfTermsAndConditionsPage(c *gin.Context) {
	// Retrieve form data
	content := c.PostForm("content")

	// Create the new config data
	configData := map[string]string{
		"content": content,
	}

	// Convert the config data to JSON
	jsonData, err := json.Marshal(configData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal config data"})
		return
	}
	log.Printf("Print config data: %s", string(jsonData))

	// Write the JSON data to the file
	filePath := "config/termandcondition/config.json"

	// Create the parent directories if they do not exist
	if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
		return
	}

	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write config file"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "Configuration updated successfully"})
}

type FAQItem struct {
	ID       uint   `json:"id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

func EditFAQ(c *gin.Context) {
	// Retrieve form data

	var faqItems []FAQItem
	if err := c.ShouldBindJSON(&faqItems); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse FAQ data"})
		return
	}

	// Convert the FAQ data to JSON
	jsonData, err := json.Marshal(faqItems)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal FAQ data"})
		return
	}

	// Write the JSON data to the file
	filePath := "config/faq/config.json"

	// Create the parent directories if they do not exist
	if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
		return
	}

	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write FAQ config file"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "FAQ config updated successfully"})
}

func GetFAQ(c *gin.Context) {
	// Define the path to the JSON file
	filePath := "config/faq/config.json"

	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open FAQ config file"})
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to close FAQ config file"})
		}
	}(file)

	// Read the file content
	byteValue, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read FAQ config file"})
		return
	}

	// Parse the JSON content
	var faqItems []FAQItem
	if err := json.Unmarshal(byteValue, &faqItems); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse FAQ config file"})
		return
	}

	// Return the parsed content as a JSON response
	c.JSON(http.StatusOK, faqItems)
}
