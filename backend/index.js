import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import excelRoute from "./routes/excel.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"))

app.use(cors({
  origin: '*',
  methods: ["GET", "DELETE", "POST", "PATCH", "PUT"]
}))

app.use("/excel", excelRoute)

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT))