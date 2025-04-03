package redis

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var Ctx = context.Background()

func Init() {
	Rdb = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	if err := Rdb.Ping(Ctx).Err(); err != nil {
		log.Fatal("Unable to reach the Redis server:", err)
	}
}
