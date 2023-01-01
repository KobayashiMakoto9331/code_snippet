import SnippetCard from "./snippetCard";
import Draggable from "vuedraggable";

const rightComp = {
  props: ['snippets'],
  template:
    `
      <!--スニペットリスト-->
      <div class="snippet-right">
      <!--スニペット新規作成-->
      <div class="lay-search-snippet">
        <div class="lay-new-snippet">
          <a class="obj-new-snippet blue-btn"
             @click="$emit('handle-show-snippet-create-modal')">Snippetを作成する
          </a>
        </div>
        <!--スニペット検索-->
        <div class="lay-snippet-search-form">
          <div class="obj-middle-title obj-snippet-search-title">
            <label for="">言語を検索</label>
          </div>
          <div class="obj-snippet-search_area">
            <input type="text"
                   placeholder="言語を入力"
                   v-model="keyword">
          </div>
        </div>
      </div>
      <!--スニペットカード一覧-->
      <div class="lay-snippet-card-list">
        <!--スニペットカード 以下を繰り返して表示する-->
        <draggable group="snippets"
                   item-key="id"
                   :list="snippets"
                   @end="$emit('save-snippet-index')">
          <template #item="{element}">
            <SnippetCard
                :snippet="element"
                @handle-show-snippet-edit-modal="$emit('handle-show-snippet-edit-modal', element)"
                @handle-show-delete-confirm-modal="$emit('handle-show-delete-confirm-modal', element.id)"
                @scroll-to-top="$emit('scroll-to-top')"
            />
          </template>
        </draggable>
      </div>

      </div>
    `,
  data() {
    return {
      keyword: '',
    }

  },
  components: {
    SnippetCard,
    Draggable,
  },

  computed: {
    // snippetのリアルタイム検索
    filterSnippet: function (){
      console.log('======-')
      // 空文字なら処理しない
      if(!this.keyword || this.keyword.trim().length === 0) {
        this.$emit('fetch-snippet');
        return;
      }
      this.$emit('filter-snippet', this.keyword)
    }
  },


  created() {

  },

  methods: {},

}

export default rightComp