"use client";

import React, { useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface formDataProps {
  email: string;
  password: string;
}

export function SignInComponent(): React.ReactNode {
  const router = useRouter();
  const [formData, setFormdata] = useState<formDataProps>({
    email: "",
    password: "",
  });
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const handleSubmit: any = async (e: any) => {
    e.preventDefault();
    await signIn
      .create({
        identifier: formData.email,
        password: formData.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          toast.success("Successfully signed in!");
          // eslint-disable-next-line
          setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        toast.error("Invalid Credentials");
        console.error("error", err.errors[0].longMessage);
      });
  };

  return (
    <CardContent className="grid gap-4">
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormdata({ ...formData, email: e.target.value });
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="*************"
          value={formData.password}
          onChange={(e) => {
            setFormdata({ ...formData, password: e.target.value });
          }}
        />
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Sign In
      </Button>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            aria-label="Sign in"
            href="/signup"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </CardContent>
  );
}
