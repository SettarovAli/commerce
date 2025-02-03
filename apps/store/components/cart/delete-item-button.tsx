'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';

import { deleteCartItemAction } from '@/actions/cart/delete-cart-item';
import type { CartItem } from '@/lib/shopify/types';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const merchandiseId = item.merchandise.id;

  const { execute: deleteCartItem, result } = useAction(deleteCartItemAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    }
  });

  const action = () => {
    console.log('merchandiseId', merchandiseId);
    optimisticUpdate(merchandiseId, 'delete');
    deleteCartItem({ merchandiseId });
  };

  return (
    <form action={action}>
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {result?.serverError}
      </p>
    </form>
  );
}
