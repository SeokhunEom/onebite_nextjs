import Modal from "@/components/Modal";
import MoviePage from "@/app/movie/[id]/page";

function Page(props: any) {
  return (
    <Modal>
      <MoviePage {...props} />
    </Modal>
  );
}

export default Page;
