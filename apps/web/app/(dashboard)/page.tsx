"use client";

import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
} from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh flex-col">
          <p className="font-sans text-2xl">apps/web</p>
          <UserButton />
          <OrganizationSwitcher hidePersonal />
          <Button
            onClick={() => {
              addUser();
            }}
          >
            Add
          </Button>
          <div>
            {users ? (
              users.map((user) => (
                <p className="text-xl font-sans text-blue-700" key={user._id}>
                  {user.name}
                </p>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in</p>
        <SignInButton>Sign in</SignInButton>
      </Unauthenticated>
    </>
  );
}
