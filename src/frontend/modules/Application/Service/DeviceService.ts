import {Injectable} from "@angular/core";

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

@Injectable()
export class Device {
    
    isMobile() : boolean {
        return window.innerWidth < breakpoints.tablet;
    }
}

