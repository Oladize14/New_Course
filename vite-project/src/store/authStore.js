import { create } from 'zustand'
import axios from 'axios'

const api_url = 'http://localhost:3000/auth'

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth:true,

    signup: async(username, password, name) => {
        set({isLoading:true, error:null})
        try {
           const res =  await axios.post(`${api_url}/signup`, {username, password, name})
            set({user:res.data.user, isAuthenticated:true, isLoading:false})
        } catch (error) {
            set({error:error.res?.data?.message || "error siging up", isLoading: false })
            throw error
            
        }
    },

    login: async(username, password) => {
        set({isLoading:true, error:null})
        try {
            const res = await axios.post(`${api_url}/login`, {username, password})
            set({user:res.data.user,error:null, isLoading:false })
        } catch (error) {
            set({error:error.res?.data?.message || "wrong credentials", isLoading: false })
            throw error
        }
    },

    logout: async() => {
        set({isLoading:true, error:null})
        try {
            await axios.post(`${api_url}/logout`)
            set({user:null, isAuthenticated:false, error:null, isLoading:false})
        } catch (error) {
            set({error: "error logging out", isLoading:false})
            throw error
        }
    }

}))