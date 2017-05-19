import {CanActivateService} from "../module/Auth/Service/CanActivateService";
import {FeedRoute} from "../module/Feed/Route/FeedRoute/index";
import {ForbiddenRoute} from "../module/Application/Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "../module/Application/Route/PageNotFoundRoute/index";
import {ProfileRoute} from "../module/Profile/Route/ProfileRoute/index";
import {SignInRoute} from "../module/Auth/Route/SignInRoute/index";
import {SignUpRoute} from "../module/Auth/Route/SignUpRoute/index";
import {ProfileSettingsRoute} from "../module/Profile/Route/ProfileSettingsRoute/index";
import {JetRoutes} from "../module/Application/Entity/JetRoute";

export const appRoutes: JetRoutes = [
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
        path: 'profile',
        children: [
            { path: '', redirectTo: 'feed', pathMatch: 'full' },
            {
                path: 'feed',
                component: ProfileRoute,
                canActivate: [CanActivateService],
                data: { title: 'Новости', allow: ["ROLE_CREATED"]},
            },
            {
                path: ':id',
                component: ProfileRoute,
                data: { title: 'Профиль'},
            },
            {
                path: 'settings',
                component: ProfileSettingsRoute,
                canActivate: [CanActivateService],
                data: { title: 'Настройки', allow: ["ROLE_CREATED"] },
            }
        ]
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