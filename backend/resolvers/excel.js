import dotenv from "dotenv"
import exceljs from "exceljs"

dotenv.config()

export const getBasicExcel = async (req, res) => {
  try {
    const filepath = "./assets/templateWB.xlsx";
    res.download(filepath);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const uploadBasicExcel = async (req, res) => {
  const workbook = new exceljs.Workbook();
  const fileBuffer = req.file.buffer;

  workbook.xlsx.load(fileBuffer).then(() => {
    const worksheet = workbook.getWorksheet("Шаблон");
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
      const rowData = {
        articleWB: row.getCell('A').value || null,
        brand: row.getCell('B').value || null,
        rating: row.getCell('C').value || null,
        response: row.getCell('E').value ? row.getCell('E').value.split('^') : null,
        triggers: row.getCell('G').value ? row.getCell('G').value.replace(', ', ',').split(',') : null,
        blacklistResponse: row.getCell('H').value || null,
        recommendation: row.getCell('J').value ? row.getCell('J').value.replace(', ', ',').split(',') : null
      };
      if (rowData.articleWB || rowData.brand) {
        data.push(rowData);
      }
    });

    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while processing the file' });
  });
}