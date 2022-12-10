console.log('========BBBBB')

import * as Vue from "vue";
import Axios from "../plugins/axios";
import SnippetCreateModal from "./pages/snippet/component/snippetCreateModal";
import SnippetEditModal from "./pages/snippet/component/snippetEditModal";
import SnippetDeleteConfirmModal from "./pages/snippet/component/snippeDeleteConfirmModal"
const App = Vue.createApp({
    data() {
        return {
            text: 'Hello Vue',
            allSnippet: [],
            allLanguage: [],
            allData: [],
            filterLanguage: ['全て'],
            selectedLanguage: '選択してください',
            isVisibleSnippetCreateModal: false,
            isVisibleSnippetEditModal: false,
            isVisibleSnippetDeleteConfirmModal: false,
            isOpenDropDown: false,
            editSnippet: '',
        }
    },
    components: {
        SnippetCreateModal,
        SnippetEditModal,
        SnippetDeleteConfirmModal,
    },

    created() {
        this.fetchSnippet()
        this.fetchLanguage()

    },

    methods: {
        // 全言語取得
        fetchLanguage() {
            Axios.get("languages")
                .then(res => (
                    this.allLanguage = res.data,
                        // filter用の言語にセットする
                        this.fetchFilterLanguage(res.data)
                ))


        },
        // filter用の言語にセットする
        fetchFilterLanguage(languages) {
            languages.forEach((language) => {
                this.filterLanguage.push(language.language)
            })
        },

        // 全スニペット取得
        fetchSnippet() {
            console.log('==========-fetchSnippet')
            Axios.get("snippets")
                .then(res => (
                    this.allData = res.data,
                        this.allSnippet = this.allData
                ))
        },
        // スニペット削除
        handleDeleteSnippet(snippet_id) {
            Axios.post("delete_snippet", {snippet_id: snippet_id})
                .then(res => {
                    this.fetchSnippet()
                })
                .catch(err => {
                    console.log(err)
                });
            // 削除確認モーダルを閉じる
            this.handleCloseSnippetDeleteConfirmModal()
        },
        // ドロップダウンの開閉
        handleLanguageDropMenu() {
            this.isOpenDropDown = !this.isOpenDropDown
        },
        closeLanguageDropMenu() {
            if (this.isOpenDropDown == true) {
                this.isOpenDropDown = false
            }
        },

        // snippet作成モーダルを開く
        handleShowSnippetCreateModal() {
            this.isVisibleSnippetCreateModal = true
        },
        // snippet作成モーダルを閉じる
        handleCloseSnippetCreateModal(snippet) {
            this.isVisibleSnippetCreateModal = false
        },
        // snippet編集モーダルを開く
        handleShowSnippetEditModal(snippet) {
            this.editSnippet = snippet
            this.isVisibleSnippetEditModal = true
        },
        // snippet編集モーダルを閉じる
        handleCloseSnippetEditModal() {
            this.isVisibleSnippetEditModal = false
        },
        // ショートカット検査用の言語を選択
        selectFilterLanguage(language) {
            // 選択中の言語をセット
            this.selectedLanguage = language
            // 全てを選択
            let ALL = '全て'
            if (language == ALL) {
                // 全言語を取得する
                this.fetchSnippet()
            } else {
                // 全て以外の言語を選択
                this.allSnippet = []
                for (let i = 0; i < this.allData.length; i++) {
                    console.log(this.allData)
                    console.log(this.allData[i].language)
                    // 選択言語がsnippetと一致しない場合、全snippet内から排除する
                    if (this.allData[i].language == language) {
                        this.allSnippet.push(this.allData[i])
                    }
                }
            }
        },
        // snippet削除確認モーダルを開く
        handleShowSnippetDeleteConfirmModal(snippet_id){
           this.isVisibleSnippetDeleteConfirmModal = true
            this.deleteSnippetId = snippet_id

        },
        // snippet削除確認モーダルを閉じる
        handleCloseSnippetDeleteConfirmModal(){
            this.isVisibleSnippetDeleteConfirmModal = false
        },
        // 選択したsnippetに移動する
        scrollToSnippet(id){
            console.log(id)
            document.getElementById(id).scrollIntoView({
                behavior: "smooth",
            });
        },
        // トップに戻る
        scrollToTop(){
            window.scroll({top: 0, behavior: 'smooth'});
        }

    },


})

App.mount("#app");