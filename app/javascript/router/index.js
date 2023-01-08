import * as VueRouter from "vue-router";
import "@vue/devtools-api";
import SnippetIndex from "./../controllers/pages/snippet/index" //ルート先のview
// import TaskIndex from "../pages/task/index" //ルート先のview
import LanguageMain from "./../controllers/pages/language/index"
import PasswordChangeMain from "./../controllers/pages/password_change/index"
import LoginMain from "./../controllers/pages/login/index"
import RegisterMain from "./../controllers/pages/register/index"

const routes = [{
  path: '/languages', name: 'languages', component: LanguageMain
}, {
  path: '/', name: 'snippets', component: SnippetIndex
}, {
  path: '/password_change', name: 'password_change', component: PasswordChangeMain
},{
  path: '/login', name: 'login', component: LoginMain
},{
  path: '/register', name: 'register', component: RegisterMain
},

];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(), routes, // short for `routes: routes`
});

export default router