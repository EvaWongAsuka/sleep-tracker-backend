const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const DATA_FILE = 'sleepRecords.json';

// 加载数据
const loadData = () => {
  if (fs.existsSync(DATA_FILE)) {
    const rawData = fs.readFileSync(DATA_FILE);
    return JSON.parse(rawData);
  }
  return [];
};

// 保存数据
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
};

app.get('/api/sleep-records', (req, res) => {
  const records = loadData();
  res.json(records);
});

app.post('/api/sleep-records', (req, res) => {
  const records = req.body;
  saveData(records);
  res.status(200).send('Records saved');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
