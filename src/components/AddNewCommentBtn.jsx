"use client";

import { handleAddNewCommentBtn } from "@/utils/actions";

export default function AddNewCommentBtn({ postId }) {
  async function handleBtnClick() {
    await handleAddNewCommentBtn(postId);
  }

  return (
    <>
      <button title="Add New Post" onClick={handleBtnClick}>
        Add new Comment
      </button>
    </>
  );
}
