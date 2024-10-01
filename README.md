# WebSocket server (aka Middleware server) - Variant 3

You may use this sample code as a middleware server to handle WebSockets connections and receive audio over those WebSokets.

Of course, in real reployment, your middleware application is an intermediary platform to connect to ASR engines, TTS engines, Voice bots, Voice AI, Noise cancellation engines, Voice FX engines, and more, and may also send back audio to the Vonage platform.

In this sample code, if desired, you may use Deepgram as an ASR engine.

## About this sample server code

This middleware server makes use of the [WebSockets feature](https://developer.vonage.com/en/voice/voice-api/concepts/websockets) of Vonage Voice API. When a voice call is established, a Voice API application triggers a WebSocket connection to this server and streams the audio from the voice call(s) in real time.

See https://github.com/nexmo-se/pstn-websocket-app-variant-3 for a **sample Voice API application** using this basic middleware server code to connect voice calls.

## Set up

### Set up this server code - Host server public hostname and port

First set up this server from https://github.com/nexmo-se/websocket-server-variant-3.

Default local (not public!) reference connection code `port` is: 6000.

If you plan to test using `Local deployment` with ngrok (Internet tunneling service) for both this server code and the sample Voice API application, you may set up [multiple ngrok tunnels](https://ngrok.com/docs/agent/config/#tunnel-configurations).

For the next steps, you will need:
- This server's public hostname and if necessary public port,</br>
e.g. `xxxxxxxx.ngrok.io`, `xxxxxxxx.herokuapp.com`, `myserver.mycompany.com:32000` (will be needed when setting up the sample Voice API application side) ,</br>
no `port` is necessary with ngrok or heroku as public hostname.</br>

Have Node.js installed on your system, this application has been tested with Node.js version 18.19.1<br>

Install node modules with the command:<br>
 ```bash
npm install
```

To illustrate using Deepgram as an ASR (Automatic Speech Recognition) engine with this middleware, you may use a Deepgram API key (see https://developers.deepgram.com/docs/create-additional-api-keys)

Copy or rename .env-example to .env, edit that file and enter your Deepgram API key.


Launch the application:<br>
```bash
node websocket-server
```

## How this application works

Receives audio from a peer PSTN leg associated to a WebSocket (set up by the Voice API application named pstn-websocket-app.js).<br>

Transcript results from the Deepgram ASR are displayed (if enabled).

Your actual middleware application may also send audio in the other direction to one or more PSTN legs via the established WebSocket.<br><br>


## Other capabilities handled by this sample application code

A WebSocket receives the DTMF events that may be received on the peer PSTN leg. They would be displayed in this application as text payload.<br>
