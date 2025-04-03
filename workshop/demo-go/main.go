package main

import (
	"demo/db"
	"demo/handlers"
	"demo/redis"
	"log/slog"
	"os"

	"github.com/labstack/echo/v4"
	slogecho "github.com/samber/slog-echo"
)

func main() {
	db.Init()
	redis.Init()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	e := echo.New()
	e.Use(slogecho.New(logger))

	e.GET("/product/:id", handlers.GetProductByID)
	e.POST("/product", handlers.CreateProduct)

	e.Logger.Fatal(e.Start(":8080"))
}
