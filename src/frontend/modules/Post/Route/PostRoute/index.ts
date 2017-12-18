import {Component, OnInit} from '@angular/core';
import {Post} from "../../Entity/Post";
import {ActivatedRoute} from "@angular/router";
import {MockData} from "../../../Comment/Mock/MockData";
import {Comment} from "../../../Comment/Entity/Comment";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute implements OnInit {
    
    public post: Post;
    public mockComment1: Comment = MockData.comment;
    public mockComment2: Comment = MockData.comment;

    constructor(private route: ActivatedRoute){}

    ngOnInit() {
        this.post = this.route.snapshot.data.post;
    }
}