import SnippetCreateModal from "./component/snippetCreateModal";
import SnippetEditModal from "./component/snippetEditModal";
import SnippetDeleteConfirmModal from "./component/snippetDeleteConfirmModal";
import LeftComp from "./component/leftComp";
import RightComp from "./component/rightComp";
import Axios from "../../../plugins/axios";
import marked from "marked";

const snippetMain = {
  template:
    `
    <!--スニペットタイトルリスト-->
  <div class="container" @click="this.$refs.left.closeLanguageDropMenu()">
  
    <!--左側の要素-->
    <LeftComp
        :snippets="allSnippet"
        :displayLanguage="allLanguage"
        @fetch-language="this.fetchSnippet"
        @filter-language="this.filterLanguage"
        @scroll-to-snippet="this.scrollToSnippet"
        ref="left"
    />
    
    <!--右側の要素-->
    <RightComp 
        :snippets="allSnippet"
        @fetch-snippet="fetchSnippet"
        @save-snippet-index="saveSnippetIndex"
        @handle-show-snippet-edit-modal="handleShowSnippetEditModal"
        @handle-show-delete-confirm-modal="handleShowSnippetDeleteConfirmModal"
        @handle-show-snippet-create-modal="isVisibleSnippetCreateModal = true"
        @scroll-to-top="scrollToTop()"
        @filter-snippet="filterSnippet"
    />

    <!--スニペット作成モーダル-->
    <transition name="fade">
      <snippet-create-modal
        v-if="isVisibleSnippetCreateModal"
        :languages="this.allLanguage"
        @close-snippet-create-modal="isVisibleSnippetCreateModal = false"
        @fetch-snippet="fetchSnippet()"/>
    </transition>

    <!--スニペット編集モーダル-->
    <transition name="fade">
      <snippet-edit-modal
        v-if="isVisibleSnippetEditModal"
        :languages="this.allLanguage"
        :snippet="this.editSnippet"
        @close-snippet-edit-modal="isVisibleSnippetEditModal = false"
        @fetch-snippet="fetchSnippet()"/>
    </transition>

    <!--スニペット削除確認モーダル-->
    <transition name="fade">
      <snippet-delete-confirm-modal
        v-if="isVisibleSnippetDeleteConfirmModal"
        @close-snippet-delte-confirm-modal="handleCloseSnippetDeleteConfirmModal"
        @handle-delete-snippet="handleDeleteSnippet"
        />
    </transition>

  </div>
`,
  data() {
    return {
      allSnippet: [],
      allLanguage: [],
      allData: [],
      isVisibleSnippetCreateModal: false,
      isVisibleSnippetEditModal: false,
      isVisibleSnippetDeleteConfirmModal: false,
      editSnippet: '',
      deleteSnippetId: '',
    }
  },
  components: {
    LeftComp,
    RightComp,
    SnippetCreateModal,
    SnippetEditModal,
    SnippetDeleteConfirmModal,
  },

  created() {
    this.fetchSnippet()
    this.fetchLanguage()
  },

  methods: {
    // 右側要素のメソッド
    // 言語でsnippet絞り込み
    filterLanguage(language){
      // 全て以外の言語を選択
      this.allSnippet = []
      for (let i = 0; i < this.allData.length; i++) {
        // 選択言語が一致するsnippetのみにフィルターする
        if (this.allData[i].language == language) {
          this.allSnippet.push(this.allData[i])
        };
      };
      // マークダウン化
      this.markSnippetContents(this.allSnippet);
    },
    // snippetのリアルタイム検索
    filterSnippet(keyword){
      // 初期化
      this.allSnippet = [];
      for (let i = 0; i < this.allData.length; i++) {
        // 入力値に一致するsnippetを絞り込む
        if (this.allData[i].title.indexOf(keyword) != -1 ||
          this.allData[i].contents.indexOf(keyword) != -1) {
          this.allSnippet.push(this.allData[i]);
        }
      };
      // マークダウン化
      this.markSnippetContents(this.allSnippet);
    },
    // ドラッグ終了時の並びを保存
    saveSnippetIndex() {
      Axios.post("update_snippet_index", this.allSnippet)
    },
    // 全言語取得
    fetchLanguage() {
      Axios.get("languages")
        .then(res => (
          this.allLanguage = res.data
        ));
    },
    // 全スニペット取得
    async fetchSnippet() {
      console.log('==========-fetchSnippet')
      await Axios.get("snippets")
        .then(res => (
          this.allData = res.data,
            // 深いコピー
            this.allSnippet = JSON.parse(JSON.stringify(this.allData))
        ));
      // マークダウン化
      this.markSnippetContents(this.allSnippet);
    },
    // snippetのコンテンツをマークダウン化させる
    markSnippetContents(snippets){
      snippets.forEach((snippet) => {
        snippet.contents = marked(snippet.contents)
      })
    },
    // スニペット削除
    handleDeleteSnippet() {
      Axios.post("delete_snippet", {snippet_id: this.deleteSnippetId})
        .then(res => {
          this.fetchSnippet()
        })
        .catch(err => {
          console.log(err)
        });
      // 削除確認モーダルを閉じる
      this.handleCloseSnippetDeleteConfirmModal()
    },
    // snippet編集モーダルを開く
    handleShowSnippetEditModal(snippet) {
      this.allData.filter((data) => {
        if (data.id == snippet.id) {
          // マークダウン化する前のデータを渡す
          this.editSnippet = data
        }
      });
      this.isVisibleSnippetEditModal = true
    },
    // snippet削除確認モーダルを開く
    handleShowSnippetDeleteConfirmModal(snippet_id) {
      this.isVisibleSnippetDeleteConfirmModal = true
      this.deleteSnippetId = snippet_id
    },
    // snippet削除確認モーダルを閉じる
    handleCloseSnippetDeleteConfirmModal() {
      this.isVisibleSnippetDeleteConfirmModal = false
      this.deleteSnippetId = ''
    },
    // 選択したsnippetに移動する
    scrollToSnippet(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    },
    // トップに戻る
    scrollToTop() {
      window.scroll({top: 0, behavior: 'smooth'});
    },
  }
}

export default snippetMain