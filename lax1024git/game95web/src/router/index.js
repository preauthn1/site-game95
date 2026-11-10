import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthLayout from "@/layouts/AuthLayout.vue";

// push 传入当前值(空值)进行错误处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        // name: 'AuthLayout',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'index',
                component: () =>
                    import('../views/index/index.vue')
            },
            {
                path: '/all-game',
                name: 'all-game',
                component: () =>
                    import('../views/pages/allgame.vue')
            },
            {
                path: '/activity-hall',
                name: 'activity-hall',
                component: () =>
                    import('../views/pages/activityhall.vue')
            }, {
                path: '/rank-system',
                name: 'rank-system',
                component: () =>
                    import('../views/pages/ranksystem.vue')
            }, {
                path: '/mine',
                name: 'mine',
                component: () =>
                    import('../views/user/mine.vue')

            }, {
                path: '/team-center',
                name: 'team-center',
                component: () =>
                    import('../views/pages/teamcenter.vue')

            },
            {
                path: '/layout/task-center',
                name: 'taskCenter',
                component: () => import('../views/taskCenter/taskCenter.vue'),
            },{
                path: '/singin',
                name: 'singin',
                component: () => import('../views/singin/singin.vue'),
            }, {
                path: '/account',
                name: 'account',
                component: () =>
                    import('../views/user/account.vue')
            }, {
                path: '/setting',
                name: 'setting',
                component: () =>
                    import('../views/user/setting.vue')
            }, {
                path: '/transactions',
                name: 'transactions',
                component: () =>
                    import('../views/user/transactions.vue')
            }, {
                path: '/sessions',
                name: 'sessions',
                component: () =>
                    import('../views/user/sessions.vue')
            }, {
                path: '/game-history',
                name: 'gamehistory',
                component: () =>
                    import('../views/user/gamehistory.vue')
            }, 

        ]

    },

    {
        path: '/news',
        name: 'news',
        component: () =>
            import('../views/pages/news.vue')
    }, {
        path: '/news-detail/:id',
        name: 'news-detail',
        component: () =>
            import('../views/pages/newsDetail.vue')
    }, {
        path: '/message-detail',
        name: 'messageDetail',
        component: () =>
            import('../views/pages/messageDetail.vue')
    }, {
        path: '/game-detail',
        name: 'game-detail',
        component: () =>
            import('../views/pages/gamedetail.vue')
    }, {
        path: '/about-sport',
        name: 'about-sport',
        component: () =>
            import('../views/pages/aboutsport.vue')
    },
    {
        path: '/fund',
        name: 'fund',
        component: () =>
            import('../views/pages/earn/fund.vue')
    }, {
        path: '/about-team',
        name: 'about-team',
        component: () =>
            import('../views/single/aboutteam.vue')
    }, {
        path: '/fairness',
        name: 'fairness',
        component: () =>
            import('../views/single/fairness.vue')
    },{
        path: '/boxes-all',
        name: 'boxes-all',
        component: () =>
            import('../views/pages/boxesall.vue')
    }, {
        path: '/promo-materials',
        name: 'promomaterials',
        component: () =>
            import('../views/pages/promomaterials.vue')
    }, {
        path: '/cashback',
        name: 'cashback',
        component: () =>
            import('../views/pages/cashback.vue')
    }, {
        path: '/responsible-gambling',
        name: 'responsiblegambling',
        component: () =>
            import('../views/pages/responsiblegambling.vue')
    },
    {
        path: '/mirrors',
        name: 'mirrors',
        component: () =>
            import('../views/single/mirrors.vue')
    }, {
        path: '/sport-betting',
        name: 'sportbetting',
        component: () =>
            import('../views/sportbetting/sportbetting.vue')
    }, {
        path: '/sport-detail/:matchId',
        name: 'sportdetail',
        component: () =>
            import('../views/sportbetting/sportdetail.vue')
    }, {
        path: '/sport-favorites',
        name: 'sportfavorites',
        component: () =>
            import('../views/sportbetting/sportfavorites.vue')
    }, {
        path: '/sport-bets',
        name: 'sportbets',
        component: () =>
            import('../views/sportbetting/sportbets.vue')
    }, {
        path: '/sport-search',
        name: 'sportsearch',
        component: () =>
            import('../views/sportbetting/search.vue')
    }, {
        path: '/sport-live',
        name: 'sportlive',
        component: () =>
            import('../views/sportbetting/sportlive.vue')
    }, {
        path: '/sport-list',
        name: 'sportlist',
        component: () =>
            import('../views/sportbetting/sportlist.vue')
    }, {
        path: '/pages/thirdlogin/callback/:third_id?',
        name: 'thirdlogin',
        component: () => import('../views/thirdlogin/callback.vue'),
        props: true
    }, {
        path: '/icondemo',
        name: 'icondemo',
        component: () =>
            import('../views/user/icon.vue')
    }, {
        path: '/download',
        name: '/download',
        component: () =>
            import('../views/pages/download/download.vue')
    }, {
        path: '/lotter',
        name: '/lotter',
        component: () =>
            import('../views/pages/lotter/lotter.vue')
    }, {
        path: '/paysuccess',
        name: 'paysuccess',
        component: () => import('../views/single/paysuccess.vue'),
        props: true
    }, {
        path: '/paysucc/:amount/:currency',
        name: 'paysuccess2',
        component: () => import('../views/single/paysuccess.vue'),
        props: true
    }, {
        path: '/wallet',
        name: 'wallet_jump',
        component: () => import('../views/single/wallet.vue')
    }, {
        path: '/game-collect',
        name: 'game_collect',
        component: () => import('../views/pages/gameCollect.vue')
    }, {
        path: '/official-mirror',
        name: 'officialMirror',
        component: () => import('../views/single/officialMirror.vue'),
        props: true
    }, {
        path: '/iframe-page',
        name: 'iframePage',
        component: () => import('../views/iframePage.vue'),
        props: true
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('../views/layout/Index.vue'),
        props: true,
        children: [
            {
                path: '/pdd',
                name: 'pdd',
                component: () => import('../views/pdd/pdd.vue'),
            },
            {
                path: 'edemption-code',
                name: 'edemptionCode',
                component: () => import('../views/edemptionCode/edemptionCode.vue'),
            },
            // {
            //     path: 'edemption-code',
            //     name: 'edemptionCode',
            //     component: () => import('../views/edemptionCode/edemptionCode.vue'),
            // },
            {
                path: '/five-bessings',
                name: 'fiveBessings',
                component: () => import('../views/fiveBessings/fiveBessings.vue'),
            }
        ]
    }, {
        path: '/purse',
        name: '',
        // component: ()=>import('./../layouts/AppLayout.vue'),
        component:AuthLayout,
        children: [
            {
                path: "",
                name:"purse",
                meta:{
                    title:'钱包',
                },
                component:()=>import('../views/purse/index.vue'),
            }
        ]
    },{
        path: '*',
        name: '404',
        component: () => import('../views/single/404.vue'),
        props: true
    }
]


