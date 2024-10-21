import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<Props>> = (props) => {
  const { isOpen, onClose, children } = props;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4">
        <Dialog.Panel className="relative max-w-lg border bg-white p-8 sm:min-w-[600px] dark:border-neutral-500 dark:bg-neutral-800">
          {children}
          <button onClick={onClose} className="absolute right-1 top-1 m-0 hover:opacity-70">
            <XMarkIcon className="h-6" />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
