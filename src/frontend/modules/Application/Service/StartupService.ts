import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {RESTService} from "./RESTService";
import {Response} from "@angular/http";

@Injectable()
export class StartupService {

    private data : any;

    constructor(private rest: RESTService) { }


    fakeload() : Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    // Important: It should return a Promise
    load() : Promise<any> {
        return this.rest
                    .get('/config/')
                    .toPromise()
                    .then((data: Response) => this.data = data.json());
    }

    get get() {
        return this.data;
    }
    
}