const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})


router.beforeEach((to, from, next) => {
    // 判断登录
    const width_size = window.innerWidth
    if (width_size > 750) {
        if (to.name == 'mine') {
            next("/")
        }
    }
    const loginPageArr = ['/game-collect', '/team-center', '/mine', '/wheel', '/wallet', '/layout/task-center', '/lotter', "/singin", "/pdd", '/layout/edemption-code', '/sport-betting', '/five-bessings']
    const isLogin = localStorage.getItem('ft_tokenInfo')
    if (loginPageArr.includes(to.path)) {
        if (!isLogin) {
            if (from) {
                next({
                    path: from.path, query: {
                        modal: 'LoginRegistration',
                        data: to.name == 'team-center' ? 'tab-0' : 'tab-1'
                    }
                })
            } else {
                next(`/?modal=LoginRegistration&data=tab-1`)
            }
            // next()
            return;
        } else {
            // 弹窗路由劫持
            if (initPopRouter(to, from, next)) {
                next()
            }
        }
    } else {
        // 弹窗路由劫持
        if (initPopRouter(to, from, next)) {
            next()
        }
    }
})

// 初始化弹窗路由
const initPopRouter = (to, from, next) => {
    let popArr = ["/wheel"]
    if (popArr.includes(to.path)) {
        next({
            path: from.path || "/", query: {
                dialog: to.path.split('/')[1]
            }
        })
    } else {
        return true
    }
}


export default router
