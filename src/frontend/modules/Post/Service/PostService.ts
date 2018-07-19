import {EventEmitter, Injectable} from "@angular/core";
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
    private posts: Post[] = [];
    public onPostResolve = new EventEmitter<Post>(true);
    
    constructor(
        private rest: PostRESTService, 
        private voteRest: VoteRESTService,
        public transferState: TransferState
    ) {}

    public get(postId: number): Observable<Post> 
    {
        return this.getFromCache(postId)
            .catch(() => this.rest.getById(postId).do(post => this.saveToCache(post)))
            .do(post => this.onPostResolve.emit(post))
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
        let post: Post = this.posts.filter((post) => post.id == postId).shift();

        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + postId);

        if(this.transferState.hasKey(postStateKey)) {
            post = this.transferState.get(postStateKey, null as Post);
        }
        
        if (!post) {
            return Observable.throw(`Post with id "${postId}" is not cached`);
        }

        return Observable.of(post).delay(1); // delay kostil' for angular resolver...
    }

    private saveToCache(post: Post): void
    {
        this.posts.push(post);
        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + post.id);
        
        this.transferState.set(postStateKey, post as Post)
    }

    private replaceInCache(oldPost: Post, newPost: Post): Observable<Post>
    {
        let index: number = this.posts.indexOf(oldPost);

        if (!~index) {
            return Observable.throw(`${index} not found in cache file`);
        }
        
        this.posts[index] = newPost;
        let postStateKey: StateKey<Post> = makeStateKey<Post>("post-" + newPost.id);
        this.transferState.set(postStateKey, newPost as Post);
        
        return Observable.of(newPost);
    }
}