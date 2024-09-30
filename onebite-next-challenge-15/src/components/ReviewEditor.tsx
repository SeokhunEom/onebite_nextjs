"use client";

import { useActionState, useEffect } from "react";

import createReviewAction from "@/actions/createReview.action";
import style from "./ReviewEditor.module.css";

interface ReviewEditorProps {
  movieId: number;
}

function ReviewEditor({ movieId }: ReviewEditorProps) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.container} action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea
          required
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            required
            disabled={isPending}
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "저장 중 ..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ReviewEditor;
