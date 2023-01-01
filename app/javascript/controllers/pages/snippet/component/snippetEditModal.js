import Axios from "../../../../plugins/axios";

const snippetEditModal = {
    props: ['languages', 'snippet'],
    template: `
    <div class="comp-modal-wrapper">
    <!--背景-->
    <div class="obj-modal-bg"
         @click="handleCloseSnippetEditModal"></div>

    <!--モーダル-->
    <div class="comp-modal-body">
      <div class="create-modal">
        <!--バツアイコン-->
        <span class="cancel-icon"></span>

        <!--モーダルタイトル-->
        <div class="lay-modal-title">
          <div class="obj-common-title">snippetを編集</div>
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
                class="obj-modal-item border-bottom"
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
               @click="handleCloseSnippetEditModal">キャンセル</a>
            <a class="obj-modal-btn positive"
               @click="handleEditSnippet()">登録</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    `,

    data() {
        return {
            selected_language: {id: '', language: ''},
            isOpenDropDown: false
        }
        },
    created() {
            // 選択言語の初期設定 登録情報を参照する
            let language = this.languages.filter(e => e.id == this.snippet.languages_id);

            if(language[0]){
                this.selected_language = language[0]
            } else {
                this.selected_language = this.languages[0]
            }
        },

    methods: {
        handleCloseSnippetEditModal() {
            this.$emit("close-snippet-edit-modal")
        },
        // スニペット作成
        handleEditSnippet() {
            Axios.post("update_snippet", {'snippet': this.snippet})
                .then(res => {
                    this.handleCloseSnippetEditModal();
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
            this.snippet.languages_id = language.id
            this.selected_language = language
            this.closeLanguageDropMenu()
        },
    },

}

export default snippetEditModal;


