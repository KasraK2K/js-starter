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

import RabbitMQ from './RabbitMQ'

export default RabbitMQ
