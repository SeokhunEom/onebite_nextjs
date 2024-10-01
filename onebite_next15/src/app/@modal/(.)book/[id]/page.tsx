import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

function Page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}

export default Page;
