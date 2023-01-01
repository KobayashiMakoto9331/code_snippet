import * as VueRouter from "vue-router";
import "@vue/devtools-api";
// import SnippetIndex from "./../controllers/pages/snippet/index" //ルート先のview
// import TaskIndex from "../pages/task/index" //ルート先のview
import  LanguageMain from "./../controllers/pages/language/index"
console.log('router')
// const router = {}

const routes = [{
  path: '/languages', name: 'languages', component: LanguageMain
},
//   {
//   path: '/snippets', name: 'snippet', component: SnippetIndex
// }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router