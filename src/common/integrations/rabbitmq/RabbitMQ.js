// ──────────────────────────────────────────────────────────────────────
//   :::::: H O W   T O   U S E : :  :   :    :     :        :          :
/* ──────────────────────────────────────────────────────────────────────
import RabbitMQ from 'src/common/integrations/rabbitmq'
const rabbitmq = new RabbitMQ('amqp://username:password@localhost:5672')
rabbitmq.producer({ name: 'Kasra' })
rabbitmq.consumer(
	(data) =>
		new Promise((resolve, reject) => {
			console.log(`Consume:\n${JSON.stringify(data, null, 2)}\n`)
			return data ? resolve('this is true') : reject('this is false')
		})
)
────────────────────────────────────────────────────────────────────── */

import amqp from 'amqplib/callback_api'

class RabbitMQ {
	constructor(uri = process.env.RABBIT_MQ_URI) {
		this.uri = uri
	}

	/**
	 * @param {Promise} callback
	 * @param {string} queue_name
	 */
	consumer(callback, queue_name = 'rabbitmq_starter_queue') {
		amqp.connect(this.uri, (error0, connection) => {
			if (error0) throw error0

			connection.createChannel((error1, channel) => {
				if (error1) throw error1

				/**
				 * @argument {durable} This makes sure the queue is declared before attempting to consume from it
				 */
				channel.assertQueue(queue_name, { durable: true })

				/**
				 * @param {prefetch} This tells RabbitMQ not to give more than one message to a worker at a time.
				 * Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
				 * Instead, it will dispatch it to the next worker that is not still busy.
				 */
				channel.prefetch(1)

				console.log('Waiting for messages in %s. To exit press CTRL+C', queue_name)

				channel.consume(
					queue_name,
					(message) => {
						const content = JSON.parse(message.content.toString())
						callback(content)
							.then(() => channel.ack(message))
							.catch((error) => console.log(error.message))
					},
					{ noAck: false }
				)
			})
		})
	}

	/**
	 * @param {object} message
	 * @param {string} queue_name
	 */
	producer(message = {}, queue_name = 'rabbitmq_starter_queue') {
		amqp.connect(this.uri, (error0, connection) => {
			if (error0) throw error0

			connection.createChannel((error1, channel) => {
				if (error1) throw error1

				/**
				 * @argument {durable} This makes sure the queue is declared before attempting to consume from it
				 */
				channel.assertQueue(queue_name, { durable: true })

				/**
				 * @argument {persistent} Persistent messages will be written to disk as soon as they reach the queue,
				 * while transient messages will be written to disk only so that they can be evicted from memory while under memory pressure
				 */
				channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(message)), { persistent: true })
			})

			setTimeout(() => {
				connection.close()
				process.exit(0)
			}, 500)
		})
	}
}

export default RabbitMQ
