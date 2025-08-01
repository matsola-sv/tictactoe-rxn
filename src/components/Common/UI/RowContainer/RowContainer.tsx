import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { UILayoutOption } from 'models/ui';
import 'components/Common/UI/RowContainer/RowContainer.css';

interface RowContainerProps {
	children: ReactNode; // Elements to display inside the container. It can also be an array of ReactElements
	placement?: UILayoutOption; // Specifies the layout pattern (alignment or column distribution)
	className?: string;
}

const RowContainer: FC<RowContainerProps> = ({
	placement = UILayoutOption.Center,
	children,
	className,
}) => {
	const classes: string = classNames('row-cont', `pl-${placement}`, className);

	return <div className={classes}>{children}</div>;
};
export default RowContainer;
