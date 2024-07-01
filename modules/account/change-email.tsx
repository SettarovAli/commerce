'use client';

import Button from '@/components/button';
import Modal from '@/components/modal';
import UpdateEmailForm from '@/modules/account/update-email-form';
import { User } from 'firebase/auth';
import React, { useState } from 'react';

type ChangeEmailProps = {
  user: User;
};

const ChangeEmail: React.FC<ChangeEmailProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b  pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">Email</h2>
          <p className="mt-1 text-sm leading-6">Update your email address</p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <div className="mt-4 w-1/2">
              <Button type="button" onClick={() => setIsOpen(true)}>
                Update Email
              </Button>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <UpdateEmailForm user={user} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
