import Axios from "../../../../plugins/axios";

const snippetDeleteConfirmModal = {
    props: ['snippet_id'],
    template: `
      <div class="comp-modal-wrapper">
      <!--背景-->
      <div class="obj-modal-bg"
           @click="handleCloseSnippetDeleteConfirmModal"></div>

      <!--モーダル-->
      <div class="comp-modal-body">
        <div class="create-modal">
          <!--バツアイコン-->
          <span class="cancel-icon"></span>

          <!--本文-->
          <div class="comp-modal-snippet-item">
            <div class="lay-modal-snippet-item">
              <p>このsnippetを本当に削除してもいいですか？</p>
            </div>
          </div>

          <!--ボタン-->
          <div class="comp-modal-snippet-option">
            <div class="lay-modal-snippet-option">
              <a class="obj-modal-btn neutral cancel"
                 @click="handleCloseSnippetDeleteConfirmModal">キャンセル</a>
              <a class="obj-modal-btn danger"
                 @click="handleDeleteSnippet">削除</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    `,

    data() {
    },
    created() {
    },

    methods: {
        handleCloseSnippetDeleteConfirmModal() {
            this.$emit("close-snippet-delte-confirm-modal")
        },
        // スニペット作成
        handleDeleteSnippet() {
            this.handleCloseSnippetDeleteConfirmModal();
            this.$emit("handle-delete-snippet", this.snippet_id);
        },
    },

}

export default snippetDeleteConfirmModal;


