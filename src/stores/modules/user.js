import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

// user module
export const useUserStore = defineStore(
  'mes-User',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      console.log(res.data.data)
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
