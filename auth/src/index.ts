// const express = require("express");
// const { CloudEvent, HTTP } = require("cloudevents");
// const app = express();

// app.use((req, res, next) => {
//   let data = "";

//   req.setEncoding("utf8");
//   req.on("data", function (chunk) {
//     data += chunk;
//   });

//   req.on("end", function () {
//     req.body = data;
//     next();
//   });
// });

// app.post("/", (req, res) => {
//   console.log("HEADERS", req.headers);
//   console.log("BODY", req.body);

//   try {
//     const event = HTTP.toEvent({ headers: req.headers, body: req.body });
//     // respond as an event
//     const responseEventMessage = new CloudEvent({
//       source: '/',
//       type: 'event:response',
//       ...event
//     });
//     responseEventMessage.data = {
//       hello: 'world'
//     };
//     res.status(201).json(responseEventMessage);
//   } catch (err) {
//     console.error(err);
//     res.status(415).header("Content-Type", "application/json").send(JSON.stringify(err));
//   }
// });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });









import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting up the ci branch...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
