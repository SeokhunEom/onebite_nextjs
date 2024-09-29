"use client";

import { useActionState, useEffect, useRef } from "react";

import deleteReviewAction from "@/actions/delete-review.action";

function ReviewItemDeleteButton({
  bookId,
  reviewId,
}: {
  bookId: number;
  reviewId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>삭제 중 ...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}

export default ReviewItemDeleteButton;
