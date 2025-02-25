/**
 * Storing values that change depending on the fullscreen state
 * Example usage:
 *
 * const labels: FullscreenStateMap<string> = {
 *   enter: "Enter Fullscreen",
 *   exit: "Exit Fullscreen"
 * };
 *
 * const icons: FullscreenStateMap<JSX.Element> = {
 *   enter: <FaExpand />,
 *   exit: <FaCompress />
 * };
 */
export interface FullscreenStateMap<T> {
    enter: T;
    exit: T;
}

export interface FullscreenToggleProps {
    isDisabled?: boolean;
    labels?: FullscreenStateMap<string>;
    buttonClass?: string;
}