import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Profile} from "../../Entity/Profile";

@Component({
    templateUrl: "./template.pug"
})
export class ProfileRoute implements OnInit {

    public profile: Profile;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
    }
}