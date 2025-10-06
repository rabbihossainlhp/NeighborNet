import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,

    checkAuth: async()=>{
        try{
            const res = await axiosInstance.get("/profile/check");
            set({authUser:res.data});
        }catch(err){
            console.log("error in check_auth function "+err);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },



    signup: async(data)=>{
        set({isSigningUp:true});
        try{
            const payload = {
                fullname: data.fullName || data.fullname,
                email: data.email,
                password: data.password
            };
            const res = await axiosInstance.post('/auth/signup', payload);
            // expect res.data.user
            set({authUser: res.data.user, isSigningUp:false});
            return { success: true, data: res.data };
        }catch(err){
            console.error('signup error', err);
            set({isSigningUp:false});
            const message = err?.response?.data?.message || err.message || 'Signup failed';
            return { success:false, message };
        }
    },

    login: async(credentials)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post('/auth/login', credentials);
            set({authUser: res.data.user, isLoggingIn:false});
            return { success:true, data: res.data };
        }catch(err){
            console.error('login error', err);
            set({isLoggingIn:false});
            const message = err?.response?.data?.message || err.message || 'Login failed';
            return { success:false, message };
        }
    },

    logout: async()=>{
        try{
            await axiosInstance.post('/auth/logout');
        }catch(err){
            console.warn('logout request failed', err);
        }finally{
            set({authUser:null});
        }
    }

}))