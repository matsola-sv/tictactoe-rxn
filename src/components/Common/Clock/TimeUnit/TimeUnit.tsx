import React, { FC, ReactElement } from 'react';

interface TimeUnitProps {
	value: number;
	label: string;
	separator?: string;
}

const TimeUnit: FC<TimeUnitProps> = ({ value, label, separator = ':' }) => {
	const formattedValue: string = value.toString().padStart(2, '0');

	const renderSeparator = (): ReactElement | boolean => {
		if (separator) {
			return <span className='time-separator'>{separator}</span>;
		}
		return false;
	};

	return (
		<>
			<div className='time-unit'>
				<span className='value'>{formattedValue}</span>
				<span className='label'>{label}</span>
			</div>
			{renderSeparator()}
		</>
	);
};
export default TimeUnit;
