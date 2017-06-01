import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './template.pug'
})
export class ProfileRoute implements OnInit {

    public profile;

    constructor(private route: ActivatedRoute) {}
    
    ngOnInit()
    {
        this.profile = this.route.snapshot.data['profile'];
    }
}
