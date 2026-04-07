"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { addProductToCart } from "@/actions/cart.actions";

type AddBtnProps = {
  productId: string;
};

export default function AddBtn({ productId }: AddBtnProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      const result = await addProductToCart(productId);

      if (!result.auth) {
        toast.error(result.message);
        router.push("/login");
        return;
      }

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
      onClick={handleAdd}
      disabled={isPending}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700 disabled:opacity-60"
    >
      <ShoppingBag className="h-4 w-4" />
    </button>
  );
}