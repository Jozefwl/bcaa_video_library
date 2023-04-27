const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const uuidv4 = require("uuid")
const port = 3001
const multer = require("multer");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + "-" + file.originalname);
  },
  });

  const upload = multer({ storage });

//videos database
const defaultDb = {
  "videosList" : []
}

function readDB() {
  let path = "./server_data/DB_videos.json"
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./server_data/")
    fs.writeFileSync(path, JSON.stringify(defaultDb))
  }
  return JSON.parse(fs.readFileSync(path))
}


function saveDB(ObjectDB) {
  let path = "./server_data/DB_videos.json"
  if (!fs.existsSync(path)) {
    fs.mkdirSync("./server_data/")
  }
  fs.writeFileSync(path, JSON.stringify(ObjectDB, null, 2))
}

let videos = readDB()


app.get('/api/videos', (req, res) => {
 
  console.log('get', req.query.filterCriteria)
  let criteria = req.query.filterCriteria === undefined || req.query.filterCriteria === "" ? ".*" : req.query.filterCriteria
  res.send(videos.videosList.filter((video) => 
    video.name.match(criteria) != null || video.genre.match(criteria) != null)
  )
})

app.post('/api/videos', (req, res) => {
  console.log('post');
  videos.videosList.push({...req.body, id: uuidv4.v4()})
  saveDB(videos)
  res.send(videos.videosList)
})

app.delete('/api/videos', (req, res) => {
  console.log('delete');
  const newVideoList = videos.videosList.filter((video) => video.id !== req.body.id)
  videos.videosList = newVideoList
  saveDB(videos)
  res.send(videos.videosList)
})


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})