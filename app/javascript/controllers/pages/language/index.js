import Axios from "../../../plugins/axios";
import LanguageCreateModal from "./component/languageCreateModal";
import LanguageDeleteConfirmModal from "./component/languageDeleteConfirmModal";
import languageEditModal from "./component/languageEditModal";

const languageMain = {
  template: `
    <div class="comp-language">
    <div class="lay-registered-language">
      <p class="obj-middle-title">登録済みの言語</p>
      <div v-for="language in allLanguage" :key="language.id"
           class="lay-register-language-item">
        <div class="lay-table-item obj-registered-language">{{ language.language }}</div>
        <div class="lay-table-item">
          <a class="obj-edit"
             @click="handleShowLanguageEditModal(language)">編集</a>
          <a class="obj-delete"
             @click="handleShowLanguageDeleteConfirmModal(language.id)">削除</a>
        </div>
      </div>
    </div>

    <div class="lay-btn">
      <a class="blue-btn"
         @click="isVisibleLanguageCreateModal=true">
        新しい言語を設定</a>
    </div>

    <!--言語作成モーダル-->
    <transition name="fade">
      <language-create-modal
          v-if="isVisibleLanguageCreateModal"
          :allLanguage='this.allLanguage'
          @close-language-create-modal="isVisibleLanguageCreateModal = false"
          @fetch-language="fetchLanguage()"/>
    </transition>

    <!--言語編集モーダル-->
    <transition name="fade">
      <language-edit-modal
          v-if="isVisibleLanguageEditModal"
          :language="this.editLanguage"
          :allLanguage="this.allLanguage"
          @close-language-edit-modal="isVisibleLanguageEditModal = false"
          @fetch-language="fetchLanguage()"/>
    </transition>

    <!--言語削除確認モーダル-->
    <transition name="fade">
      <language-delete-confirm-modal
          v-if="isVisibleLanguageDeleteConfirmModal"
          @handle-delete-language="handleDeleteLanguage"
          @close-language-delete-confirm-modal="isVisibleLanguageDeleteConfirmModal = false"
      />
    </transition>
    </div>
  `,
  data() {
    return {
      allLanguage: [],
      isVisibleLanguageCreateModal: false,
      isVisibleLanguageDeleteConfirmModal: false,
      isVisibleLanguageEditModal: false,
      editLanguage: '',
      deleteLanguageId: '',
    }
  },
  components: {
    LanguageCreateModal,
    LanguageDeleteConfirmModal,
    languageEditModal
  },

  created() {
    this.fetchLanguage()
  },

  methods: {
    // 全言語取得
    fetchLanguage() {
      Axios.get("languages")
        .then(res => (
          this.allLanguage = res.data
        ));
    },
    // 言語編集モーダルを開く
    handleShowLanguageEditModal(language) {
      this.editLanguage = language
      this.isVisibleLanguageEditModal = true
    },

    // 言語削除
    async handleDeleteLanguage() {
      await Axios.post("delete_language", {language_id: this.deleteLanguageId})
        .then(res => {
          this.fetchLanguage()
        })
        .catch(err => {
          console.log(err)
        });
      // 削除確認モーダルを閉じる
      this.handleCloseLanguageDeleteConfirmModal()
    },

    // language削除確認モーダルを開く
    handleShowLanguageDeleteConfirmModal(language_id) {
      this.isVisibleLanguageDeleteConfirmModal = true
      this.deleteLanguageId = language_id
    },

    // language削除確認モーダルを閉じる
    handleCloseLanguageDeleteConfirmModal() {
      this.isVisibleLanguageDeleteConfirmModal = false
      this.deleteLanguageId = ''
    },
  }
}

export default languageMain