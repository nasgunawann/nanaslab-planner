"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { toast } from "sonner";
import { IconClipboard } from "@tabler/icons-react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // loading states per step
  const [requesting, setRequesting] = useState(false);
  const [validating, setValidating] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Step 1: request token
  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequesting(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal membuat token");
        return;
      }

      toast.success(
        <div className="flex items-center gap-2">
          <span>Token reset:</span>
          <code className="px-1 py-0.5 rounded bg-muted text-xs">
            {data.token}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(data.token);
              toast.success("Token copied to clipboard!");
            }}
            className="underline text-xs text-blue-500 hover:text-blue-700"
          >
            <IconClipboard size={14} />
          </button>
        </div>
      );
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setRequesting(false);
    }
  };

  // Step 2: validate token
  const handleValidateToken = async () => {
    if (!token) {
      toast.error("Masukkan token terlebih dahulu");
      return;
    }
    setValidating(true);
    try {
      const res = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Token tidak valid");
        return;
      }

      setValidated(true);
      toast.success("Token valid, silakan buat password baru");
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setValidating(false);
    }
  };

  // Step 3: reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Password tidak sama");
      return;
    }
    setResetting(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal reset password");
        return;
      }

      toast.success("Password berhasil direset, silakan login");
      router.push("/login");
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header brand */}
      <div className="flex flex-col items-center gap-2">
        <a href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Nanasgunung Content Planner</span>
        </a>
        <h1 className="text-xl font-bold">Forgot your password?</h1>
        <div className="text-center text-sm">
          Remembered your password?{" "}
          <a href="/login" className="underline underline-offset-4">
            Log in
          </a>
        </div>
      </div>

      {/* Step 1: Email */}
      <form onSubmit={handleRequestToken} className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={requesting}>
          {requesting ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner variant="circle-filled" size="sm" />
              Sending...
            </div>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      {/* Step 2: Token */}
      <div className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="token">Token</Label>
          <Input
            id="token"
            type="text"
            placeholder="Paste token here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <Button
          type="button"
          className="w-full"
          onClick={handleValidateToken}
          disabled={!token || validating}
        >
          {validating ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner variant="circle-filled" size="sm" />
              Validating...
            </div>
          ) : (
            "Validate Token"
          )}
        </Button>
      </div>

      {/* Step 3: Reset Password */}
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!validated}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={!validated}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!validated || resetting}
        >
          {resetting ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner variant="circle-filled" size="sm" />
              Resetting...
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs text-balance mt-4">
        By requesting reset, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
