const loginMain = {
  template:
    `
      <div class="comp-login">
        <div class="lay-login">
          <p class="obj-middle-title">ログイン</p>
          <!--メールアドレス-->
          <div class="lay-form">
            <input type="email" class="obj-form">
            <!--エラーメッセージ-->
            <div class="lay-error-message">
              <p class="obj-error-message"
              v-if="isVisibleValidation">既に登録済みの言語です</p>
            </div>
          </div>
          
          <!--パスワード-->
          <div class="lay-form">
            <input type="password" class="obj-form">
            <!--エラーメッセージ-->
            <div class="lay-error-message">
              <p class="obj-error-message"
              v-if="isVisibleValidation">既に登録済みの言語です</p>
            </div>
          </div>
          
          <!--ログインボタン-->
          <div class="lay-btn">
            <a class="blue-btn obj-login-btn">
              ログイン</a>
          </div>
        </div>
      </div>
    `,
  data() {
    return {
      isVisibleValidation: false
    }
  },
  components: {},

  created() {

  },

  methods: {}
}

export default loginMain