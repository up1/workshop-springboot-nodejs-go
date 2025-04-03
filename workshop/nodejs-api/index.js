const express = require('express')
const app = express()
const port = 3000

const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World......' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})