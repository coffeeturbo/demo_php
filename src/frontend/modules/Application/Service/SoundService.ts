import {Injectable} from "@angular/core";
import { Howl } from 'howler';

const notificationSound = require('../../../assets/sounds/notification.mp3');
const errorNotificationSound = require('../../../assets/sounds/error-notification.mp3');

@Injectable()
export class SoundService {
    public notificationSound = new Howl({src: [notificationSound]});
    public errorNotificationSound = new Howl({src: [errorNotificationSound]});
    
    public playNotificationSound(): void
    {
        this.notificationSound.play();
    }

    public playErrorNotificationSound(): void
    {
        this.errorNotificationSound.play();
    }
}