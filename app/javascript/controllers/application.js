console.log('========BBBBB')
import * as Vue from "vue";
import SnippetMain from "./pages/snippet/index"
import headerComp from "./feature/header_comp"
import router from "./../router/index"

const App = Vue.createApp({
    template: `
        <headerComp/>
        <router-view/>
    `,

    data() {
        return {
        }
    },
    components: {
        SnippetMain,
        headerComp
    },

    created() {
    },

});

App.use(router);
App.mount("#app");
