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
        
    }
}))