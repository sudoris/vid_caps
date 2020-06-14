const express = require('express')
const ffmpeg = require('fluent-ffmpeg')
const fileUpload = require('express-fileupload')

const app = express()

ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')

