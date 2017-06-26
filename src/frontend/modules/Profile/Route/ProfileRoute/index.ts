import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import * as Cropper from 'cropperjs';
import {Profile} from "../../Entity/Profile";
import {Observable, Observer} from "rxjs";
import {AvatarCropperModalService} from "../../Service/AvatarCropperModalService";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute implements OnInit {

    public profile: Profile;
    public avatarPath: string = 'https://pbs.twimg.com/profile_images/378800000796578930/bb2119f37f717b0bc551923f7fdf3d9f_400x400.jpeg';

    constructor(private route: ActivatedRoute, public avatarCropperModalService: AvatarCropperModalService) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
    }

    @ViewChild('crop') crop: ElementRef;

    public form: FormGroup = new FormGroup({
        "image": new FormControl("", Validators.required)
    });
    
    @ViewChild('fileInput') fileInput: ElementRef;
    cropper: Cropper;
    browseFile() {
        this.fileInput.nativeElement.click();
    }

    browseFileHandler(avatarFile: File) {
        this.setCropperImage(avatarFile).subscribe();
    }

    setCropperImage(avatarFile: File): Observable<HTMLImageElement>
    {
        return Observable.create((observer: Observer<HTMLImageElement>)=> {
            let reader = new FileReader();
            reader.readAsDataURL(avatarFile);
            reader.onloadend = (data: FileReaderEvent) => {

                this.crop.nativeElement.src = data.target.result;
                
                if(this.cropper) {
                    this.cropper.replace(data.target.result);
                } else {
                    this.cropper = new Cropper(this.crop.nativeElement, {
                        viewMode: 2,
                        center: false,
                        guides: false,
                        highlight: false,
                        background: false,
                        zoomOnWheel: false,
                        toggleDragModeOnDblclick: false,
                        aspectRatio: 1,
                        // minContainerWidth: 500,
                        // minContainerHeight: 500,
                    });
                }
                this.avatarCropperModalService.show();
                observer.next(this.crop.nativeElement);
            }
        });
    }
}

// Fixing error: Property 'result' does not exist on type 'EventTarget'.
interface FileReaderEvent extends ProgressEvent {
    target: FileReader;
}