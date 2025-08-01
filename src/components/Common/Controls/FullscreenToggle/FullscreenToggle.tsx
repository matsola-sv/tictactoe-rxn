import { FC } from 'react';
import classNames from 'classnames';
// Fontawesome
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
// Models
import { FullscreenToggleProps } from 'components/Common/Controls/FullscreenToggle/FullscreenToggle.types';
// Hooks
import useFullscreen from 'hooks/fullscreen/useFullscreen';
// Components
import IconButton from 'components/Common/Controls/IconButton/IconButton';

const FullscreenToggle: FC<FullscreenToggleProps> = (props) => {
	const {
		buttonClass,
		isDisabled = false,
		isHideIfUnsupported = false,
		labels = {
			enter: 'Full screen',
			exit: 'Exit full screen',
		},
	} = props;

	const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

	if (isHideIfUnsupported && !isFullscreenSupported) {
		return null;
	}

	return (
		<IconButton
			className={classNames(buttonClass, { disabled: !isFullscreenSupported })}
			isDisabled={isDisabled}
			title={isFullscreen ? labels.exit : labels.enter}
			icon={isFullscreen ? faCompress : faExpand}
			onClick={toggleFullscreen}
		/>
	);
};
export default FullscreenToggle;
