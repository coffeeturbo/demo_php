import {Component} from '@angular/core';

@Component({
    selector: 'application-logo',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ApplicationLogoComponent {
    public product_name = require('../../../../app/config.json').product_name;
}
