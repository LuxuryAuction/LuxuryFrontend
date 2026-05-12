"use client"
import { TelegramIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { Link, useRouter } from "@/src/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/src/schemas/auth.schema";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";
import { useAuth } from "@/src/hooks/useAuth";
import { useToast } from "@/src/components/ui/Toast";


const Register = () => {
  const { control, handleSubmit: hookFormSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const { register, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSignUp = async (values: RegisterSchema) => {
    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        userName: values.userName,
        password: values.password,
        phoneNumber: values.phoneNumber,
      });
      showToast("success", "Account created successfully! Please sign in.", "bottom-right");
      router.push("/login");
    } catch (err: any) {
      showToast("error", err.message || "Failed to create account. Please try again.", "bottom-right");
    }
  };


  return (
    <div className="h-dvh flex overflow-hidden bg-auth-primary justify-center">
      {/* LEFT */}
      <AuthSidePanel
        title={<>Bid. Win. <br /><span className="text-brand-primary">Own.</span></>}
      />

      {/* RIGHT */}
      <div className="w-full lg:w-[520px] flex items-center justify-center px-6 lg:px-10 h-full overflow-hidden">
        <form className="w-full" onSubmit={hookFormSubmit(handleSignUp)}>
          <div className="flex items-center gap-[0.7rem] mb-6">
            <div className="w-[32px] h-[32px] bg-brand-primary rounded-md flex items-center justify-center font-extrabold">
              B
            </div>
            <span className="text-md text-white font-bold">
              Luxury<span className="text-brand-primary">Auction</span>
            </span>
          </div>

          <div className="text-[1.8rem] font-bold text-white">
            Create account
          </div>
          <div className="text-xs text-content-tertiary mb-4 leading-normal">
            Free to join. Start bidding in minutes.
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-row gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="text" label="First Name" inputSize="xs" placeholder="Alex" value={value} onChange={onChange} error={errors.firstName?.message} />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="text" label="Last Name" inputSize="xs" placeholder="Kovalenko" value={value} onChange={onChange} error={errors.lastName?.message} />
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input type="email" label="Email Address" inputSize="xs" placeholder="you@example.com" value={value} onChange={onChange} error={errors.email?.message} />
              )}
            />

            <div className="flex flex-row gap-4">
              <Controller
                name="userName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="text" label="Username" inputSize="xs" placeholder="alex_bids" value={value} onChange={onChange} error={errors.userName?.message} />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="text" label="Phone Number" inputSize="xs" placeholder="+380991234567" value={value} onChange={onChange} error={errors.phoneNumber?.message} />
                )}
              />
            </div>

            <div className="flex flex-row gap-4">
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="password" label="Password" inputSize="xs" placeholder="password" value={value} onChange={onChange} error={errors.password?.message} />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input type="password" label="Confirm Password" inputSize="xs" placeholder="password" value={value} onChange={onChange} error={errors.confirmPassword?.message} />
                )}
              />
            </div>
            <Button variant="primary" size="sm" textSize="xs" type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

          </div>

          <div className="flex items-center gap-4 my-6 text-[0.65rem] text-content-tertiary font-mono">
            <div className="flex-1 h-px bg-border-primary" />
            or continue with
            <div className="flex-1 h-px bg-border-primary" />
          </div>
          <Button variant="secondary" className="text-white" size="sm" textSize="xs" leftIcon={<TelegramIcon className="w-3 h-3" />} fullWidth>Telegram</Button>

          <div className="flex flex-row gap-0.5 justify-center text-[0.75rem] text-content-tertiary mt-3">
            <p>Already have an account?</p>
            <Link className="text-brand-primary font-semibold hover:underline hover:underline-offset-2" href="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

