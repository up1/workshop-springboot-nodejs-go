package handlers

import (
	"encoding/json"
	"net/http"

	"demo/db"
	"demo/models"
	"demo/redis"

	"github.com/labstack/echo/v4"
)

func GetProductByID(c echo.Context) error {
	id := c.Param("id")

	// Try Redis
	cached, err := redis.Rdb.Get(redis.Ctx, id).Result()
	if err == nil {
		var product models.Product
		json.Unmarshal([]byte(cached), &product)
		return c.JSON(http.StatusOK, product)
	}

	// Query DB
	row := db.DB.QueryRow("SELECT id, name, code, quantity, price FROM products WHERE id = $1", id)
	var product models.Product
	err = row.Scan(&product.ID, &product.Name, &product.Code, &product.Quantity, &product.Price)
	if err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
	}

	// Cache result
	data, _ := json.Marshal(product)
	redis.Rdb.Set(redis.Ctx, id, data, 0)

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var p models.Product
	if err := c.Bind(&p); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	err := db.DB.QueryRow(
		"INSERT INTO products(name, code, quantity, price) VALUES($1, $2, $3, $4) RETURNING id",
		p.Name, p.Code, p.Quantity, p.Price,
	).Scan(&p.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to insert product"})
	}

	return c.JSON(http.StatusCreated, p)
}
