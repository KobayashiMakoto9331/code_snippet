import { mapActions } from "vuex";

const headerComp = {
  template:
    `
      <div class="comp-header">
        <div class="lay-header">
          <div class="lay-header-left">
            <h2 class="obj-header-title">
              <router-link :to="{ name: 'snippets'}">Code Snippet</router-link></h2>
          </div>
          <div class="lay-header-right">
            <ul>
              <li>山田 太郎</li>
              <router-link :to="{ name: 'languages'}"><li class="obj-link-item">言語</li></router-link>
              <router-link :to="{ name: 'password_change'}"><li class="obj-link-item">パスワード変更</li></router-link>
              <a><li class="obj-link-item" @click="logout">ログアウト</li></a>
            </ul>
          </div>
        </div>
      </div>
    `,
  methods: {
    ...mapActions([
      `logoutUser`
    ]),

    logout(){
      // ログアウト
      this.logoutUser();
      // 画面遷移
      this.$router.push({ name: 'login' })
    },
  }
}

export default headerComp