const languageDeleteConfirmModal = {
    template: `
      <div class="comp-modal-wrapper">
      <!--背景-->
      <div class="obj-modal-bg"
           @click="handleCloseLanguageDeleteConfirmModal"></div>

      <!--モーダル-->
      <div class="comp-modal-body">
        <div class="create-modal">
          <!--バツアイコン-->
          <span class="cancel-icon"></span>

          <!--本文-->
          <div class="comp-modal-language-item">
            <div class="lay-modal-language-item">
              <p>この言語を本当に削除してもいいですか？</p>
            </div>
          </div>

          <!--ボタン-->
          <div class="comp-modal-language-option">
            <div class="lay-modal-language-option">
              <a class="obj-modal-btn neutral cancel"
                 @click="handleCloseLanguageDeleteConfirmModal">キャンセル</a>
              <a class="obj-modal-btn danger"
                 @click="handleDeleteLanguage">削除</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    `,

    created() {
    },

    methods: {
        handleCloseLanguageDeleteConfirmModal() {
            this.$emit("close-language-delete-confirm-modal")
        },
        // スニペット削除
        handleDeleteLanguage() {
            this.$emit("handle-delete-language");
        },
    },

}

export default languageDeleteConfirmModal;


