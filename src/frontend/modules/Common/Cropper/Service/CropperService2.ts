import {EventEmitter, Injectable} from "@angular/core";
import {Observable} from "rxjs";

/**
 * @TODO: Исправить:
 * 1. Загружаем аву
 * 2. Уходим со страницы профиля,
 * 3. Возвращаемся
 * 4. Пробуем еще раз загрузить аву
 */
@Injectable()
export class CropperService2
{
    public onSetImage = new EventEmitter<File>();
    public src: string;
    
    constructor() {
        this.onSetImage.subscribe((image: File)=> {
            this.readImage(image)
                .map((e: FileReaderEvent) => e.target.result)
                .subscribe(src => this.src = src)
            ;
        })
    }
    
    public setImage(image: File)
    {
        this.onSetImage.emit(image);
    }
    
    public readImage(image: File) : Observable<FileReaderEvent>
    {
        let onLoadEnd = new EventEmitter();
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = (data: FileReaderEvent) => onLoadEnd.emit(data);
        return onLoadEnd;
    }
    
    public destroy() {
        this.src = undefined
    }
}

// Fixing error: Property 'result' does not exist on type 'EventTarget'.
export interface FileReaderEvent extends ProgressEvent {
    target: FileReader;
}