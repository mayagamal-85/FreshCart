"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { removeAddress } from "@/actions/account.actions";

type RemoveAddressButtonProps = {
  addressId: string;
};

export default function RemoveAddressButton({
  addressId,
}: RemoveAddressButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const result = await removeAddress(addressId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleRemove}
      className="text-sm font-medium text-red-500 hover:underline"
    >
      Remove
    </button>
  );
}