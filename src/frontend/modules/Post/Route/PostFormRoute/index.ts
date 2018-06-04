import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {TranslationService} from "@angular-addons/translate";

import {Post} from "../../Entity/Post";
import {PostService} from "../../Service/PostService";
import {Attachment, AttachmentType} from "../../../Attachment/Entity/Attachment";
import {AttachmentImage} from "../../../Attachment/Entity/AttachmentImage";
import {AttachmentText} from "../../../Attachment/Entity/AttachmentText";
import {AttachmentVideo} from "../../../Attachment/Entity/AttachmentVideo";
import {PostCreateRequest} from "../../Http/Request/PostCreateRequest";
import {Tag} from "../../../Tag/Entity/Tag";
import {ActivatedRoute, Router} from "@angular/router";
import {TagRESTService} from "../../../Tag/Service/TagRESTService";
import {Config} from "../../../../app/config";
import {PlatformService} from "../../../Application/Service/PlatformService";
import {Device} from "../../../Application/Service/DeviceService";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {PostUpdateRequest} from "../../Http/Request/PostUpdateRequest";
import {AttachmentService} from "../../../Attachment/Service/AttachmentService";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './tags.scss']
})

export class PostFormRoute implements OnInit, AfterViewInit {
    public config = Config.post;
    public AttachmentType = AttachmentType;
    public attachments = new FormArray([], Validators.required);
    public submitted: boolean = false;
    public saved: boolean = true;
    public isLoading: boolean = false;
    public device = Device;
    public isNew: boolean = !this.route.snapshot.data.post;

    public form: FormGroup = new FormGroup({
        id: new FormControl(null),
        title: new FormControl(null, [
            Validators.required, 
            Validators.minLength(this.config.title.constraints.min_length),
            Validators.maxLength(this.config.title.constraints.max_length)
        ]),
        tags: new FormControl(null, [
            Validators.required, 
            Validators.minLength(this.config.tags.constraints.min_length),
            Validators.maxLength(this.config.title.constraints.max_length)
        ]),
        attachments: this.attachments
    });

    public authorTag: Tag = {
        name: this.translationService.translate("author's")
    };

    constructor(
        private translationService: TranslationService,
        private attachmentService: AttachmentService,
        private tagRest: TagRESTService,
        private postService: PostService,
        private router: Router,
        private pl: PlatformService,
        private translateService: TranslationService,
        public route: ActivatedRoute,
        public scrollService: ApplicationScrollService
    ) {}

    ngOnInit() {
        try {
            if(this.pl.isPlatformBrowser()) {
                let postForm;
                if(this.isNew) {
                    postForm = JSON.parse(localStorage.getItem("post-form"));
                } else {
                    postForm = this.route.snapshot.data.post;
                }
                
                postForm.attachments.map((attachment, i) => {
                    if (attachment.type === AttachmentType.image && attachment.value) {
                        attachment.value.image = this.base64ToFile(attachment.value.src, i);
                    }
                    return attachment;
                });

                if (postForm.attachments.length > 0) {
                    postForm.attachments.map(attachment => this.addAttachment(attachment.type, attachment.value, attachment, false));
                }

                if (postForm.id) {
                    this.form.controls.id.setValue(postForm.id);
                    this.form.controls.id.markAsPristine();
                }
                
                if (postForm.title) {
                    this.form.controls.title.setValue(postForm.title);
                    this.form.controls.title.markAsPristine();
                }

                if (postForm.tags) {
                    this.form.controls.tags.setValue(postForm.tags);
                    this.form.controls.title.markAsPristine();
                }
            }
        } catch (e) {}

        this.form.valueChanges
            .filter(() => this.isNew)
            .debounceTime(500) // Ohyenable feature 
            .do(() => this.saved = false)
            .debounceTime(500) // Ohyenable feature 
            .distinctUntilChanged()
            .subscribe((post: Post) => {
                if(this.pl.isPlatformBrowser()) {
                    try {
                        localStorage.setItem("post-form", JSON.stringify(post));
                    } catch (e) {
                        console.log("Слишком объемный пост. Невозможно сохранить в LocalStorage!");
                    }
                    this.saved = true;
                }
            })
        ;
    }

    ngAfterViewInit() {
        this.scrollService.scrollTo(0);
    }

    public addAttachment(type: AttachmentType, value?: any, entity?: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>, markAsDirty: boolean = true) {
        
        if(!value && entity) {
            switch (type) {
                case AttachmentType.text :
                    value = (<Attachment<AttachmentText>>entity).content.text;
                    break;
                case this.AttachmentType.image:
                    value = { src: (<Attachment<AttachmentImage>>entity).content.public_path };
                    break;
                case this.AttachmentType.videoYoutube:
                    value = (<Attachment<AttachmentVideo>>entity).content.url;
                    break;
            }
        }
        
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null, Validators.required),
            entity: new FormControl(!value && entity ? entity : null)
        });

        this.attachments.push(attachment);
        
        if(markAsDirty) {
            this.form.controls.attachments.markAsDirty();
        }
    }

    public removeAttachment(i: number) {
        this.attachments.removeAt(i);
        this.form.controls.attachments.markAsDirty();
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
        
        if(this.form.invalid) return;

        this.isLoading = true;
        
        let attachmentsObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>[] = [];

        this.form.value.attachments.forEach(attachment => {
            let attachmentObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>;

            if(attachment.entity) {
                return attachmentsObservable.push(Observable.of(attachment.entity)); 
            } else {
                delete attachment.entity;
            }
                
            switch(attachment.type) {
                case AttachmentType.image:
                    attachmentObservable = this.attachmentService.uploadImage({image: attachment.value.image});
                    break;
                case AttachmentType.text:
                    attachmentObservable = Observable.of(attachment);
                    break;
                case AttachmentType.videoYoutube:
                    attachmentObservable = this.attachmentService.parseVideoLink({url: attachment.value});
                    break;
            }

            attachmentsObservable.push(attachmentObservable);
        });

        let postRequest: PostCreateRequest | PostUpdateRequest = this.form.value;

        Observable
            .combineLatest(attachmentsObservable)
            .flatMap((attachments) => {
                // Fck nelmio
                postRequest.attachments = JSON.stringify(attachments);
                postRequest.tags = JSON.stringify(postRequest.tags);
                if(this.isNew) {
                    return this.postService.create(<PostCreateRequest>postRequest);
                } else {
                    return this.postService.update(<PostUpdateRequest>postRequest);
                }
            })
            .finally(() => this.submitted = true)
            .subscribe((post) => {
                this.router.navigate(["/post", post.id]);
                if(this.pl.isPlatformBrowser()) {
                    localStorage.removeItem("post-form");
                }
            }, () => this.isLoading = false)
        ;
    }

    public handleEnterButton(e) {
        let element = <HTMLElement>e.target;

        if (element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags" && !element.classList.contains("contenteditable")) {
            e.preventDefault();
        }
    }

    public requestAutocompleteItems = (query: string): Observable<Tag[]> => {
        return this.tagRest.search(query);
    };

    private base64ToFile(dataurl, filename) {
        let arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }
    
    @HostListener("window:beforeunload", ["$event"]) 
    unloadHandler(e) {
        if(this.form.dirty) {
            e.returnValue = false;
        }
    }
    
    canDeactivate() : boolean {
        if(this.form.dirty && !this.submitted) {
            let message;
            if(this.isNew) {
                message = "You created a post but did not publish it. Do you want to leave?";
            } else {
                message = "Changes are not saved. Do you want to leave?"
            }
            
            return confirm(this.translateService.translate(message))
        }
        return true;
    }
}   
 
