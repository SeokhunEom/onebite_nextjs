"use server";

import { revalidateTag } from "next/cache";

async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "내용과 작성자를 입력하지 않았습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // revalidatePath(`/book/${bookId}`);
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${error}`,
    };
  }
}

export default createReviewAction;
