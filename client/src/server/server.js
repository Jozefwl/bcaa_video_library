const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const uuidv4 = require("uuid")
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// TODO pouit read a precitat zoznam z DB_videos.json

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
  console.log('get');
  res.send(videos.videosList)
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