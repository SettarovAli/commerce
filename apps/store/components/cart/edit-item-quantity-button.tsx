'use client';

import clsx from 'clsx';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';

import { updateCartItemQuantityAction } from '@/actions/cart/update-cart-item-quantity';
import type { CartItem } from 'lib/shopify/types';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: any;
}) {
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };

  const { execute: updateCartItemQuantity, result } = useAction(updateCartItemQuantityAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    }
  });

  const action = () => {
    optimisticUpdate(payload.merchandiseId, type);
    updateCartItemQuantity(payload);
  };

  return (
    <form action={action}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {result?.serverError}
      </p>
    </form>
  );
}
