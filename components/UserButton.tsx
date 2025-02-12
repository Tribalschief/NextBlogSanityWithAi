import { UserButton } from "@clerk/nextjs";

export const UserProfile = () => (
  <div className="flex items-center gap-4">
    <UserButton afterSignOutUrl="/" />
  </div>
);