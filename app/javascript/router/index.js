import Vue from 'vue'
import Router from 'vue-router'
import SnippetIndex from "../pages/snippet/index" //ルート先のview
// import TaskIndex from "../pages/task/index" //ルート先のview

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/snippets',
            name: 'snippet',
            component: SnippetIndex
        }
    ]
})
export default router