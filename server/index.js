const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/video_token', (req, res) => {
  const { identity, room } = req.body
  const token = videoToken({identity, room})
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify({
    token: token.toJwt()
  }))
})

const videoToken = ({identity, room}) => {
  const token = genToken({identity})
  const { VideoGrant } = twilio.jwt.AccessToken
  token.addGrant(room ? new VideoGrant({room}) : new VideoGrant())
  return token
}

const genToken = ({identity}) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const apiKey = process.env.TWILIO_API_KEY
  const apiSecret = process.env.TWILIO_API_SECRET
  return new twilio.jwt.AccessToken(accountSid, apiKey, apiSecret, {identity})
}

app.listen(8000, () => console.log("Server at localhost:8000"))
