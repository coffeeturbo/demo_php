import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { Request, Response } from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import {ApplicationServerModule} from "../modules/Application/ApplicationServerModule";
enableProdMode();
const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
    bootstrap: ApplicationServerModule
}));

app.set('view engine', 'html');
app.set('views', 'modules');

app.use('/dist', express.static('../web/dist', {index: false}));

[
    "/", 
    "/new"
]
.forEach((route: string) => {
app.get(route, (req: Request, res: Response) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../../web/dist/index', {
        req: req,
        res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});
});

app.listen(port, () => {
    console.log(`Listening at ${baseUrl}`);
});
