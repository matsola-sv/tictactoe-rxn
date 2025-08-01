export interface DocumentElementWithFullscreen extends HTMLElement {
	msRequestFullscreen?: () => Promise<void>;
	mozRequestFullScreen?: () => Promise<void>;
	webkitRequestFullscreen?: () => Promise<void>;
}

export interface DocumentWithFullscreen extends Document {
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	webkitFullscreenElement?: Element;
	msExitFullscreen?: () => Promise<void>;
	mozCancelFullScreen?: () => Promise<void>;
	webkitExitFullscreen?: () => Promise<void>;
}

export interface FullscreenResult {
	isFullscreen: boolean | undefined;
	isFullscreenSupported: boolean | undefined;
	toggleFullscreen: () => Promise<void>;
}
