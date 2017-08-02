import {Response} from "../../../Application/Http/Response";
import {BackdropPreset} from "../../Entity/BackdropPreset";

export interface BackdropPresetsResponse extends Response {
    [name: string]: BackdropPreset
}