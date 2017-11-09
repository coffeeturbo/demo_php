import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {TranslationService} from "@angular-addons/translate";

import {Post} from "../../Entity/Post";
import {PostService} from "../../Service/PostService";
import {Attachment, AttachmentType} from "../../../Attachment/Entity/Attachment";
import {AttachmentRESTService} from "../../../Attachment/Service/AttachmentRESTService";
import {AttachmentImage} from "../../../Attachment/Entity/AttachmentImage";
import {AttachmentText} from "../../../Attachment/Entity/AttachmentText";
import {AttachmentVideo} from "../../../Attachment/Entity/AttachmentVideo";
import {PostCreateRequest} from "../../Http/Request/PostCreateRequest";
import {Tag} from "../../../Tag/Entity/Tag";
import {Router} from "@angular/router";

const localStorage = typeof window !='undefined' ? window.localStorage : { getItem(key: any): any { return null }, removeItem(key: any) {}, setItem(key: any, val: any) {} };

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './tags.scss']
})

export class PostFormRoute implements OnInit {
    public AttachmentType = AttachmentType;
    public attachments = new FormArray([]);
    public submitted: boolean = false;
    public saved: boolean = true;

    public form: FormGroup = new FormGroup({
        title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        tags: new FormControl(null, [Validators.required]),
        attachments: this.attachments
    });

    public authorTag: Tag = {
        name: this.translationService.translate("author's")
    };

    constructor(
        private translationService: TranslationService,
        private attachmentRest: AttachmentRESTService,
        private postService: PostService,
        private router: Router
    ) {}

    ngOnInit() {
        try {
            let postForm = JSON.parse(localStorage.getItem("post-form"));
            
            if (postForm.attachments.length > 0) {
                postForm.attachments.map(attachment => this.addAttachment(attachment.type, attachment.value));
            }

            if (postForm.title) {
                this.form.controls.title.setValue(postForm.title);
                this.form.controls.title.markAsDirty();
            }
            
            if (postForm.tags) {
                this.form.controls.tags.setValue(postForm.tags);
                this.form.controls.tags.markAsDirty();
            }
        } catch (e) {}

        this.form.valueChanges
            .debounceTime(500) // Ohyenable feature 
            .do(() => this.saved = false)
            .debounceTime(500) // Ohyenable feature 
            .subscribe((post: Post) => {
                localStorage.setItem("post-form", JSON.stringify(post));
                this.saved = true;
            });

    }

    public addAttachment(type: AttachmentType, value?: any) {
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null)
        });

        this.attachments.push(attachment);
        this.form.controls.attachments.markAsDirty();
    }

    public removeAttachment(i: number) {
        this.attachments.removeAt(i);
    }

    public updateAuthorTag(isAuthor: boolean) {
        let tags: Tag[] = this.form.controls.tags.value || [];

        if (isAuthor) {
            tags.push(this.authorTag);
        } else {
            tags = tags.filter((item: Tag) => item.name != this.authorTag.name);
        }

        this.form.controls.tags.setValue(tags);
        this.form.controls.tags.markAsDirty();
    }
    
    public hasAuthorTag(): boolean {
        let tags: Tag[] = this.form.controls.tags.value || [];

        return tags.filter(
                (item: Tag) => item.name == this.authorTag.name
            ).length > 0;
    }

    public reset() {
        this.attachments.controls = [];
        this.submitted = false;
        this.form.reset();
    }

    public submit() {
        this.submitted = true;
        
        let attachmentsObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>[] = [];

        this.form.value.attachments.forEach(attachment => {
            let attachmentObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>;
            
            switch(attachment.type) {
                case AttachmentType.image:
                    attachmentObservable = this.attachmentRest.uploadImage({image: attachment.value.image});
                    break;
                case AttachmentType.text:
                    attachmentObservable = Observable.of(attachment);
                    break;
                case AttachmentType.video:
                    console.log("Backend for video-attachment not implemented!!!");
                    break;
            }

            attachmentsObservable.push(attachmentObservable);
        });

        let postCreateRequest: PostCreateRequest = this.form.value;

        Observable
            .combineLatest(attachmentsObservable)
            .flatMap((attachments) => {
                // Fck nelmio
                postCreateRequest.attachments = JSON.stringify(attachments);
                postCreateRequest.tags = JSON.stringify(postCreateRequest.tags);
                return this.postService.create(postCreateRequest)
            })
            .subscribe((post) => this.router.navigate(["/post", post.id]))
        ;

        // @DOTO: Make handle success submit!
        // localStorage.removeItem("post-form");
        // this.form.controls['title'].getError("minlength").requiredLength
    }

    public handleEnterButton(e: KeyboardEvent) {
        let element = <HTMLElement>e.target;

        if (element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags") {
            e.preventDefault()
        }
    }

    public requestAutocompleteItems = (text: string): Observable<Tag[]> => {
        // @DOTO: Make rest service
        return Observable
            .of([
                {name: text},
                {name: text + " foo"},
                {name: text + " bar"},
                {name: text + " baz"}
            ])
        ;
    };
}   
 
