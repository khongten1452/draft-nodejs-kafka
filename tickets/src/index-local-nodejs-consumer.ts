// import mongoose from 'mongoose';
import { app } from './app';
// import { natsWrapper } from './nats-wrapper';
// import { OrderCreatedListener } from './events/listeners/order-created-listener';
// import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app2',
  brokers: ['192.168.1.204:31144']
  //  brokers: ['my-cluster-kafka-bootstrap.kafka:9092']

})


const consumer = kafka.consumer({ groupId: 'test-group' })
const main = async() => {

  // if (!process.env.JWT_KEY) {
  //   throw new Error('JWT_KEY must be defined');
  // }
  // if (!process.env.MONGO_URI) {
  //   throw new Error('MONGO_URI must be defined');
  // }

  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'my-topic', fromBeginning: true })
    // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      // autoCommit: false,
      // eachMessage: async ({ topic, partition, message }) => {
      eachMessage: async ( {topic, partition, message}:{topic: any, partition: any, message: any } ) => {
        console.log({
          // https://www.confluent.io/blog/getting-started-with-kafkajs/
          // topic,
          // partition,
          // key: message.key.toString(),          
          value: message.value.toString(),
        })
      },
    })

    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // });
    // console.log('Connected to MongoDb');

    } catch(err){
      console.log(err);
    }



    
    app.listen(3000, () => {
      console.log('Listening on porT 3000!!!!!!!!');
    });

}
main() 
// https://kafka.js.org/docs/consuming
// manual commit 