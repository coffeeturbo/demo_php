// @DOTO: сейчас это только ютуб видео, нужно позже сделать универсально
export interface AttachmentVideo {
    youtubeId: string;
    url: string;
    image: string;
    duration: number;
    title: string;
    description: string;
}