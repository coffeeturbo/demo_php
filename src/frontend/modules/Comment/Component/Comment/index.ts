import {Component, HostBinding, Input} from '@angular/core';
import {Comment} from "../../Entity/Comment";
import {MockData} from "../../Mock/MockData";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {AuthService} from "../../../Auth/Service/AuthService";
import {VoteState} from "../../../Vote/Entity/Vote";
import {Router} from "@angular/router";

@Component({
    selector: 'comment',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentComponent {
    public AttachmentType = AttachmentType;

    @HostBinding('class.root')
    @Input() root: boolean = true;

    @Input() comment: Comment = MockData.comment;
    
    public showChildComments = false;
    public showForm = false;
    
    constructor(
        private authService: AuthService,
        private router: Router
    ){}
    
    toggleChildComments() {
        this.showChildComments = !this.showChildComments;
    }
    
    toggleForm() {
        this.showForm = !this.showForm;
    }


    private voteInProgress = false;

    public vote(state: VoteState) {
        if (!this.authService.isSignedIn()) {
            this.router.navigate(["login"]);
        } else if (!this.voteInProgress && this.comment.votes.state !== state) {
            this.comment.votes.rating += state === "positive" ? 1 : -1;

            if (this.comment.votes.state !== "none") {
                this.comment.votes[this.comment.votes.state] -= 1;
                state = "none";
            }

            this.comment.votes[state] += 1;
            this.comment.votes.state = state;


            // this.commentService
            //     .vote(this.post, state)
            //     .finally(() => this.voteInProgress = false)
            this.voteInProgress = false;
            //     .subscribe()
            // ;
        }
    }
    
}