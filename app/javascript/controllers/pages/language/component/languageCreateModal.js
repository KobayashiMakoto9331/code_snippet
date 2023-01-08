import Axios from "../../../../plugins/axios";

const languageCreateModal = {
  props: ['allLanguage'],
  template: `
    <div class="comp-modal-wrapper">
    <!--背景-->
    <div class="obj-modal-bg"
         @click="handleCloseLanguageCreateModal"></div>

    <!--モーダル-->
    <div class="comp-modal-body">
      <div class="create-modal">
        <!--バツアイコン-->
        <span class="cancel-icon"></span>

        <!--モーダルタイトル-->
        <div class="lay-modal-title">
          <div class="obj-common-title">新しい言語</div>
        </div>

        <!--言語-->
        <div class="comp-modal-language-item">
          <div class="lay-modal-language-item">
            <label class="obj-middle-title">言語名</label>
            <input
                type="text"
                class="obj-modal-item border-bottom"
                v-model="language"
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
               @click="handleCloseLanguageCreateModal">キャンセル</a>
            <a class="obj-modal-btn positive"
               @click="handleCreateLanguage()">登録</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,

  data() {
    return {
      language: '',
      isVisibleValidation: false,
    }
  },
  created() {
  },
  methods: {
    handleCloseLanguageCreateModal() {
      this.$emit("close-language-create-modal")
    },
    // スニペット作成
    handleCreateLanguage() {
      // 前後の空白を削除
      const trimmed_language = this.language.trim();

      // 空文字の場合は処理しない
      if(trimmed_language.length == 0) return;

      // 既に登録されている言語がある場合は処理しない
      for (let i = 0; i < this.allLanguage.length; i++) {
        if(this.allLanguage[i].language.toLowerCase().indexOf(trimmed_language.toLowerCase()) != -1) {
          this.isVisibleValidation = true;
          return;
        }
      }
      // 新規投稿できる場合、バリデーションメッセージを非表示
      this.isVisibleValidation = false

      // 新規登録
      Axios.post("create_language", {'language': trimmed_language})
        .then(res => {
          console.log(res.data)
          this.handleCloseLanguageCreateModal();
          this.$emit("fetch-language");
        });
    },
  },

}

export default languageCreateModal;


