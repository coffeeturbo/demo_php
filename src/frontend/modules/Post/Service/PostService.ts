import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {PostRESTService} from "./PostRESTService";
import {Post} from "../Entity/Post";
import {VoteState} from "../../Vote/Entity/Vote";
import {VoteRESTService} from "../../Vote/Service/VoteRESTService";
import {PostCreateRequest} from "../Http/Request/PostCreateRequest";
import * as getSlug from "speakingurl";
import {PostUpdateRequest} from "../Http/Request/PostUpdateRequest";
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";

@Injectable()
export class PostService {
    
    constructor(
        private rest: PostRESTService, 
        private voteRest: VoteRESTService,
        public transferState: TransferState
    ) {}

    public get(postId: number): Observable<Post> 
    {
        return this.getFromCache(postId)
            .catch(() => this.rest.getById(postId).do(post => this.saveToCache(post)))
        ;
    }
    
    public create(postCreateRequest: PostCreateRequest): Observable<Post>
    {
        return this.rest.create(postCreateRequest)
            .do(post => this.saveToCache(post))
        ;
    }

    public update(postUpdateRequest: PostUpdateRequest): Observable<Post>
    {
        return this.rest.update(postUpdateRequest)
            .flatMap(newPost => this.getFromCache(newPost.id)
                .do(oldPost => this.replaceInCache(oldPost, newPost)) // Try replace from cache
                .catch(() => Observable.of(newPost).do(post => this.saveToCache(post))) // If an error while getting from the cache - let's caching
            )
        ;
    }

    public favorite(post: Post): Observable<Post>
    {
        return this.rest.favorite(post);
    }

    public vote(post: Post, state: VoteState): Observable<Post>
    {
        let oldPost = post;
        let voteObservable: Observable<Post>;
        
        switch (state) {
            case "none":
                voteObservable = this.voteRest.deleteVotePost(post.id);
                break;
            case "positive":
                voteObservable = this.voteRest.positiveVotePost(post.id);
                break;
            case "negative":
                voteObservable = this.voteRest.negativeVotePost(post.id);
                break;
        }
        
        return voteObservable
            .do(newPost => this.replaceInCache(oldPost, newPost))
        ;
    }

    public getUrl(id: number, title?: string): string
    {
        return `/post/${(!title ? "" : getSlug(title + "-")) + "-" + id}`;
    }

    private getFromCache(postId: number): Observable<Post>
    {
        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + postId);

        if(this.transferState.hasKey(postStateKey)) {
            return Observable.of(this.transferState.get(postStateKey, null as Post));
        } else {
            return Observable.throw(`Post with id "${postId}" is not cached`);
        }

    }

    private saveToCache(post: Post): void
    {
        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + post.id);
        
        this.transferState.set(postStateKey, post as Post)
    }

    private replaceInCache(oldPost: Post, newPost: Post): Observable<Post>
    {
        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + newPost.id);

        if (!this.transferState.hasKey(postStateKey)) {
            return Observable.throw(`${newPost.id} not found in cache file`);
        }

        this.transferState.set(postStateKey, newPost as Post);
        
        return Observable.of(newPost);
    }
}