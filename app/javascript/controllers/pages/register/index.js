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
                     v-model="form_attributes.first_name.value">
              <!--エラーメッセージ-->
              <div class="lay-error-message">
                <p class="obj-error-message">{{ form_attributes.first_name.error_message }}</p>
              </div>
            </div>

            <div class="obj-form obj-name-right">
              <input type="text"
                     placeholder="名"
                     v-model="form_attributes.last_name.value">
              <!--エラーメッセージ-->
              <div class="lay-error-message">
                <p class="obj-error-message">{{ form_attributes.last_name.error_message }}</p>
              </div>
            </div>
          </div>

        </div>

        <!--メールアドレス-->
        <div class="lay-form">
          <p class="obj-form-label">メールアドレス</p>
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
          <p class="obj-form-label">パスワード</p>
          <input type="password"
                 class="obj-form"
                 placeholder="パスワード"
                 v-model="form_attributes.password.value">
          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message">{{ form_attributes.password.error_message }}</p>
          </div>
        </div>

        <!--パスワード（確認）-->
        <div class="lay-form">
          <p class="obj-form-label">パスワード（確認）</p>
          <input type="password"
                 class="obj-form"
                 placeholder="パスワード（確認）"
                 v-model="form_attributes.password_confirmation.value">
          <!--エラーメッセージ-->
          <div class="lay-error-message">
            <p class="obj-error-message">{{ form_attributes.password_confirmation.error_message }}</p>
          </div>
        </div>

        <!--ログインボタン-->
        <div class="lay-btn">
          <a class="blue-btn obj-login-btn"
             type="submit"
             @click="registerUser()">
            登録</a>
        </div>
      </div>

      </div>
    `,

  data() {
    return {
      form_attributes: {
        first_name: {
          value: '',
          error_message: ''
        },
        last_name: {
          value: '',
          error_message: ''
        },
        email: {
          value: '',
          error_message: ''
        },
        password: {
          value: '',
          error_message: ''
        },
        password_confirmation: {
          value: '',
          error_message: ''
        }
      },
    }
  },

  methods: {

    registerUser() {
      // バリデーション
      this.checkValidate()

      // バリデーションエラーがある場合は処理を抜ける
      const error_array = Object.values(this.form_attributes)
      for (let i = 0; i < error_array.length; i++) {
        if (error_array[i].error_message != '') return false;
      }

      // ユーザー登録
      Axios.post("create_user", {user: this.form_attributes})
        .then(res => {
          console.log('送信成功')
          if(res.data.result == 'OK'){
            console.log('成功')
            this.$router.push({ name: 'login'})
          } else if(res.data.result == 'NG'){
            this.form_attributes.email.error_message = res.data.error_message
          }
        })
        .catch(err => {
          console.log(err)
        });

    },

    // クリック時バリデーション発火
    checkValidate() {
      Object.keys(this.form_attributes).forEach(function (key) {
        const error_message = this.Validation(key, this.form_attributes[key].value)
        if (error_message === true) {
          this.form_attributes[key].error_message = ''
        } else {
          this.form_attributes[key].error_message = error_message
        }
      }, this)
    },

    // attributeごとにバリデーション
    Validation(attribute, value) {
      switch (attribute){
        case 'first_name':
        case 'last_name':
          return this.nameValidate(value);
          break;
        case 'email':
          return this.emailValidate(value);
          break;
        case 'password':
          return this.passwordValidate(value);
          break;
        case 'password_confirmation':
          return this.passwordConfirmationValidate(value);
          break;
        default:
          return true;
      }
    },

    emailValidate(email) {
      if (!email) {
        return '入力してください';
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(email)) {
        return '正しく入力してください';
      }
      return true
    },
    nameValidate(name) {
      if (!name) {
        return '入力してください';
      }
      if (name.length > 20) {
        return '20文字以内で入力してください';
      }
      return true
    },

    passwordValidate(password) {
      if (!password) {
        return '入力してください';
      }
      if (password.length < 4) {
        return '4文字以上で入力してください';
      }
      if (password !== this.form_attributes.password_confirmation.value) {
        return 'パスワードとパスワード（確認）が違います'
      }
      return true
    },

    passwordConfirmationValidate(password_confirmation) {
      if (!password_confirmation) {
        return '入力してください';
      }
      return true
    }

  },
}
export default registerMain