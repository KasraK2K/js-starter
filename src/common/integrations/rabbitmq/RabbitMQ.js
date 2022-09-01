import amqp from 'amqplib/callback_api'
import Ack from './Ack'
import PubSub from './PubSub'
import Rpc from './Rpc'

class RabbitMQ {
	constructor(uri = process.env.RBBITMQ_URI) {
		this.uri = uri
		this.amqp = amqp
		this.ack = new Ack(this)

		this.pubsub = new PubSub(this)
		this.rpc = new Rpc(this)
	}
}

export default RabbitMQ
