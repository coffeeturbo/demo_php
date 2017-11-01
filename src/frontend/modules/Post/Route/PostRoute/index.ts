import {Component, OnInit} from '@angular/core';
import {Post} from "../../Entity/Post";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute implements OnInit {
    
    public post: Post;

    constructor(private route: ActivatedRoute){}

    ngOnInit() {
        this.post = this.route.snapshot.data.post;
    }
}