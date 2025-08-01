import { FC } from 'react';
import TimeUnit from 'components/Common/Clock/TimeUnit/TimeUnit';
import 'components/Common/Clock/TimeViewer/TimeViewer.css';

interface StopwatchProps {
	hours: number;
	minutes: number;
	seconds: number;
}

const TimeViewer: FC<StopwatchProps> = ({ hours, minutes, seconds }) => {
	return (
		<div className='time-viewer'>
			<TimeUnit
				value={hours}
				label={'hours'}
			/>
			<TimeUnit
				value={minutes}
				label={'minutes'}
			/>
			<TimeUnit
				value={seconds}
				label={'seconds'}
				separator={''}
			/>
		</div>
	);
};
export default TimeViewer;
