import Axios from "../../../../plugins/axios";

const snippetCreateModal = {
    props: ['languages'], template: `
    <div class="comp-modal-wrapper">
    <!--背景-->
    <div class="obj-modal-bg"
         @click="handleCloseSnippetCreateModal"></div>

    <!--モーダル-->
    <div class="comp-modal-body">
      <div class="create-modal">
        <!--バツアイコン-->
        <span class="cancel-icon"></span>

        <!--モーダルタイトル-->
        <div class="lay-modal-title">
          <div class="obj-common-title">新しいsnippet</div>
        </div>
        <!--言語選択-->
        <div class="comp-modal-snippet-item">
          <div class="lay-modal-snippet-item">
            <label class="obj-middle-title">言語</label>
            <input class="obj-modal-item border-bottom"
                   @click="openLanguageDropMenu"
                   v-model="this.selected_language.language">
            <!--ドロップメニュー-->
            <span class="lay-modal-dropdown-menu"
                  v-if="isOpenDropDown">
            <ul>
              <li v-for="language in this.languages"
                  :key="language.id"
                  @click="selectLanguage(language)">
                {{ language.language }}
              </li>
            </ul>
          </span>
          </div>
        </div>


        <!--タイトル-->
        <div class="comp-modal-snippet-item">
          <div class="lay-modal-snippet-item">
            <label class="obj-middle-title">タイトル</label>
            <input
                type="text"
                class="obj-modal-item border-bottom title"
                v-model="snippet.title"
            >
          </div>
        </div>
        <!--コンテンツ-->
        <div class="comp-modal-snippet-item">
          <div class="lay-modal-snippet-item">
            <label class="obj-middle-title">コンテンツ</label>
            <textarea
                class="obj-modal-item content"
                v-model="snippet.contents"
                rows="3"
            ></textarea>
          </div>
        </div>

        <!--ボタン-->
        <div class="comp-modal-snippet-option">
          <div class="lay-modal-snippet-option">
            <a class="obj-modal-btn neutral cancel"
               @click="handleCloseSnippetCreateModal">キャンセル</a>
            <a class="obj-modal-btn positive"
               @click="handleCreateSnippet()">登録</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    `,

    data() {
        return {
            snippet: {
                title: '', contents: '', languages_id: ''
            },
            selected_language: {
                id: '',
                language: '',
            },
            isOpenDropDown: false
        }
        },
    created() {
        // 選択言語の初期設定
        console.log('============create')
        this.selected_language = this.languages[0]
        this.snippet.languages_id = this.languages[0].id
    },
    methods: {
        handleCloseSnippetCreateModal() {
            this.$emit("close-snippet-create-modal")
        },
        // スニペット作成
        handleCreateSnippet() {
            Axios.post("create_snippet", this.snippet)
                .then(res => {
                    this.handleCloseSnippetCreateModal();
                    this.$emit("fetch-snippet");
                });
        },
        // ドロップダウンを開く
        openLanguageDropMenu() {
            this.isOpenDropDown = true
        }, // ドロップダウンを閉じる
        closeLanguageDropMenu() {
            this.isOpenDropDown = false
        }, // 登録する言語を選択
        selectLanguage(language) {
            this.selected_language = language
            // 更新対象の言語設定
            this.snippet.languages_id = language.id
            this.closeLanguageDropMenu()
        },
    },

}

export default snippetCreateModal;


