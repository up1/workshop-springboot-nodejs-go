package main

import (
	"demo/db"
	"demo/handlers"
	"demo/redis"

	"github.com/labstack/echo/v4"
)

func main() {
	db := db.CreateDbConnection()
	defer db.Close()

	redis.Init()

	e := echo.New()

	e.GET("/product/:id", handlers.GetProductByID(db))
	e.POST("/product", handlers.CreateProduct)

	e.Logger.Fatal(e.Start(":8080"))
}
