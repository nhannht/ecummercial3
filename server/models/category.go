package models

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	CategoryName string    `gorm:"unique" binding:"required" faker:"word,unique"`
	Products     []Product `gorm:"many2many:product_categories;" faker:"-"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
	if err = validate.Struct(c); err != nil {
		return err
	}

	return nil
}
