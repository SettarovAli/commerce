'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { breadcrumbsLabelMap } from '@/modules/layout/components/breadcrumbs/breadcrumbs-label-map';

const BreadcrumbsList = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <>
      {pathSegments.map((segment, index) => {
        const slug = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = breadcrumbsLabelMap[segment as keyof typeof breadcrumbsLabelMap] || segment;

        return (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {pathSegments.length === index + 1 ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={slug}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </>
  );
};

export { BreadcrumbsList };
