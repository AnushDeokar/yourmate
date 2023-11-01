"use client";

import React from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

export function SignInComponent(): React.ReactNode {
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
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="*************" />
      </div>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </CardContent>
  );
}