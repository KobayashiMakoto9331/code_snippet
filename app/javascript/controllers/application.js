console.log('========BBBBB')

import * as Vue from "vue";
import Axios from "../plugins/axios";

const App = Vue.createApp({
    data(){
        return {
            text: 'Hello Vue',
            allSnippet: [],
            allLanguage: [],
        }
    },

    created() {
        this.fetchSnippet()
        this.fetchLanguage()
    },

    methods: {
        fetchLanguage(){
            Axios.get("languages")
                .then(res => (
                    this.allLanguage = res.data
                ))
        },

        fetchSnippet() {
            Axios.get("snippets")
                .then(res => (
                    this.allSnippet = res.data
                ))
        }
    },
})

App.mount("#app");