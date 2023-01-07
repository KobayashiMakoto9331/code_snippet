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
              <li>小林 誠</li>
              <router-link :to="{ name: 'languages'}"><li class="obj-link-item">言語</li></router-link>
              <router-link :to="{ name: 'password_change'}"><li class="obj-link-item">パスワード変更</li></router-link>
              <a href="#"><li class="obj-link-item">ログアウト</li></a>
            </ul>
          </div>
        </div>
      </div>
    `,
  data() {
    return {}
  },
  components: {},

  created() {

  },

  methods: {}
}

export default headerComp