const express = require('express');
const app = express();

//const PORT = 9000;
const PORT = process.env.PORT || 9000

app.use(express.static('dist'));
app.use(express.static('./'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

//app.listen(PORT);
app.listen(PORT, err => {
  if(err) throw err;
  console.log("%c Server running", "color: green");
});
console.log(`[SERVER RUNNING] 127.0.0.1:${PORT}`);
