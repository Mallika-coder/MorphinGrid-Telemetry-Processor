const fs = require('fs');
const csv = require('fast-csv');

function parseCSV(filePath, onRow, onFinish) {
  const stream = fs.createReadStream(filePath);
  const parser = csv.parse({ headers: true })
    .on('error', error => console.error(error))
    .on('data', row => onRow(row))
    .on('end', rowCount => onFinish(rowCount));
  stream.pipe(parser);
}

module.exports = { parseCSV };