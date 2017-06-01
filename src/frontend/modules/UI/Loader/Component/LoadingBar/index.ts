import {Component} from '@angular/core';

import {LoadingBarService} from "../../Service/LoadingIndicatorService";

@Component({
    selector: 'loading-indicator',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class LoadingBarComponent {
    constructor(public loadingBar: LoadingBarService){}
}
