"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { addProductToCart } from "@/actions/cart.actions";
import { removeProductFromWishlist } from "@/actions/wishlist.actions";

type RemoveWishlistItemButtonProps = {
  productId: string;
};

export function RemoveWishlistItemButton({
  productId,
}: RemoveWishlistItemButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const result = await removeProductFromWishlist(productId);

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

type MoveWishlistToCartButtonProps = {
  productId: string;
};

export function MoveWishlistToCartButton({
  productId,
}: MoveWishlistToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleMove() {
    startTransition(async () => {
      const result = await addProductToCart(productId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Added to cart");
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleMove}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
    >
      Add to cart
    </button>
  );
}