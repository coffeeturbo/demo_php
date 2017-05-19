import {Component} from '@angular/core';
import {SidebarService} from "../../Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";

@Component({
    selector: 'sidebar',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class SidebarComponent {
    config = require('../../../../app/config.json');
    constructor(public service: SidebarService, public authService: AuthService) {}
}
