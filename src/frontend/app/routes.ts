import {CanActivateService} from "../modules/Auth/Service/CanActivateService";
import {ForbiddenRoute} from "../modules/Application/Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "../modules/Application/Route/PageNotFoundRoute/index";
import {ProfileRoute} from "../modules/Profile/Route/ProfileRoute/index";
import {SignInRoute} from "../modules/Auth/Route/SignInRoute/index";
import {SignUpRoute} from "../modules/Auth/Route/SignUpRoute/index";
import {ProfileSettingsRoute} from "../modules/Profile/Route/ProfileSettingsRoute/index";
import {JetRoutes} from "../modules/Application/Entity/JetRoute";
import {ProfileResolver} from "../modules/Profile/Service/ProfileResolver";
import {ProfileTitleResolver} from "../modules/Profile/Service/ProfileTitleResolver";
import {PostRoute} from "../modules/Post/Route/PostRoute/index";
import {PostResolver} from "../modules/Post/Service/PostResolver";
import {PostTitleResolver} from "../modules/Post/Service/PostTitleResolver";
import {FeedHotRoute} from "../modules/Feed/Route/FeedHotRoute/index";
import {FeedNewRoute} from "../modules/Feed/Route/FeedNewRoute/index";
import {FeedBestRoute} from "../modules/Feed/Route/FeedBestRoute/index";
import {FeedProfileRoute} from "../modules/Feed/Route/FeedProfileRoute/index";
import {ProfileAvatarRoute} from "../modules/Profile/Route/ProfileAvatarRoute/index";
// import {PostFormRoute} from "../modules/Post/Route/PostFormRoute/index";

export const appRoutes: JetRoutes = [
    {
        path: '',
        component: FeedHotRoute,
        data: {title: 'Hot'}
    },
    {
        path: 'new',
        component: FeedNewRoute,
        data: {title: 'New'}
    },
    {
        path: 'best',
        component: FeedBestRoute,
        data: {title: 'Best'}
    },
    {
        path: 'post',
        children: [
            { path: '', component: PageNotFoundRoute },
            // {
            //     path: 'add',
            //     component: PostFormRoute,
            //     canActivate: [CanActivateService],
            //     data: {title: 'Add post'}
            // },
            {
                path: ':path',
                component: PostRoute,
                resolve: {
                    post: PostResolver,
                    title: PostTitleResolver,
                }
            }
        ]
    },
    { // Страница авторизации
        path: 'login',
        component: SignInRoute,
        data: { title: 'Login page', returnUrl: '/' }
    },
    { // Страница регистрации
        path: 'register',
        component: SignUpRoute,
        data: { title: 'Registration', returnUrl: '/'}
    },
    { // Новости профиля
        path: 'feed',
        component: FeedProfileRoute,
        canActivate: [CanActivateService],
        data: { title: 'News', allow: ["ROLE_CREATED"]},
    },
    { // Настройки профиля
        path: 'settings',
        component: ProfileSettingsRoute,
        canActivate: [CanActivateService],
        resolve: { profile: ProfileResolver },
        data: { title: 'Settings', allow: ["ROLE_CREATED"] }
    },
    { // Страница профиля (редирект на новости если не указан id профиля)
        path: 'profile',
        children: [
            { path: '', redirectTo: '/feed', pathMatch: 'full' },
            {
                path: ':path',
                component: ProfileRoute,
                children: [
                    { path: 'avatar', component: ProfileAvatarRoute}
                ],
                resolve: { profile: ProfileResolver, title: ProfileTitleResolver }
            }
        ]
    },
    {
        path: 'forbidden',
        component: ForbiddenRoute,
        data: { title: '403 - Access denied' }
    },
    {
        path: 'not-found',
        component: PageNotFoundRoute,
        data: { title: '404 - Now found' }
    },
    {
        path: '**',
        component: PageNotFoundRoute,
        data: { title: '404 - Now found' }
    }
];