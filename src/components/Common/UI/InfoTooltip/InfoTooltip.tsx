import { FC, useState } from 'react';

// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import 'components/Common/UI/InfoTooltip/InfoTooltip.css';

interface InfoTooltipProps {
	text: string;
}

const InfoTooltip: FC<InfoTooltipProps> = ({ text }) => {
	const [isTooltipVisible, setTooltipVisible] = useState(false);

	return (
		<span
			className='info-tooltip'
			onMouseEnter={() => setTooltipVisible(true)}
			onMouseLeave={() => setTooltipVisible(false)}
			onTouchStart={() => setTooltipVisible(!isTooltipVisible)} // For mobile devices
		>
			<FontAwesomeIcon icon={faInfoCircle} />
			{isTooltipVisible && <div className='tooltip-text'>{text}</div>}
		</span>
	);
};
export default InfoTooltip;
