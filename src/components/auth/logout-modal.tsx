'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { logOut } from "@/app/(dashboard)/dashboard/actions/logout-action";

export default function LogoutModal({
    modalOpen, setModalOpen
}: {
    modalOpen: boolean,
    setModalOpen: (arg:boolean)=> void
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const {error} = await logOut()

    if (error) {
      toast.error("Logout failed.");
    } else {
      toast.success("Logged out successfully.");
      router.push("/");
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-2">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to log out?</p>

            <div className="flex justify-end mt-6 gap-3">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
  );
}
