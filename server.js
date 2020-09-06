const express = require('express');

const app = express();

app.use(express.static('./dist/angular-otot'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/angular-otot/'}),
);

app.listen(process.env.PORT || 8080);
