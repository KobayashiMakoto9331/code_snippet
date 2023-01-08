import Axios from "../../../../plugins/axios";

const languageEditModal = {
  props: ['language', 'allLanguage'],
  template: `
    <div class="comp-modal-wrapper">
    <!--背景-->
    <div class="obj-modal-bg"
         @click="handleCloseLanguageEditModal"></div>

    <!--モーダル-->
    <div class="comp-modal-body">
      <div class="create-modal">
        <!--バツアイコン-->
        <span class="cancel-icon"></span>

        <!--モーダルタイトル-->
        <div class="lay-modal-title">
          <div class="obj-common-title">languageを編集</div>
        </div>

        <!--言語-->
        <div class="comp-modal-language-item">
          <div class="lay-modal-language-item">
            <label class="obj-middle-title">言語名</label>
            <input
                type="text"
                class="obj-modal-item border-bottom"
                v-model="language.language"
            >
            <!--エラーメッセージ-->
            <div class="lay-error-message">
              <p class="obj-error-message" v-if="isVisibleValidation">既に登録済みの言語です</p>
            </div>
          </div>
        </div>

        <!--ボタン-->
        <div class="comp-modal-language-option">
          <div class="lay-modal-language-option">
            <a class="obj-modal-btn neutral cancel"
               @click="handleCloseLanguageEditModal">キャンセル</a>
            <a class="obj-modal-btn positive"
               @click="handleEditLanguage()">登録</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,
  data(){
    return {
      isVisibleValidation: false,
      allData: [],
    }
  },

  created() {
    // 深いコピー
    this.allData = JSON.parse(JSON.stringify(this.allLanguage))
  },

  methods: {
    handleCloseLanguageEditModal() {
      this.$emit("close-language-edit-modal");
      this.allData = [];
    },
    // 言語編集
    handleEditLanguage() {
      // 前後の空白を削除
      const trimmed_language = this.language.language.trim()

      // 空文字の場合は処理しない
      if(trimmed_language.length == 0) return;

      // 既に登録されている言語がある場合は処理しない
      for (let i = 0; i < this.allLanguage.length; i++) {
        if(this.allData[i].language.toLowerCase() === trimmed_language.toLowerCase()) {
          this.isVisibleValidation = true;
          return;
        }
      }
      // 新規投稿できる場合、バリデーションメッセージを非表示
      this.isVisibleValidation = false

      Axios.post("update_language", {'language': this.language})
        .then(res => {
          this.handleCloseLanguageEditModal();
          this.$emit("fetch-language");
        });
    },
  },

}

export default languageEditModal;


