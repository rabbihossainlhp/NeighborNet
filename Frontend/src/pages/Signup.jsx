import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Mail, User, Lock, Shield, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const rules = {
    length: formData.password.length >= 8,
    upperLower: /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    symbol: /[^A-Za-z0-9]/.test(formData.password),
  };

  const validateForm = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email format';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the errors');
      return;
    }
    const result = await signup(formData);
    if (result.success) {
      toast.success('Welcome — account created');
      navigate('/login');
    } else {
      toast.error(result.message || 'Signup failed');
    }
  };

  const PasswordRule = ({ met, children }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={met ? 'text-green-600' : 'text-gray-500'}>{children}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SecureChat
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Join thousands of secure conversations
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Create your account and start connecting with private, encrypted communities in seconds.
          </p>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>Private by default</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
  <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transform hover:-translate-y-1 transition duration-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="text-gray-500 mt-2">Start your secure journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 transition-all ${
                    errors.fullName 
                      ? 'border-red-300 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 transition-all ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
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
              
              {/* Password Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-4 bg-gray-50 rounded-lg">
                <PasswordRule met={rules.length}>At least 8 characters</PasswordRule>
                <PasswordRule met={rules.upperLower}>Upper & lowercase letters</PasswordRule>
                <PasswordRule met={rules.number}>At least one number</PasswordRule>
                <PasswordRule met={rules.symbol}>At least one symbol</PasswordRule>
              </div>
              
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:scale-[1.01] focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;