import {useEffect, useState} from "react";
import {DocumentElementWithFullscreen, DocumentWithFullscreen, FullscreenResult} from "./useFullscreen.types";

/**
 * Check for the availability of fullscreen methods in the browser
 */
const checkFullscreenSupport = (): boolean => {
    const docElement = document.documentElement as DocumentElementWithFullscreen;

    return !!(
        docElement.requestFullscreen ||
        docElement.webkitRequestFullscreen ||
        docElement.mozRequestFullScreen ||
        docElement.msRequestFullscreen
    );
};

/**
 * Check if any element is currently in fullscreen mode
 */
const isFullscreenMode = (): boolean => {
    const doc = document as DocumentWithFullscreen;

    return !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
    );
};

const enterFullscreenMode = async (element: DocumentElementWithFullscreen): Promise<void> => {
    if (element.requestFullscreen) {
        await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
    }
};

const exitFullscreenMode = async (doc: DocumentWithFullscreen): Promise<void> => {
    if (doc.exitFullscreen) {
        await doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        await doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
    }
};

const useFullscreen = (): FullscreenResult => {
    // Used to distinguish between loading and initialized state, where undefined means the state is not set yet.
    const [isFullscreen, setIsFullscreen] = useState<boolean | undefined>(undefined);
    const [isFullscreenSupported, setIsFullscreenSupported] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setIsFullscreenSupported(checkFullscreenSupport());
        setIsFullscreen(isFullscreenMode());
    }, []);

    useEffect(() => {
        const handleFullscreenEvent = () => {
            setIsFullscreen(isFullscreenMode());
        };

        // Pressing F11 is out of scope for JS to come out of again manually so we handle the key directly
        const handleF11Press = async (event: KeyboardEvent) => {
            if (event.key === "F11") {
                event.preventDefault();
                await toggleFullscreen();
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenEvent);
        document.addEventListener("webkitfullscreenchange", handleFullscreenEvent);
        document.addEventListener("mozfullscreenchange", handleFullscreenEvent);
        document.addEventListener("msfullscreenchange", handleFullscreenEvent);
        window.addEventListener("resize", handleFullscreenEvent);
        window.addEventListener("keydown", handleF11Press);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenEvent);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenEvent);
            document.removeEventListener("mozfullscreenchange", handleFullscreenEvent);
            document.removeEventListener("msfullscreenchange", handleFullscreenEvent);
            window.removeEventListener("resize", handleFullscreenEvent);
            window.removeEventListener("keydown", handleF11Press);
        };
    }, []);

    const toggleFullscreen = async (): Promise<void> => {
        if (!isFullscreenMode()) {
            await enterFullscreenMode(document.documentElement);
        } else {
            await exitFullscreenMode(document);
        }

        setIsFullscreen(isFullscreenMode());
    };

    return { toggleFullscreen, isFullscreen, isFullscreenSupported };
};

export default useFullscreen;