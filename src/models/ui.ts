import {FlipProp, IconDefinition} from "@fortawesome/fontawesome-svg-core";

/** Defines the alignment or layout pattern of elements*/
export enum UILayoutOption {
    Left = "left",
    Right = "right",
    Center = "center",
    TwoColumns = "2-cols",
    ThreeColumns = "3-cols",
}

export enum UIElementSize {
    XS = "xs",   // Smallest element size
    S = "s",     // Smaller than medium
    M = "m",     // Standard medium size
    L = "l",     // Larger than medium
    XL = "xl",   // Largest element size
}

/** Define FontAwesome icon animations */
export interface UIFontAwesomeIconAnimation {
    spin?: boolean;        // To spin animation
    pulse?: boolean;       // To pulse animation
    spinPulse?: boolean;   // To spin plus pulse animation
    beat?: boolean;        // To rapid heartbeat (heart effect)
    beatFade?: boolean;    // To slow pulsation with changing transparency
    bounce?: boolean;      // To jump up and down (like a ball)
    fade?: boolean;        // Gradual appearance/disappearance
    shake?: boolean;       // Shaking effect (as a warning)
    flip?: FlipProp;       // To (horizontal, vertical, both) — flip
}

/** Defines a UI element with a FontAwesome icon and optional animations. */
export interface UIFontAwesomeUIElement {
    id: number;
    isActive: boolean;
    icon: IconDefinition;
    className?: string;
    animation?: UIFontAwesomeIconAnimation;
}