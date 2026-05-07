"use client";

import { TelegramIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/components/ui/Toast";
import { useState } from "react";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";

const Login = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    showToast("success", "Welcome back! You have successfully signed in.", "bottom-right");
    router.push("/user/profile");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <div className="h-dvh flex overflow-hidden bg-auth-primary justify-center">

      {/* LEFT */}
      <AuthSidePanel 
        title={<>Welcome <br /><span className="text-brand-primary">Back.</span></>}
        subtitle="Continue bidding in real-time auctions with your account."
      />

      {/* RIGHT */}
      <div className="w-full lg:w-[520px] flex items-center justify-center px-6 lg:px-10 h-full overflow-hidden">

        <form className="w-full" onSubmit={handleSubmit}>

          <div className="flex items-center gap-[0.7rem] mb-6">
            <div className="w-[32px] h-[32px] bg-brand-primary rounded-md flex items-center justify-center font-extrabold">
              B
            </div>
            <span className="text-md text-white font-bold">
              Luxury<span className="text-brand-primary">Auction</span>
            </span>
          </div>

          <div className="text-[1.8rem] font-bold text-white">
            Sign in
          </div>

          <div className="text-xs text-content-tertiary mb-6">
            Access your auctions and continue bidding.
          </div>

          <div className="flex flex-col space-y-4">

            <Input
              type="email"
              label="Email Address"
              inputSize="xs"
              placeholder="you@example.com"
              required
            />

            <Input
              type="password"
              label="Password"
              inputSize="xs"
              placeholder="password"
              required
            />

            <Button
              variant="primary"
              size="sm"
              textSize="xs"
              type="submit"
              fullWidth
            >
              Sign In
            </Button>

          </div>

          <div className="flex items-center gap-4 my-6 text-[0.65rem] text-content-tertiary font-mono">
            <div className="flex-1 h-px bg-border-primary" />
            or continue with
            <div className="flex-1 h-px bg-border-primary" />
          </div>

          <Button
            variant="secondary"
            className="text-white"
            size="sm"
            textSize="xs"
            leftIcon={<TelegramIcon className="w-3 h-3" />}
            fullWidth
          >
            Telegram
          </Button>

          <div className="flex flex-row gap-0.5 justify-center text-[0.75rem] text-content-tertiary mt-4">
            <p>Don’t have an account?</p>
            <a
              className="text-brand-primary font-semibold hover:underline hover:underline-offset-2"
              href="/register"
            >
              Create one
            </a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;