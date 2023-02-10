import { createStore } from 'vuex'
import Axios from "../plugins/axios";

const store = createStore({
  state () {
    authUser: null
  },
  getters: {
    authUser: state => state.authUser
  },
  mutations: {
    // 認証済みユーザー情報をセット
    setAuthUser (state, AuthUser) {
      state.authUser = AuthUser
    }
  },
  actions: {
    // ログイン
    async loginUser (context, params) {
      const sessionsResponse = await Axios.post('login', {login_params: params});
      // ローカルストレージにtokenを埋める
      localStorage.setItem('token', sessionsResponse.data.token);
      // リクエストのヘッダーにtokenを埋める
      Axios.defaults.headers.common['Authorization'] = `Bearer ${sessionsResponse.data.token}`;
      // 認証済みユーザーを取得する
      const AuthUserResponse = await Axios.get('fetch_auth_user');
      const AuthUser = AuthUserResponse.data
      // mutationを呼び出す
      context.commit('setAuthUser', AuthUser)
    },

    // 認証済みユーザー情報を取得する
    async fetchAuthUser({ commit, state }) {
      // ローカルストレージにトークンがない場合は処理終了
      if (!localStorage.token) return null

      // storeに認証済みユーザーがある場合はそれを返却
      if (state.authUser) return state.authUser

      // ない場合は取得する（リロード対策）
      const AuthUserResponse = await Axios.get('fetch_auth_user')

      // 取得できない場合は処理終了
      if (!AuthUserResponse.data) return null

      // 取得できたらstoreに保存する
      const AuthUser = AuthUserResponse.data
      if (AuthUser) {
        commit('setAuthUser', AuthUser)
        return AuthUser
      } else {
        commit('setAuthUser', null)
        return null
      }
    },

    // ログアウト
    logoutUser(context){
      // ローカルストレージのトークンを削除する
      localStorage.removeItem('token')
      // ヘッダーのトークンを削除する
      Axios.defaults.headers.common['Authorization'] = '';
      // storeの認証済みユーザーを削除する
      context.commit('setAuthUser', null)
    },

  }
})

export default store