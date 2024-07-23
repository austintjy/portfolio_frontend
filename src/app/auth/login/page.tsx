"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import Button from "@/components/form/Button";
import toast from "react-hot-toast";
import CustomErrorToast from "@/components/common/custom-error-toast";
import { Suspense, useEffect } from "react";

function LoginPartial() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const sessionTimeout = searchParams?.get("sessionTimeout");
  const router = useRouter();


  useEffect(() => {
    if (sessionTimeout !== null)
      toast.custom((t) => (
        <CustomErrorToast t={t} title={'Session expired'} message={`Your login session has expired and you have been automatically logged out.`} detail={`Please log in again`} />
      ), { "id": 'sessionTimeout', "duration": 5000 });
  }, [sessionTimeout]);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema)
  });

  const performSubmit = async (formData: any) => {
    const email = formData.email;
    const password = formData.password;
    const signin = signIn("credentials", {
      redirect: false, // Don't redirect on sign-in, handle it manually
      email,
      password,
      callbackUrl,
    });
    const toastId = toast.loading('Logging in...');

    const result = await signin;
    if (result && result.ok) {
      // Redirect to the desired page after successful sign-in
      toast.success('Logged in successfully', {
        id: toastId,
      });
      router.push(callbackUrl);
    }
    else {
      toast.custom((t) => (
        <CustomErrorToast t={t} title={'Login Failed'} message={``} detail={``} />
      ), { "id": toastId, "duration": 5000 });
    }
  };

  return (
    <main className="min-h-dvh h-dvh flex items-center justify-center text-gray-500 text-sm ">
      <form
        className="bg-white shadow-lg rounded-md p-10 md:p-10 flex flex-col w-11/12 max-w-lg group"
        noValidate
        onSubmit={handleSubmit((d) => performSubmit(d))}
      >
        <div className="flex flex-col mx-auto text-center" >
          <Image height={200} width={250} src={'/logo.png'} className={"bg-gray-700 p-4"} alt="company logo" />
          <span className="font-semibold text-gray-700 text-lg mt-4">Account sign in</span>
        </div>
        <EmailInput errors={formState.errors.email} registerFunc={register} />
        <PasswordInput errors={formState.errors.password} registerFunc={register} />
        <Button type="submit" className="w-3/4 mx-auto"> Sign in</Button>
      </form>
    </main>

  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPartial />
    </Suspense>
  )
}