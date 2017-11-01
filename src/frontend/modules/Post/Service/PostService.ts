import {EventEmitter, Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {PostRESTService} from "./PostRESTService";
import {Post} from "../Entity/Post";
import {VoteState} from "../../Vote/Entity/Vote";
import {VoteRESTService} from "../../Vote/Service/VoteRESTService";

@Injectable()
export class PostService {
    private posts: Post[] = [];
    public onPostResolve = new EventEmitter<Post>(true);
    
    
    constructor(private rest: PostRESTService, private voteRest: VoteRESTService) {}

    public get(postId: number): Observable<Post> 
    {
        let postObservable: Observable<Post>;
        try {
            postObservable = this.getFromCache(postId);
        } catch (e) {
            postObservable = this.rest.getById(postId)
                // .do(post => this.saveToCache(post))

            
        }
        
        return postObservable
            .do(post => this.onPostResolve.emit(post))
        ;
    }

    vote(post: Post, state: VoteState): Observable<Post>
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
            // .do(newPost => this.replaceInCache(oldPost, newPost))
        ;
    }


    private getFromCache(postId: number): Observable<Post>
    {
        let post: Post = this.posts.filter((post) => post.id == postId).shift();
        if (!post) {
            throw new Error(`Post with id "${postId}" is not cached`);
        }

        return Observable.of(post);
    }

    private saveToCache(post: Post): void
    {
        this.posts.push(post);
    }

    private replaceInCache(oldPost: Post, newPost: Post): void
    {
        let index: number = this.posts.indexOf(oldPost);
        if (index != -1) {
            this.posts[index] = newPost;
        } else throw new Error(`${index} not found in cache file`);
    }
}