import express from 'express'
import cors from "cors"
import surveyRoutes from "./src/routes/surveyRoutes"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", surveyRoutes)

app.listen(5000, ()=>
console.log(`
    🚀 Server ready at: http://localhost:3000
    ⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
    )