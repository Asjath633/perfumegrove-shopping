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

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, user } = useAuth();
  
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setLocalError("Please fill in all required fields (Name, Email, Phone, and Password)");
      return false;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return false;
    }

    if (!acceptedTerms) {
      setLocalError("Please accept the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      });
      navigate("/");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Attractive Local Product Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/products/Attar/Midnight oud.png")',
          filter: 'blur(8px) brightness(0.3)'
        }}
      ></div>
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-richblack/40 via-transparent to-richblack/60"></div>

      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gold/20 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="text-4xl font-light tracking-[0.2em] text-richblack hover:text-gold transition-all duration-500 block mb-2">
            ZANDRO
          </Link>
          <div className="h-0.5 w-12 bg-gold mx-auto mb-6"></div>
          <p className="text-warmgray font-medium uppercase tracking-widest text-xs">Create your account</p>
        </div>

        {/* Error Alert */}
        {(error || localError) && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || localError}</AlertDescription>
          </Alert>
        )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number *
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-11 pl-10"
                />
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-base font-medium">
                Address (Optional)
              </Label>
              <textarea
                id="address"
                name="address"
                placeholder="123 Main St, City, State"
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                rows={3}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Password *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="h-11"
              />
              <p className="text-xs text-warmgray mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base font-medium">
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-1 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-warmgray cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-darkolive font-medium hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-darkolive font-medium hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-darkolive hover:bg-opacity-90 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-warmgray opacity-50"></div>
            <span className="text-warmgray text-sm">Already have an account?</span>
            <div className="flex-1 h-px bg-warmgray opacity-50"></div>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-semibold border-2 border-darkolive text-darkolive hover:bg-darkolive hover:text-white"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
  );
};

export default Signup;
