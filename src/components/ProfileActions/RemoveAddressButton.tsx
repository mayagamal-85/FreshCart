"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { removeAddress } from "@/actions/account.actions";

type RemoveAddressButtonProps = {
  addressId: string;
};

export default function RemoveAddressButton({
  addressId,
}: RemoveAddressButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const result = await removeAddress(addressId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleRemove}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}