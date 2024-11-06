import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb';
import { BreadcrumbsList } from '@/modules/layout/components/breadcrumbs/breadcrumbs-list';
import { Routes } from 'routes';

const Breadcrumbs = () => {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={Routes.Home}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbsList />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Breadcrumbs };
