import express from "express"
import { getBasicExcel, uploadBasicExcel } from "../resolvers/excel.js"
import multer from "multer"

const upload = multer();
const router = express.Router()

router.get('/download/basic', getBasicExcel)

router.post('/upload/basic', upload.single('file'), uploadBasicExcel)

export default router;