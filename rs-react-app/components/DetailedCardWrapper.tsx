'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { DetailedCard } from './DetailedCard';
import { Flayout } from './Flayout';
import { useSelector } from 'react-redux';
import { selectAllChecks } from '../features/check';

export const DetailedCardWrapper: FC = () => {
  const pathname = usePathname();
  const isDetailsPage = pathname.startsWith('/details/');

  return isDetailsPage ? <DetailedCard /> : null;
};

export const FlayoutWrapper: FC = () => {
  const checkedItems = useSelector(selectAllChecks);
  return checkedItems.length > 0 ? <Flayout /> : null;
};
