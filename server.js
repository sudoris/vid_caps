const express = require('express')
const ffmpeg = require('fluent-ffmpeg')
const fileUpload = require('express-fileupload')

const app = express()
const port = 5555

app.use(fileUpload())

ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } 

  const timeStamps = []
  // let timePoint = 0.25
  // while (timePoint <= 100) {
  //   timeStamps.push(timePoint)
  //   timePoint+=.25
  // }

  // let timePoint = 5.0
  // while (timePoint <= 100) {
  //   timeStamps.push(`${timePoint}%`)
  //   timePoint+=5.0
  // }

  req.files.video.mv('temp/videos/' + req.files.video.name, function (err) {
    if (err) return res.sendStatus(500).send(err)

    console.log('file saved in temp')      
   
    ffmpeg(`/temp/videos/${req.files.video.name}`)
      .on('filenames', function(filenames) {
        console.log('Will generate ' + filenames.join(', '))
      })
      .on('error', function() {
        return res.sendStatus(500).send(err)
      })
      .on('end', function() {
        console.log('Screenshots taken');
        res.send('Okay')
      })
      .screenshots({
        // Will take screenshots at every 10% of video duration
        count: 10,
        folder: 'temp/images'
      }); 
      // .screenshots({
      //   timestamps: timeStamps,
      //   filename: 'thumbnail-at-%s-seconds.png',
      //   folder: 'temp/images',
      //   size: '320x240'
      // });   
  })

})

app.listen(port, () => {
  console.log('Server listening on port: ' + port)
})