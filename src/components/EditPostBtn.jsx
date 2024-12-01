"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function EditPostBtn({ postId, handlePostEditBtn }) {
  async function handleBtnClick() {
    await handlePostEditBtn(postId);
  }

  return (
    <>
      <button title="Edit Post" onClick={handleBtnClick}>
        <Pencil2Icon />
      </button>
    </>
  );
}
