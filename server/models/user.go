package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model `faker:"-"`
	Name       string   `gorm:"unique" binding:"required" faker:"username,unique"`
	Email      string   `gorm:"unique" binding:"required" faker:"email,unique"`
	Password   string   `binding:"required" faker:"oneof: password"`
	Addresses  string   `faker:"sentence"`
	Orders     []Order  `faker:"-"`
	Reviews    []Review `faker:"-"`
	Role       string   `binding:"required" faker:"oneof:user"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(u); err != nil {
		return err
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)

	return nil
}
