package models

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	UserID       uint
	User         User
	AddressLine1 string
	AddressLine2 string
	City         string
	State        string
	ZipCode      string
	Country      string
	AddressType  string
}
