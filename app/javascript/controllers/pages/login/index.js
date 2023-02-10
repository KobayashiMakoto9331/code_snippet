import { mapActions } from 'vuex'

const loginMain = {
  template:
    `
      <div class="comp-login">
        <div class="lay-login">
          <p class="obj-middle-title">ログイン</p>
          <!--メールアドレス-->
          <div class="lay-form">
            <input type="email"
                   class="obj-form"
                   placeholder="メールアドレス"
                   v-model="form_attributes.email.value">
            <!--エラーメッセージ-->
            <div class="lay-error-message">
              <p class="obj-error-message">{{ form_attributes.email.error_message }}</p>
            </div>
          </div>
          
          <!--パスワード-->
          <div class="lay-form">
            <input  type="password"
                    class="obj-form"
                    placeholder="パスワード"
                    v-model="form_attributes.password.value">
            <!--エラーメッセージ-->
            <div class="lay-error-message">
              <p class="obj-error-message">{{ form_attributes.password.error_message }}</p>
            </div>
          </div>
          
          <!--ログインボタン-->
          <div class="lay-btn">
            <a class="blue-btn obj-login-btn"
               @click="login">
              ログイン</a>
          </div>
        </div>
      </div>
    `,
  data() {
    return {
      form_attributes: {
        email: {
          value: '',
          error_message: ''
        },
        password: {
          value: '',
          error_message: ''
        },
      }
    }
  },
  components: {},

  created() {

  },

  methods: {
    ...mapActions([
      'loginUser', // ログイン
    ]),
    // ログイン
    async login(){
      await this.loginUser(this.form_attributes);
      // 画面遷移
      this.$router.push({ name: 'snippets' });
    },
  }
}

export default loginMain