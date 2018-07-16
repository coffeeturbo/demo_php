import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Comment} from "../../Entity/Comment";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {AuthService} from "../../../Auth/Service/AuthService";
import {VoteState} from "../../../Vote/Entity/Vote";
import {Post} from "../../../Post/Entity/Post";
import {CommentService} from "../../Service/CommentService";
import {PlatformService} from "../../../Application/Service/PlatformService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";

@Component({
    selector: 'comment',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentComponent implements OnInit {
    public AttachmentType = AttachmentType;

    @HostBinding('class.root')
    @Input() root: boolean = true;

    @Input() comment: Comment;
    @Input() post: Post;
    
    public showChildComments = true;
    public showForm = false;
    
    constructor(
        public pl: PlatformService,
        public auth: AuthService,
        private authService: AuthService,
        private commentService: CommentService,
        private authModalsService: AuthModalsService
    ){}

    ngOnInit() {
        if(this.comment.level == 2) {
            this.showChildComments = false;
        }
    }

    public toggleChildComments() {
        this.showChildComments = !this.showChildComments;
    }

    public toggleForm() {
        this.showForm = !this.showForm;
    }

    private voteInProgress = false;

    public vote(state: VoteState) {
        if (!this.authService.isSignedIn()) {
            this.authModalsService.show(AuthModals.signIn);
        } else if (!this.voteInProgress && this.comment.votes.state !== state) {
            this.comment.votes.rating += state === "positive" ? 1 : -1;

            if (this.comment.votes.state !== "none") {
                this.comment.votes[this.comment.votes.state] -= 1;
                state = "none";
            }

            this.comment.votes[state] += 1;
            this.comment.votes.state = state;


            this.commentService
                .vote(this.comment, state)
                .finally(() => this.voteInProgress = false)
                .subscribe()
            ;
        }
    }
    
}