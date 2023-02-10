import * as VueRouter from "vue-router";
import "@vue/devtools-api";
import store from '../store/index'
import SnippetIndex from "./../controllers/pages/snippet/index" //ルート先のview
import LanguageMain from "./../controllers/pages/language/index"
import PasswordChangeMain from "./../controllers/pages/password_change/index"
import LoginMain from "./../controllers/pages/login/index"
import RegisterMain from "./../controllers/pages/register/index"

const routes = [{
  path: '/languages',
  name: 'languages',
  component: LanguageMain,
  meta: { tokenRequired: true }
}, {
  path: '/',
  name: 'snippets',
  component: SnippetIndex,
  meta: { tokenRequired: true }
}, {
  path: '/password_change',
  name: 'password_change',
  component: PasswordChangeMain,
  meta: { tokenRequired: true }
},{
  path: '/login',
  name: 'login',
  component: LoginMain,
  meta: { tokenRequired: false }
},{
  path: '/register',
  name: 'register',
  component: RegisterMain,
  meta: { tokenRequired: false }
},

];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(), routes, // short for `routes: routes`
});

// 画面遷移前に発火
router.beforeEach((to, from, next) => {
    store.dispatch('fetchAuthUser').then((AuthUser) => {

      // 遷移先がトークンを必要としている かつ 認証済みユーザーがない場合はログイン画面へ
      if (to.matched.some(record => record.meta.tokenRequired) && !AuthUser) {
        next({ name: 'login' });
        // 遷移先がトークンを必要としていない かつ 認証済みユーザーがある
      } else if (to.matched.some(record => !record.meta.tokenRequired) && AuthUser) {
        next({ name: 'snippets' });
      } else {
        // 正常に遷移
        next();
      }
    })
})

export default router