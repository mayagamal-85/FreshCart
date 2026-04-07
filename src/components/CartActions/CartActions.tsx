"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  clearUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";

type CartQuantityButtonsProps = {
  productId: string;
  count: number;
};

export function CartQuantityButtons({
  productId,
  count,
}: CartQuantityButtonsProps) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(newCount: number) {
    if (newCount < 1) return;

    startTransition(async () => {
      const result = await updateCartProductQuantity(productId, newCount);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  }

  return (
    <div className="flex items-center rounded-lg border border-slate-200">
      <button
        disabled={isPending}
        onClick={() => handleUpdate(count - 1)}
        className="px-3 py-2 text-sm font-semibold"
      >
        -
      </button>
      <span className="min-w-10 text-center text-sm font-medium">{count}</span>
      <button
        disabled={isPending}
        onClick={() => handleUpdate(count + 1)}
        className="px-3 py-2 text-sm font-semibold"
      >
        +
      </button>
    </div>
  );
}

type RemoveCartItemButtonProps = {
  productId: string;
};

export function RemoveCartItemButton({
  productId,
}: RemoveCartItemButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const result = await removeProductFromCart(productId);

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

export function ClearCartButton() {
  const [isPending, startTransition] = useTransition();

  function handleClear() {
    startTransition(async () => {
      const result = await clearUserCart();

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
      onClick={handleClear}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
    >
      Clear cart
    </button>
  );
}