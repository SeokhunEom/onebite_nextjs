interface PageProps {
  searchParams: {
    q?: string;
  };
}

function Page({ searchParams }: PageProps) {
  return <div>{searchParams.q} 검색 결과</div>;
}

export default Page;
