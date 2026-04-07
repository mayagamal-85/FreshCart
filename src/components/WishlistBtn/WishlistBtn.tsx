"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { addProductToWishlist } from "@/actions/wishlist.actions";

type WishlistBtnProps = {
  productId: string;
};

export default function WishlistBtn({ productId }: WishlistBtnProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAddWishlist() {
    startTransition(async () => {
      const result = await addProductToWishlist(productId);

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
      onClick={handleAddWishlist}
      disabled={isPending}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-green-600 hover:text-green-600 disabled:opacity-60"
    >
      <Heart className="h-4 w-4" />
    </button>
  );
}