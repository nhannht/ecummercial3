package lib

import (
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"reflect"
	"time"
)

func PickRandomElement(slice interface{}) (interface{}, error) {
	rand.Seed(time.Now().UnixNano()) // Seed the random number generator

	// Use reflection to handle slices of any type
	s := reflect.ValueOf(slice)
	if s.Kind() != reflect.Slice {
		return nil, errors.New("input is not a slice")
	}

	if s.Len() == 0 {
		return nil, errors.New("slice is empty")
	}

	randomIndex := rand.Intn(s.Len()) // Generate a random index
	return s.Index(randomIndex).Interface(), nil
}

func PrettyPrintObject(object interface{}) {
	o, _ := json.MarshalIndent(object, "", "\t")
	fmt.Printf("order json %v\n", string(o))
}
