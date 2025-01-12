import { useMemo } from 'react';

import { Label } from '@/components/ui/label';
import { RadioSelect } from '@/components/ui/radio-select';
import { UserRole } from '@/lib/auth/types';

const RoleSelect = () => {
  const options = useMemo(
    () => Object.values(UserRole).map((role) => ({ label: role, value: role })),
    []
  );

  return (
    <div>
      <Label title="Role" htmlFor="role" className="text-base">
        Role
      </Label>
      <RadioSelect options={options} name="role" className="mt-2" />
    </div>
  );
};

export { RoleSelect };
