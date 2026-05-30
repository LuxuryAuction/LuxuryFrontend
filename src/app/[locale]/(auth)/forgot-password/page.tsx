"use client";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { Link, useRouter } from "@/src/i18n/navigation";
import { useState } from "react";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";
import { useToast } from "@/src/components/ui/Toast";
import { BrandLogo } from "@/src/components/common/BrandLogo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("success", "Password reset link sent to your email.", "bottom-right");
    // setTimeout(() => router.push("/login"), 2000); // Optional auto-redirect
  };

  return (
    <div className="h-dvh flex overflow-hidden bg-auth-primary justify-center">
      {/* LEFT */}
      <AuthSidePanel 
        title={<>Recover <br /><span className="text-brand-primary">Access.</span></>}
      />

      {/* RIGHT */}
      <div className="w-full lg:w-[520px] flex items-center justify-center px-6 lg:px-10 h-full overflow-hidden">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center gap-[0.7rem] mb-6">
            <button type="button" onClick={() => router.push("/")} className="cursor-pointer">
              <BrandLogo size="sm" />
            </button>
          </div>

          <div className="text-[1.8rem] font-bold text-white mb-2">
            Forgot Password
          </div>
          <div className="text-xs text-content-tertiary mb-6 leading-normal">
            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
          </div>

          <div className="flex flex-col space-y-4">
            <Input 
              type="email" 
              label="Email Address" 
              inputSize="xs" 
              placeholder="you@example.com" 
              value={email}
              onChange={setEmail}
              required 
            />

            <Button variant="primary" size="sm" textSize="xs" type="submit" fullWidth>
              Send Reset Link
            </Button>
          </div>

          <div className="flex flex-row gap-0.5 justify-center text-[0.75rem] text-content-tertiary mt-6">
            <p>Remember your password?</p>
            <Link className="text-brand-primary font-semibold hover:underline hover:underline-offset-2" href="/login">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
