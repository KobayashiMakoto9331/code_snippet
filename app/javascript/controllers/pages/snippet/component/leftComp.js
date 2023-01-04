const LeftComp = {
  props: ['snippets', 'displayLanguage'],
  template:
    `
      <div class="snippet-left">
      <!--言語絞り込み-->
      <div class="comp-select-snippet">
        <div><p class="obj-middle-title">言語を選択</p></div>
        <div class="lay-select-language-form"
             @click.stop="handleLanguageDropMenu">
          <div class="obj-selected_language">
            <input v-model="selectedLanguage"></div>
          <div class="obj-icon-row-arrow"></div>
          <!--ドロップメニュー-->
          <transition name="drop">
            <span v-if="isOpenDropDown" class="lay-modal-dropdown-menu">
            <ul>
              <li  @click="selectFilterLanguage('全て')">全て</li>
              <li v-for="language in displayLanguage"
                  @click="selectFilterLanguage(language.language)"
              >
                {{ language.language }}
              </li>
            </ul>
          </span>
          </transition>
        </div>
      </div>
      <!--スニペットタイトル一覧-->
      <div class="comp-snippet-title-list">
        <p class="obj-middle-title">ショートカットリスト</p>
        <div class="comp-snippet-title"
             v-for="snippet in snippets"
             :key="snippet.id">
          <div class="lay-snippet-title"
               @click="$emit('scroll-to-snippet', snippet.id)">
            <span>【{{ snippet.language }}】</span>
            <span>{{ snippet.title }}</span>
          </div>
        </div>
      </div>
      </div>

    `,
  data() {
    return {
      isOpenDropDown: false,
      selectedLanguage: '選択してください',
    }
  },
  components: {},

  created() {

  },

  methods: {
    // ドロップダウンを開く
    handleLanguageDropMenu() {
      this.isOpenDropDown = !this.isOpenDropDown
    },
    // ドロップダウンを閉じる
    closeLanguageDropMenu() {
      if (this.isOpenDropDown == true) {
        this.isOpenDropDown = false
      }
    },
    // 言語で絞り込み
    selectFilterLanguage(language) {
      // 全てを選択
      let ALL = '全て'
      if (language == ALL) {
        // 全言語を取得する
        this.$emit('fetch-language')
        this.selectedLanguage = ALL
      } else {
        // 言語でsnippetを絞り込む
        this.$emit('filter-language', language)
        // 選択中の言語をセット
        this.selectedLanguage = language
      }
    },

  }
}

export default LeftComp