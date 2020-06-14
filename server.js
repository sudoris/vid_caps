const express = require('express')
const ffmpeg = require('fluent-ffmpeg')
const fileUpload = require('express-fileupload')

const app = express()
const port = 5555

ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log('Server listening on port: ' + port)
})