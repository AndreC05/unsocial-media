"use client";

import { HeartIcon } from "@radix-ui/react-icons";

export default function CommentLikeBtn({
  comment,
  post,
  handleCommentLikeBtn,
}) {
  async function handleLikeClick() {
    await handleCommentLikeBtn(comment, post);
  }

  return (
    <button title="Like Comment" onClick={() => handleLikeClick(comment)}>
      <HeartIcon />
    </button>
  );
}
