import {useContext} from "react";
import {MediaQueryContext} from "../components/Providers/MediaQueryProvider/MediaQueryProvider";

/**
 * Custom hook for accessing media query context values,
 * including screen sizes, orientation, and motion preferences
 */
const useMediaQueryContext = () => {
    const context = useContext(MediaQueryContext);
    if (!context) {
        throw new Error("useMediaQueryContext must be used within a MediaQueryProvider");
    }
    return context;
};
export default useMediaQueryContext;