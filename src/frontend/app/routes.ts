import {CanActivateService} from "../modules/Auth/Service/CanActivateService";
import {ForbiddenRoute} from "../modules/Application/Route/ForbiddenRoute";
import {PageNotFoundRoute} from "../modules/Application/Route/PageNotFoundRoute";
import {ProfileRoute} from "../modules/Profile/Route/ProfileRoute";
import {ProfileSettingsRoute} from "../modules/Profile/Route/ProfileSettingsRoute";
import {JetRoutes} from "../modules/Application/Entity/JetRoute";
import {ProfileResolver} from "../modules/Profile/Service/ProfileResolver";
import {ProfileTitleResolver} from "../modules/Profile/Service/ProfileTitleResolver";
import {PostRoute} from "../modules/Post/Route/PostRoute";
import {PostResolver} from "../modules/Post/Service/PostResolver";
import {FeedRoute} from "../modules/Feed/Route/FeedRoute";
import {FeedProfileRoute} from "../modules/Feed/Route/FeedProfileRoute";
import {ProfileAvatarRoute} from "../modules/Profile/Route/ProfileAvatarRoute";
import {PostFormRoute} from "../modules/Post/Route/PostFormRoute";
import {PostResolvers} from "../modules/Post/PostModule";
import {TagTitleResolver} from "../modules/Tag/Service/TagTitleResolver";
import {FeedResolver} from "../modules/Feed/Service/FeedResolver";
import {GetFeedRequest} from "../modules/Feed/Http/Request/GetFeedRequest";
import {ProfileFeedRequestResolver} from "../modules/Profile/Service/ProfileFeedRequestResolver";
import {FeedResolvers} from "../modules/Feed/FeedModule";
import {TagFeedRequestResolver} from "../modules/Tag/Service/TagFeedRequestResolver";
import {RecoverPasswordByEmailRoute} from "../modules/Auth/Routes/RecoverPasswordByEmailRoute";
import {SearchFeedResolver} from "../modules/Search/Service/SearchFeedResolver";
import {SearchTitleResolver} from "../modules/Search/Service/SearchTitleResolver";
import {SearchRequestResolver} from "../modules/Search/Service/SearchFeedRequestResolver";
import {SearchRoute} from "../modules/Search/Route/SerachRoute";
import {CanDeactivatePostFormRoute} from "../modules/Post/Service/CanDeactivatePostFormRoute";
import {VoteFeedRequestResolver} from "../modules/Vote/Service/VoteFeedRequestResolver";

export const appRoutes: JetRoutes = [
    {
        path: '',
        component: FeedRoute,
        children: [
            {
                path: "recover-password/:code",
                component: RecoverPasswordByEmailRoute,
                data: {
                    title: "Password recovery",
                }
            }
        ],
        data: {
            title: 'Hot',
            description: 'Hot',
            feedRequest: <GetFeedRequest>{sort: "hot"}
        },
        resolve: FeedResolvers
    },
    {
        path: 'new',
        component: FeedRoute,
        data: {
            title: 'New',
            description: 'New',
            feedRequest: <GetFeedRequest>{sort: "id"}
        },
        resolve: FeedResolvers
        
    },
    {
        path: 'best',
        component: FeedRoute,
        data: {
            title: 'Best',
            description: 'Best',
            feedRequest: <GetFeedRequest>{sort: "rating"}
        },
        resolve: FeedResolvers,
    },
    {
        path: 'promo',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "promo"}
    },
    {
        path: 'terms',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "terms"}
    },
    {
        path: 'ad',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "ad"}
    },
    {
        path: 'privacy',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "privacy"}
    },
    {
        path: 'faq',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "faq"}
    },
    {
        path: 'about',
        component: PostRoute,
        resolve: PostResolvers,
        data: {postAlias: "about"}
    },
    {
        path: 'post/add',
        component: PostFormRoute,
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivatePostFormRoute],
        data: {title: 'Add post', allow: ["ROLE_ADMIN", "ROLE_EMAIL_VERIFED"], verificationType: "partially"}
    },
    {
        path: 'post/:path',
        component: PostRoute,
        resolve: PostResolvers
    },
    {
        path: 'post/:path/edit',
        component: PostFormRoute,
        canActivate: [CanActivateService],
        canDeactivate: [CanDeactivatePostFormRoute],
        data: {
            title: 'Edit post',
        },
        resolve: {
            post: PostResolver
        }
    },
    {
        path: 'tag/:path',
        component: FeedRoute,
        resolve: {
            ...FeedResolvers, 
            feedRequest: TagFeedRequestResolver,
            title: TagTitleResolver
        }
    },
    {
        path: 'search',
        data: {title: 'Search'},
        component: SearchRoute
    },
    {
        path: 'search/:path',
        component: SearchRoute,
        data: {title: 'Search'},
        resolve: {
            feed: SearchFeedResolver,
            feedRequest: SearchRequestResolver,
            title: SearchTitleResolver
        }
    },
    { // Новости профиля
        path: 'feed',
        component: FeedProfileRoute,
        canActivate: [CanActivateService],
        data: {title: 'News', allow: ["ROLE_CREATED"]},
    },
    { // Лайки профиля
        path: 'likes',
        component: FeedRoute,
        canActivate: [CanActivateService],
        data: {
            title: 'Likes',
            description: 'Likes'
        },
        resolve: {
            ...FeedResolvers,
            profile: ProfileResolver,
            feedRequest: VoteFeedRequestResolver
        }
    },
    { // Настройки профиля
        path: 'settings',
        component: ProfileSettingsRoute,
        canActivate: [CanActivateService],
        resolve: {profile: ProfileResolver},
        data: {title: 'Settings', allow: ["ROLE_CREATED"]}
    },
    { // Страница профиля (редирект на новости если не указан id профиля)
        path: 'profile',
        children: [
            {path: '', redirectTo: '/feed', pathMatch: 'full'},
            {
                path: ':path',
                component: ProfileRoute,
                children: [
                    {path: 'avatar', component: ProfileAvatarRoute}
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
        data: {title: 'Access denied'}
    },
    {
        path: 'not-found',
        component: PageNotFoundRoute,
        data: {title: '404 - Now found'}
    },
    {
        path: '**',
        component: PageNotFoundRoute,
        data: {title: '404 - Now found'}
    }
];