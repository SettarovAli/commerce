'use client';

import Button from 'components/button';
import Modal from 'components/modal';
import { useModal } from 'hooks/use-modal';
import DeleteUserForm from 'modules/account/delete-user-form';

const DeleteUser = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">Account</h2>
            <p className="mt-1 text-sm leading-6">Delete your account</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <div className="w-1/2">
                <Button type="button" onClick={handleOpenModal} variant="red">
                  Delete Account
                </Button>
              </div>
              <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <DeleteUserForm />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
