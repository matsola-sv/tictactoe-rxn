import { createContext, FC, ReactNode, useMemo } from 'react';
import { useMedia } from 'use-media';

interface MediaQueryContextType {
	mobileMView: boolean; // Mobile medium screen (<= 424px)
	tabletMView: boolean; // Tablet medium screen (600px - 768px)
	tabletMUpView: boolean; // Screens 600px and wider (tabletM and larger)
	lowHeightView: boolean; // Low-height screen (<= 480px)
	prefersReducedMotion: boolean; // Checking if the "Reduce Motion" option is enabled in the browser to reduce or disable animations.
}

export interface MediaQueryProps {
	children: ReactNode;
}

export const MediaQueryContext = createContext<MediaQueryContextType | null>(null);

const mediaQueries = {
	mobileM: '(max-width: 424px)',
	tabletMUp: '(min-width: 600px)',
	tabletM: '(min-width: 600px) and (max-width: 768px)',
	lowHeight: '(max-height: 480px)',
	prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

/**
 * Provider that gives access to media-related data such as screen sizes, orientation, and reduced motion preferences.
 * For this, it uses the useMedia hook from the use-media library
 */
const MediaQueryProvider: FC<MediaQueryProps> = ({ children }) => {
	const mobileMView = useMedia(mediaQueries.mobileM);
	const tabletMUpView = useMedia(mediaQueries.tabletMUp);
	const tabletMView = useMedia(mediaQueries.tabletM);
	const lowHeightView = useMedia(mediaQueries.lowHeight);
	const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);

	const value = useMemo(
		() => ({
			mobileMView,
			tabletMUpView,
			tabletMView,
			lowHeightView,
			prefersReducedMotion,
		}),
		[mobileMView, tabletMUpView, tabletMView, lowHeightView, prefersReducedMotion],
	);

	return <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>;
};
export default MediaQueryProvider;
