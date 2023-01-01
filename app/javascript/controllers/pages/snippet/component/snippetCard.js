import marked from "marked";

const snippetCard = {
  props: ['snippet'],
  template:
    `
      <div class="comp-snippet-card" :id="snippet.id">
        <!--タイトル-->
        <p class="obj-snippet-title">【{{ snippet.language }}】{{ snippet.title }}</p>
        <!--コンテンツ-->
        <div class="obj-snippet-contents"
             v-html="snippet.contents"></div>
        <!--ボタン-->
        <div class="lay-snippet-option">
          <div class="lay-snippet-card-btn">
            <a class="obj-snippet-card-edit blue-btn"
               @click="$emit('handle-show-snippet-edit-modal')">
              編集</a>
            <a class="obj-snippet-card-delete red-btn"
               @click="$emit('handle-show-delete-confirm-modal')">
              削除</a>
          </div>
  
          <a class="obj-snippet-card-top"
             @click="$emit('scroll-to-top')">トップに戻る</a>
        </div>
      </div>
    `,
  data() {
    return {}
  },
  components: {},

  created() {

  },

  methods: {
  }
}

export default snippetCard