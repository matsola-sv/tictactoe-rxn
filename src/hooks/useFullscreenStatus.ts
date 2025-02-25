import {useCallback, useEffect, useState} from 'react';

export interface FullscreenStatusResult {
    isFullscreen: boolean;
    toggleFullscreen: () => Promise<void>;
}

const useFullscreenStatus = (): FullscreenStatusResult => {
    // Using a function to get the current fullscreenElement value, not a static one.
    const isGlobalFullscreen = () => document.fullscreenElement !== null;

    // Initialize isFullscreen with the current value, as the fullscreenchange event
    // will not trigger on remount if no state change occurs.
    const [isFullscreen, setIsFullscreen] = useState<boolean>(isGlobalFullscreen);

    // Subscribe to fullscreen change once after the component renders
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(isGlobalFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Remove fullscreen listener when the component is unmounted
        // to prevent memory leaks or unintended behavior
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = useCallback(async () => {
        try {
            if (isFullscreen) {
                await document.exitFullscreen();
            } else {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            throw new Error(isFullscreen ?
                `Exit fullscreen error` : "Fullscreen error"
            );
        }
    }, [isFullscreen]);

    return { isFullscreen, toggleFullscreen };
};

export default useFullscreenStatus;