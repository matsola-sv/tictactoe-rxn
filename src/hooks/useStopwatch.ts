import {useEffect, useState} from "react";
import Time from "../utils/time";

export interface StopwatchConfig {
    autoStart?: boolean,                                          // if set to true stopwatch will auto start
    initialMillis?: number                                        // starting point in milliseconds for the stopwatch
}

export interface StopwatchResult {
    secondsStamp: number,
    seconds: number,
    minutes: number,
    hours: number,
    isActive: boolean,                                              // flag to indicate if stopwatch is working or not
    start: () => void,                                              // function to be called to start/resume stopwatch
    pause: () => void,                                              // function to be called to pause stopwatch
    reset: (autoRestart?: boolean, offsetMills?: number) => void    // to reset stopwatch to 0:0:0:0 or to reset stopwatch with offset
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

            return () => clearInterval(interval);
        }
    }, [isActive]);

    /**
     * To be called to start/resume stopwatch
     */
    const start = (): void => setIsActive(true);

    /**
     * To be called to pause stopwatch
     */
    const pause = (): void => setIsActive(false);

    /**
     * To reset stopwatch to 0:0:0 (h:m:s) or use to reset stopwatch with offset of times
     * For example: offset = (5 * 60 * 1000 + 4 * 1000) - reset to 00:05:04
     *
     * @param autoRestart
     * @param offsetMills
     */
    const reset = (autoRestart: boolean = false, offsetMills = 0): void => {
        setIsActive(autoRestart);
        setSecondsStamp(offsetMills / 1000);
    };

    return {
        ...Time.getTimeFromSeconds(secondsStamp),
        isActive,
        start,
        pause,
        reset
    }
}
export default useStopwatch;