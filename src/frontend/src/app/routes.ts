import {Routes} from "@angular/router";

import {CanActivateService} from "../module/Auth/Service/CanActivateService";
import {FeedRoute} from "../module/Feed/Route/FeedRoute/index";
import {ForbiddenRoute} from "../module/Application/Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "../module/Application/Route/PageNotFoundRoute/index";
import {ProfileRoute} from "../module/Profile/Route/ProfileRoute/index";
import {Role} from "../module/Auth/Entity/Role";
import {SignInRoute} from "../module/Auth/Route/SignInRoute/index";
import {SignUpRoute} from "../module/Auth/Route/SignUpRoute/index";


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: FeedRoute,
        data: {title: 'Самое интересное'}
    },
    {
        path: 'profile/:id',
        component: ProfileRoute,
        canActivate: [CanActivateService],
        data: { title: 'Профиль', allow: <Array<Role>>["ROLE_USER"] }
    },
    {
        path: 'login',
        component: SignInRoute,
        data: { title: 'Страница входа', returnUrl: '/' }
    },
    {
        path: 'register',
        component: SignUpRoute,
        data: { title: 'Регистрация', returnUrl: '/'}
    },
    {
        path: 'forbidden',
        component: ForbiddenRoute,
        data: { title: '403 - Доступ запрещен' }
    },
    {
        path: '**',
        component: PageNotFoundRoute,
        data: { title: '404 - Страница не найдена' }
    }
];