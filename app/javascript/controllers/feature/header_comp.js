const headerComp = {
  template:
    `
      <div class="comp-header">
        <div class="lay-header">
          <div class="lay-header-left">
            <h2 class="obj-header-title">Code Snippet</h2>
          </div>
          <div class="lay-header-right">
            <ul>
              <li>小林 誠</li>
<!--              <router-link :to="{ name: 'languageMain'}"><li>言語</li></router-link>-->
              <li>言語</li>
              <li>パスワード変更</li>
              <li>ログアウト</li>
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