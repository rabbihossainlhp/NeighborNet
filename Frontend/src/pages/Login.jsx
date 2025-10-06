import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Sparkles, Mail, Lock, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email');
    if (!formData.password) return toast.error('Password is required');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(formData);
    if (result.success) { 
      toast.success('Welcome back'); 
      navigate('/'); 
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 order-2 lg:order-1 hover:shadow-2xl transform hover:-translate-y-1 transition duration-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to your secure account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 transition-all focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 transition-all focus:ring-blue-200"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:scale-[1.01] focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in to your account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Branding */}
        <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SecureChat
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Your secure communities await
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Access your private conversations and real-time chats with end-to-end encryption.
          </p>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Real-time messaging</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Private communities</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>End-to-end encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;