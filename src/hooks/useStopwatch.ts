import {useCallback, useEffect, useState} from "react";
import Time from "../utils/time";

export interface StopwatchConfig {
    autoStart?: boolean,                                          // If set to true stopwatch will auto start
    initialMillis?: number                                        // Starting point in milliseconds for the stopwatch
}

export interface StopwatchResult {
    secondsStamp: number,
    seconds: number,
    minutes: number,
    hours: number,
    isActive: boolean,                                              // Flag to indicate if stopwatch is working or not
    start: () => void,                                              // Function to be called to start/resume stopwatch
    pause: () => void,                                              // Function to be called to pause stopwatch
    reset: (autoRestart?: boolean, offsetMills?: number) => void    // To reset stopwatch to 0:0:0:0 or to reset stopwatch with offset
}

const useStopwatch = (config: StopwatchConfig): StopwatchResult => {
    const { autoStart = false, initialMillis = 0 }: StopwatchConfig = config;

    const [isActive, setIsActive] = useState<boolean>(autoStart);
    const [secondsStamp, setSecondsStamp] = useState<number>(initialMillis / 1000);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                // The previous value is transferred to setSeconds
                setSecondsStamp(
                    prevSeconds => prevSeconds + 1
                );
            }, 1000);

            // Clearing the interval when dismantling the hook
            return () => clearInterval(interval);
        }
    }, [isActive]);

    /**
     * Changes the timer activity if the new value is different from the old one.
     * If force = true, then the activity is necessarily updated
     * @param newActivity
     * @param force
     */
    const updateActivity = useCallback((newActivity: boolean, force: boolean = false): void => {
        if (force || isActive !== newActivity) {
            setIsActive(newActivity);
        }
    }, [isActive]);

    /**
     * To be called to start/resume stopwatch
     */
    const start = useCallback((): void => {
        updateActivity(true);
    }, [updateActivity]);

    /**
     * To be called to pause stopwatch
     */
    const pause = useCallback((): void => {
        updateActivity(false);
    }, [updateActivity]);

    /**
     * To reset stopwatch to 0:0:0 (h:m:s) or use to reset stopwatch with offset of times
     * For example: offset = (5 * 60 * 1000 + 4 * 1000) - reset to 00:05:04
     *
     * @param autoRestart
     * @param offsetMills
     */
    const reset = useCallback(
        (autoRestart: boolean = false, offsetMills = 0): void => {
            updateActivity(autoRestart, true);
            setSecondsStamp(offsetMills / 1000);
        },
        [updateActivity]
    );

    return {
        ...Time.getTimeFromSeconds(secondsStamp),
        isActive,
        start,
        pause,
        reset
    }
}
export default useStopwatch;