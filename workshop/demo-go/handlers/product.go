package handlers

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"demo/db"
	"demo/models"
	"demo/redis"

	"github.com/labstack/echo/v4"
	"github.com/xeipuuv/gojsonschema"
)

func GetProductByID(c echo.Context) error {
	id := c.Param("id")

	// Write log
	slog.Info("Fetching product", "id", id, "method", c.Request().Method, "path", c.Request().URL.Path)

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
	key := fmt.Sprintf("product:%s", id)
	redis.Rdb.Set(redis.Ctx, key, data, time.Minute*1)

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var p models.Product
	// Bind request body to product struct
	if err := c.Bind(&p); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	// Define JSON schema for validation
	schema := `{
		"type": "object",
		"required": ["name", "code", "quantity", "price"],
		"properties": {
			"name": {"type": "string", "minLength": 1},
			"code": {"type": "string", "minLength": 1},
			"quantity": {"type": "number", "minimum": 0},
			"price": {"type": "number", "minimum": 0}
		}
	}`

	loader := gojsonschema.NewStringLoader(schema)
	document := gojsonschema.NewGoLoader(p)

	result, err := gojsonschema.Validate(loader, document)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Schema validation error"})
	}

	if !result.Valid() {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product data"})
	}

	err = db.DB.QueryRow(
		"INSERT INTO products(name, code, quantity, price) VALUES($1, $2, $3, $4) RETURNING id",
		p.Name, p.Code, p.Quantity, p.Price,
	).Scan(&p.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to insert product"})
	}

	return c.JSON(http.StatusCreated, p)
}
