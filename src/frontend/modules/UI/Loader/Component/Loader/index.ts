import {Component, Input} from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class LoaderComponent {
    @Input('active') active: boolean = false;
}