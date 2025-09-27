// app/settings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SettingsForm from "./settings-form";
import { Toaster } from "sonner";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <>
        <Toaster richColors closeButton />
        <div className="p-6">Unauthorized</div>
      </>
    );
  }

  const user = {
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "/uploads/default.png",
  };

  return (
    <>
      <SettingsForm user={user} />
    </>
  );
}
