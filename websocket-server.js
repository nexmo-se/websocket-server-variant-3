'use strict'

//-------------

require('dotenv').config();

//--
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const expressWs = require('express-ws')(app);
app.use(bodyParser.json());

//---- CORS policy - Update this section as needed ----

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// //---- DeepGram ASR engine ----

// const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
// const fetch = require("cross-fetch");
// const dgApiKey = process.env.DEEPGRAM_API_KEY;

//-----------------------------------------------------------

app.ws('/socket', (ws, req) => {

  //-- sample custom data --
  const participant = req.query.participant;
  const param1 = req.query.attribute1;
  const param2 = req.query.attribute2;

  console.log('\nNew WebSocket established');
  console.log('Participant:', participant);
  console.log('Custom parameter 1:', param1);
  console.log('Custom parameter 2:', param2);

  //--

  // console.log('Opening client connection to DeepGram');

  // const deepgramClient = createClient(dgApiKey);

  // let deepgram = deepgramClient.listen.live({       
  //   model: "nova-2",
  //   smart_format: true,      
  //   language: "en-US",        
  //   encoding: "linear16",
  //   sample_rate: 16000
  // });

  // deepgram.addListener(LiveTranscriptionEvents.Open, async () => {
  //   console.log("deepgram: connected");

  //   deepgram.addListener(LiveTranscriptionEvents.Transcript, async (data) => {
  //     // console.log(JSON.stringify(data));
  //     const transcript = data.channel.alternatives[0].transcript;

  //     if (transcript != '') {

  //     console.log('\n', participant, 'said:', transcript);

  //     }   

  //   });

  //   deepgram.addListener(LiveTranscriptionEvents.Close, async () => {
  //     console.log("deepgram: disconnected");
  //     clearInterval(keepAlive);
  //     deepgram.finish();
  //   });

  //   deepgram.addListener(LiveTranscriptionEvents.Error, async (error) => {
  //     console.log("deepgram: error received");
  //     console.error(error);
  //   });

  //   deepgram.addListener(LiveTranscriptionEvents.Warning, async (warning) => {
  //     console.log("deepgram: warning received");
  //     console.warn(warning);
  //   });

  //   deepgram.addListener(LiveTranscriptionEvents.Metadata, (data) => {
  //     console.log("deepgram: metadata received");
  //     console.log(JSON.stringify({ metadata: data }));
  //   });
  
  // });

  //---------------

  ws.on('message', (msg) => {
    
    if (typeof msg === "string") {

      console.log('>>> WebSocket text data:', msg)
    
    } else {

      // just for tests
      // normally the sent audio is from a TTS engine, Voice bot, noise-cancellation engine, sound FX engine, etc ...
      ws.send(msg);  // echo back received payload

      //---
      // if (deepgram.getReadyState() === 1 /* OPEN */) {
      //   deepgram.send(msg);
      // } else if (deepgram.getReadyState() >= 2 /* 2 = CLOSING, 3 = CLOSED */) {
      //   // console.log("ws: data couldn't be sent to deepgram");
      //   null
      // } else {
      //   // console.log("ws: data couldn't be sent to deepgram");
      //   null
      // }
      //---

    } 

  });

  //--

  ws.on('close', () => {

    // deepgram.finish();
    // deepgram.removeAllListeners();
    // deepgram = null;

    console.log("\n--- WebSocket closed");

  });

});

//-------------------------------------------------------------------------------------------

//--- If this application is hosted on Vonage Cloud Runtime (VCR) serverless infrastructure

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

//==================================================

const port = process.env.NERU_APP_PORT || process.env.PORT || 6000;

app.listen(port, () => console.log(`WebSocket server code running on port ${port}.`));

//------------
