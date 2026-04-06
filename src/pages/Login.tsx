import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Phone } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, user } = useAuth();
  const supportPhone = "+91 98420 83220";

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Attractive Local Product Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-out scale-110"
        style={{ 
          backgroundImage: 'url("/products/Attar/Midnight oud.png")',
          filter: 'blur(8px) brightness(0.3)'
        }}
      ></div>
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-richblack/40 via-transparent to-richblack/60"></div>

      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-gold/20 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="block mb-6 transition-opacity hover:opacity-80">
            <img src="/zandro_logo.png" alt="ZANDRO" className="h-14 mx-auto" />
          </Link>
          <p className="text-warmgray font-medium uppercase tracking-widest text-xs">Sign in to your account</p>
        </div>

        {/* Error Alert */}
        {(error || localError) && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || localError}</AlertDescription>
          </Alert>
        )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="h-12"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="h-12"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-darkolive hover:bg-opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-warmgray opacity-50"></div>
            <span className="text-warmgray text-sm">Don't have an account?</span>
            <div className="flex-1 h-px bg-warmgray opacity-50"></div>
          </div>

          {/* Signup Link */}
          <Link to="/signup">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-semibold border-2 border-darkolive text-darkolive hover:bg-darkolive hover:text-white"
            >
              Create Account
            </Button>
          </Link>

          {/* Forgot Password Link */}
        </div>
      </div>
  );
};

export default Login;
