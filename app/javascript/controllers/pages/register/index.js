import Axios from "../../../plugins/axios";

const registerMain = {
  template:
    `
      <div class="comp-register">
      <div class="lay-register">
        <p class="obj-middle-title">アカウント登録</p>
        <!--名前-->
        <div class="lay-form">
          <p class="obj-form-label">氏名</p>
          <div class="lay-name-form">
            <div class="obj-form">
              <input type="text"
                     placeholder="姓" 
                     v-model="user.last_name">
            </div>

            <div class="obj-form obj-name-right">
              <input type="text"
                     placeholder="名"
              v-model="user.first_name">
            </div>
          </div>

          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message"
               v-if="isVisibleValidation">既に登録済みの言語です</p>
          </div>
        </div>

        <!--メールアドレス-->
        <div class="lay-form">
          <p class="obj-form-label">メールアドレス</p>
          <input type="email" 
                 class="obj-form" 
                 placeholder="メールアドレス" 
                 v-model="user.email">
          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message"
               v-if="isVisibleValidation">既に登録済みの言語です</p>
          </div>
        </div>

        <!--パスワード-->
        <div class="lay-form">
          <p class="obj-form-label">パスワード</p>
          <input type="password"
                 class="obj-form"
                 placeholder="パスワード"
                 v-model="user.password">
          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message"
               v-if="isVisibleValidation">既に登録済みの言語です</p>
          </div>
        </div>

        <!--パスワード（確認）-->
        <div class="lay-form">
          <p class="obj-form-label">パスワード（確認）</p>
          <input type="password"
                 class="obj-form"
                 placeholder="パスワード（確認）"
                 v-model="user.password_confirm">
          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message"
               v-if="isVisibleValidation">既に登録済みの言語です</p>
          </div>
        </div>

        <!--ログインボタン-->
        <div class="lay-btn">
          <a class="blue-btn obj-login-btn" 
             @click="create_user">
            登録</a>
        </div>
      </div>
      </div>
    `,
  data() {
    return {
      isVisibleValidation: false,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
      }
    }
  },
  components: {},

  created() {

  },

  methods: {
    create_user(){
      Axios.post("create_user", {'user': this.user})
        .then(res => {

        });
    }
  }
}

export default registerMain