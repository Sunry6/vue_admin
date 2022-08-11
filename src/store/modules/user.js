import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

/**
 * 处理所有和用户相关的事情
 */

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then(res => {
            console.log(res)
            this.commit('user/setToken', res.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
