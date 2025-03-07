import React from 'react';
import { Header } from '../../../components/Header';
import { Main } from '../../../components/Main';

interface PageProps {
  searchParams: {
    name?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { name, page } = await searchParams;
  return (
    <>
      <Header />
      <Main name={name} page={page} />
    </>
  );
}
