package models

type Product struct {
	ID       int     `json:"id"`
	Name     string  `json:"name"`
	Code     string  `json:"code"`
	Quantity int     `json:"quantity"`
	Price    float64 `json:"price"`
}
