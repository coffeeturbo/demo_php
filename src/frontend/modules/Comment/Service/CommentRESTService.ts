import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../Entity/Comment";
import {CommentCreateRequest} from "../Http/Request/CommentCreateRequest";

@Injectable()
export class CommentRESTService
{
    constructor(private http: HttpClient) {}

    public getByPostId(postId: number): Observable<Comment[]>
    {
        let url = `/comment/${postId}/get-by-post`;

        return this.http
            .get<Comment[]>(url, {withCredentials: true})
        ;
    }

    public create(postCreateRequest: CommentCreateRequest): Observable<Comment>
    {
        let url = `/protected/comment/create`;

        return this.http
            .put<Comment>(url, postCreateRequest, {withCredentials: true})
        ;
    }
}