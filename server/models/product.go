package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"gorm.io/gorm"
)

type StringArray []string

// Value implements the driver.Valuer interface.
func (a StringArray) Value() (driver.Value, error) {
	return json.Marshal(a)
}

// Scan implements the sql.Scanner interface.
func (a *StringArray) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(bytes, a)
}

type Product struct {
	gorm.Model  `faker:"-"`
	Name        string      `faker:"name,unique" gorm:"unique" binding:"required"`
	Description string      `faker:"paragraph"`
	Price       float64     `faker:"amount" gorm:"index"`
	Stock       int         `faker:"oneof: 100,200,300,400,500,0"`
	Categories  []Category  `gorm:"many2many:product_categories;" faker:"-"`
	Reviews     []Review    `faker:"-"`
	OrderItems  []OrderItem `faker:"-"`
	Image       string      `faker:"-"`
	OtherImages StringArray `faker:"-"`
}

func (p *Product) BeforeCreate(tx *gorm.DB) (err error) {

	if err = validate.Struct(p); err != nil {
		return err
	}

	return nil
}
