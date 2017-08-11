type Devices = "mobile" | "tablet" | "wide" | "desktop";
type Breakpoints = {
    [key in Devices]: number
};

const breakpoints: Breakpoints = {
    mobile:  320,
    tablet:  740,
    desktop: 980,
    wide:    1300
};

export class Device {
    public static isMobile(): boolean {
        return typeof window != 'undefined' && window.innerWidth < breakpoints.tablet;
    }
}