package models

import (
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	UserID     uint   `faker:"-"`
	ProductID  uint   `faker:"-"`
	Rating     int    `faker:"oneof: 1,2,3,4,5"`
	Comment    string `faker:"paragraph"`
	ReviewDate string `faker:"date"`
}

func (r *Review) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(r); err != nil {
		return err
	}

	return nil
}
