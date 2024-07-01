import Button from '@/components/button';
import Input from '@/components/input';
import { updateUserEmail } from '@/lib/firebase/auth/email';
import { User } from 'firebase/auth';
import { useState } from 'react';

type UpdateEmailFormProps = {
  user: User;
};

const UpdateEmailForm: React.FC<UpdateEmailFormProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email as string);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input label="Current Email address" name="email" value={email} onChange={setEmail} />
      </div>
      <div>
        <Input label="New Email address" name="email" value={newEmail} onChange={setNewEmail} />
      </div>
      <div>
        <Input label="Password" name="password" value={password} onChange={setPassword} />
      </div>
      <div>
        <Button
          type="button"
          onClick={() => {
            updateUserEmail(email, newEmail, password, setIsLoading);
          }}
          disabled={isLoading}
        >
          Update Email
        </Button>
      </div>
    </div>
  );
};

export default UpdateEmailForm;
