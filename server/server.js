const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');

const tools = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8')
);


let favorites = [];

app.get('/api/tools', (req, res) => {
  const category = req.query.category;
  if (category) {
    const filtered = tools.filter(tool =>
      tool.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(tools);
});

app.post('/api/favorites', (req, res) => {
  const { toolId } = req.body;
  if (favorites.includes(toolId)) {
    return res.status(400).json({ message: 'Already favorited' });
  }
  favorites.push(toolId);
  res.status(200).json({ message: 'Favorited!' });
});

app.get('/api/favorites', (req, res) => {
  const favTools = tools.filter(tool => favorites.includes(tool.id));
  res.json(favTools);
});

app.delete('/api/favorites/:id', (req, res) => {
  const toolId = parseInt(req.params.id);
  favorites = favorites.filter(id => id !== toolId);
  res.status(200).json({ message: 'Removed from favorites' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
