"use client";

import { EraserIcon } from "@radix-ui/react-icons";

export default function CommentDeleteBtn({
  comment,
  post,
  handleCommentDeleteBtn,
}) {
  async function handleDeleteClick() {
    await handleCommentDeleteBtn(comment, post);
  }

  return (
    <button
      title="Delete Comment"
      onClick={() => handleDeleteClick(comment, post)}
    >
      <EraserIcon />
    </button>
  );
}
