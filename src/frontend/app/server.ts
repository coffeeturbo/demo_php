import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { Request, Response } from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import {ApplicationModuleServer} from "../modules/Application/ApplicationModuleServer";
import {CookieService} from "../modules/Application/Service/CookieService";

enableProdMode();
const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;
const cookieParser = require('cookie-parser');

app.engine('html', ngExpressEngine({
    bootstrap: ApplicationModuleServer
}));

app.set('view engine', 'html');
app.set('views', 'modules');
app.use(cookieParser());


app.get("*", (req: Request, res: Response) => {
    console.time(`GET: ${req.originalUrl}`);

    res.render('../../web/dist/index', {
        req: req,
        res: res,
        providers: [
            {
                provide: CookieService,
                useValue: new CookieService(req.headers.cookie)
            }
        ]
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(port, () => console.log(`Listening at ${baseUrl}`));
