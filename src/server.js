const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('src/db.json'); // Path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware to ensure IDs are numeric and auto-incremented
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const dbFilePath = path.join(__dirname, 'src', 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    const resource = req.path.split('/').pop();
    const items = dbData[resource] || [];
    const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
    req.body.id = maxId + 1;
  } else if (req.method === 'PATCH') {
    if (req.body && req.body.id) {
      req.body.id = Number(req.body.id); // Convert to number
    }
  }
  next();
});

// Custom router to handle POST requests
server.post('/api/*', (req, res, next) => {
  const dbFilePath = path.join(__dirname, 'src', 'src/db.json');
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  const resource = req.path.split('/').pop();
  const items = dbData[resource] || [];
  const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
  req.body.id = maxId + 1;
  next();
});

// Use the router
server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});