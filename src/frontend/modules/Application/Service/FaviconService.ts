import {Injectable} from "@angular/core";
import {PlatformService} from "./PlatformService";

const unreadIcon = require('../../../assets/favicons/favicon-unread.png');
const unreadBigIcon = require('../../../assets/favicons/favicon-32-unread.png');
const defaultIcon = require('../../../assets/favicons/favicon.png');
const defaultBigIcon = require('../../../assets/favicons/favicon-32.png');


@Injectable()
export class FaviconService {
    
    constructor(private pl: PlatformService){
    }
    
    public setFavicon(favicon: Favicon, favicon32: Favicon) {
        if(this.pl.isPlatformBrowser() && typeof document !=="undefined") {
            let link = <HTMLLinkElement>document.querySelector("#favicon");
            link.href = favicon;
            document.getElementsByTagName('head')[0].appendChild(link);

            let link2 = <HTMLLinkElement>document.querySelector("#favicon-big");
            link2.href = favicon32;
            document.getElementsByTagName('head')[0].appendChild(link2);
        }
    }
    
    
    public setUnreadFavicon() {
        this.setFavicon(unreadIcon, unreadBigIcon);
    }
    
    public resetFavicon() {
        this.setFavicon(defaultIcon, defaultBigIcon);
    }
}


type Favicon = string;