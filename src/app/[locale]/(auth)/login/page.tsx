"use client";

import { TelegramIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { Link, useRouter } from "@/src/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/src/schemas/auth.schema";
import { useToast } from "@/src/components/ui/Toast";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";
import { useAuth } from "@/src/hooks/useAuth";
import { BrandLogo } from "@/src/components/common/BrandLogo";

const Login = () => {
  const { showToast } = useToast();
  const { control, handleSubmit: hookFormSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userNameOrEmail: "",
      password: "",
    },
  });
  const { login, isLoading } = useAuth();


  const router = useRouter();

  const handleSignIn = async (values: LoginSchema) => {
    try {
      await login({
        userNameOrEmail: values.userNameOrEmail,
        password: values.password,
      });
      showToast("success", "Welcome back! You have successfully signed in.", "bottom-right");
      router.push("/user/categories");
    } catch (err: any) {
      showToast("error", err.message || "Failed to sign in. Please try again.", "bottom-right");
    }
  };

  return (
    <div className="h-dvh flex overflow-hidden bg-auth-primary justify-center">

      {/* LEFT */}
      <AuthSidePanel
        title={<>Welcome <br /><span className="text-brand-primary">Back.</span></>}
      />

      {/* RIGHT */}
      <div className="w-full lg:w-[520px] flex items-center justify-center px-6 lg:px-10 h-full overflow-hidden">

        <form className="w-full" onSubmit={hookFormSubmit(handleSignIn)}>

          <div className="flex items-center gap-[0.7rem] mb-6">
            <BrandLogo size="sm" />
          </div>

          <div className="text-[1.8rem] font-bold text-white">
            Sign in
          </div>

          <div className="text-xs text-content-tertiary mb-6">
            Access your auctions and continue bidding.
          </div>

          <div className="flex flex-col space-y-4">

            <Controller
              name="userNameOrEmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  label="Email Address or Username"
                  inputSize="xs"
                  placeholder="you@example.com"
                  value={value}
                  onChange={onChange}
                  error={errors.userNameOrEmail?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  label="Password"
                  inputSize="xs"
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              variant="primary"
              size="sm"
              textSize="xs"
              type="submit"
              fullWidth
              disabled={isLoading}
              loadingText="Signing In..."
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
            <Link
              className="text-brand-primary font-semibold hover:underline hover:underline-offset-2"
              href="/register"
            >
              Create one
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;