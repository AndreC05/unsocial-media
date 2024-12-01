"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function EditCommentBtn({
  postId,
  commentId,
  handleEditCommentBtn,
}) {
  async function handleBtnClick() {
    await handleEditCommentBtn(postId, commentId);
  }

  return (
    <>
      <button title="Edit Comment" onClick={handleBtnClick}>
        <Pencil2Icon />
      </button>
    </>
  );
}
