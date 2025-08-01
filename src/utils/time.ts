interface TimeI {
	hours: number;
	minutes: number;
	seconds: number;
	secondsStamp: number;
}

class Time {
	public static getTimeFromSeconds(sec: number): TimeI {
		const secondsStamp = Math.ceil(sec);
		const seconds = Math.floor(secondsStamp % 60);
		const minutes = Math.floor((secondsStamp % (60 * 60)) / 60);
		const hours = Math.floor((secondsStamp % (60 * 60 * 24)) / (60 * 60));

		return {
			secondsStamp,
			seconds,
			minutes,
			hours,
		};
	}
}
export default Time;
