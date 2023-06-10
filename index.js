var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage});

app.use(cors());
app.use(express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res){
  const file = req.file;
  const name = file.originalname;
  const type = file.mimetype;
  const size = file.size;

  const jsonResponse = {
    name: name,
    type: type,
    size: size
  };
  console.log(!!req.file);
  res.json(jsonResponse);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
