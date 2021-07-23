import mongoose from 'mongoose';
import { app } from './app';
// import { natsWrapper } from './nats-wrapper';
// import { OrderCreatedListener } from './events/listeners/order-created-listener';
// import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app2',
  brokers: ['my-cluster-kafka-bootstrap.kafka:9092']
})


const consumer = kafka.consumer({ groupId: 'test-group' })
const main = async() => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'my-topic', fromBeginning: true })
    await consumer.run({
      // autoCommit: false,
      // eachMessage: async ({ topic, partition, message }) => {
      eachMessage: async ( {topic, partition, message}:{topic: any, partition: any, message: any } ) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');

    } catch(err){
      console.log(err);
    }



    
    app.listen(3000, () => {
      console.log('Listening on porT 3000!!!!!!!!');
    });

}
main() 
//[INFO] 08:17:21 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 3.9.9)
/* 
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

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
*/