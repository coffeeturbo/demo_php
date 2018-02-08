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
import {FeedRoute} from "../modules/Feed/Route/FeedRoute/index";
import {FeedProfileRoute} from "../modules/Feed/Route/FeedProfileRoute/index";
import {ProfileAvatarRoute} from "../modules/Profile/Route/ProfileAvatarRoute/index";
import {PostFormRoute} from "../modules/Post/Route/PostFormRoute/index";
import {TagTitleResolver} from "../modules/Tag/Service/TagTitleResolver";
import {FeedResolver} from "../modules/Feed/Service/FeedResolver";
import {GetFeedRequest} from "../modules/Feed/Http/Request/GetFeedRequest";
import {ProfileFeedRequestResolver} from "../modules/Profile/Service/ProfileFeedRequestResolver";
import {PostCommentsResolver} from "../modules/Post/Service/PostCommentsResolver";
import {TagFeedRequestResolver} from "../modules/Tag/Service/TagFeedRequestResolver";

export const appRoutes: JetRoutes = [
    {
        path: '',
        component: FeedRoute,
        data: {
            title: 'Hot',
            feedRequest: <GetFeedRequest>{sort: "hot"}
        },
        resolve: {
            feed: FeedResolver,
        }
    },
    {
        path: 'new',
        component: FeedRoute,
        data: {
            title: 'New',
            feedRequest: <GetFeedRequest>{sort: "id"}
        },
        resolve: {
            feed: FeedResolver,
        }
    },
    {
        path: 'best',
        component: FeedRoute,
        data: {
            title: 'Best',
            feedRequest: <GetFeedRequest>{sort: "rating"}
        },
        resolve: {
            feed: FeedResolver,
        }
    },
    {
        path: 'post',
        children: [
            { path: '', component: PageNotFoundRoute },
            {
                path: 'add',
                component: PostFormRoute,
                canActivate: [CanActivateService],
                data: {title: 'Add post'}
            },
            {
                path: ':path',
                component: PostRoute,
                resolve: {
                    post: PostResolver,
                    comments: PostCommentsResolver,
                    title: PostTitleResolver,
                }
            }
        ]
    },
    {
        path: 'tag/:path',
        component: FeedRoute,
        resolve: {
            feed: FeedResolver,
            feedRequest: TagFeedRequestResolver,
            title: TagTitleResolver,
        }
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
                    { path: 'avatar', component: ProfileAvatarRoute }
                ],
                resolve: { 
                    profile: ProfileResolver,
                    title: ProfileTitleResolver,
                    profileFeed: FeedResolver,
                    feedRequest: ProfileFeedRequestResolver
                }
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