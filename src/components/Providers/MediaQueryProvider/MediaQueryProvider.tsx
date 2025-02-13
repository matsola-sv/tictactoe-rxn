import React, {createContext, FC, ReactNode, useMemo} from 'react';
import {useMedia} from "use-media";

interface MediaQueryProps {
    children: ReactNode;
}

interface MediaQueryContextType {
    mobileView: boolean;
    tabletPlusView: boolean;
    tabletOrMobileView: boolean;
    prefersReducedMotion: boolean; // Checking if the "Reduce Motion" option is enabled in the browser to reduce or disable animations.
}

export const MediaQueryContext = createContext<MediaQueryContextType | null>(null);

const mediaQueries = {
    mobile: '(max-width: 480px)',
    tabletOrMobile: '(max-width: 768px)',
    tabletPlus: '(min-width: 769px)',
    prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

/**
 * Provider that gives access to media-related data such as screen sizes, orientation, and reduced motion preferences.
 * For this, it uses the useMedia hook from the use-media library
 */
const MediaQueryProvider: FC<MediaQueryProps> = ({children}) => {
    const mobileView = useMedia(mediaQueries.mobile);
    const tabletOrMobileView = useMedia(mediaQueries.tabletOrMobile);
    const tabletPlusView = useMedia(mediaQueries.tabletPlus);
    const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);

    const value = useMemo(() => ({
        mobileView,
        tabletPlusView,
        tabletOrMobileView,
        prefersReducedMotion
    }), [mobileView, tabletOrMobileView, tabletPlusView, prefersReducedMotion]);

    return (
        <MediaQueryContext.Provider value={value}>
            {children}
        </MediaQueryContext.Provider>
    );
};
export default MediaQueryProvider;