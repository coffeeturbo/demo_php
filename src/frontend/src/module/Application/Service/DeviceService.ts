import {Injectable} from "@angular/core";

@Injectable()
export class Device {

    isMobile() : boolean {
        return window.innerWidth < breakpoints.tablet;
    }
}

const breakpoints:any = {
    mobile:  320,
    tablet:  740,
    desktop: 980,
    wide:    1300
};