import {Component} from '@angular/core';

import {SidebarService} from "../../Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {SettingsModalService} from "../../../Settings/Service/SettingsModalService";

@Component({
    selector: 'sidebar',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class SidebarComponent {
    config = require('../../../../app/config.json');
    constructor(
        public service: SidebarService,
        public auth: AuthService,
        public settingsModalService: SettingsModalService) {
    }
}
