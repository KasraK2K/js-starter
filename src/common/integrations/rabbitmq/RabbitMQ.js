import amqp from 'amqplib/callback_api'
import Ack from './Ack'

class RabbitMQ {
	constructor(uri = process.env.RBBITMQ_URI) {
		this.uri = uri
		this.amqp = amqp
		this.ack = new Ack(this)
	}
}

export default RabbitMQ
