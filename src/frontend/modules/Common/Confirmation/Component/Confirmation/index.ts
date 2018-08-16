import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'confirmation',
    templateUrl: './template.pug',
    //styleUrls: ['./style.shadow.scss']
})

export class ConfirmationComponent {
    @Input() confirmButtonTitle: string = "OK";
    @Input() rejectButtonTitle: string = "Cancel";
    @Output() onConfirm = new EventEmitter<void>();
    @Output() onReject = new EventEmitter<void>();
}