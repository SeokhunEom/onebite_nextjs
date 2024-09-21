interface PageProps {
  params: {
    id: string;
  };
}

function Page({ params }: PageProps) {
  return <div>{params.id}번 영화</div>;
}

export default Page;
