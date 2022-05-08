import { CronJob } from 'cron'

let cycle = 1
const maxCycles = 3

const sampleJob = new CronJob(
	'* * * 10-30 * *',
	function () {
		console.log(`LOG SAMPLE JOB CYCLE ${cycle}/${maxCycles}`)
		if (cycle++ === maxCycles) sampleJob.stop()
	},
	null,
	true,
	'Europe/London'
)
sampleJob.start()

export default sampleJob
