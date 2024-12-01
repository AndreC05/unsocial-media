"use client";

import { handleViewCommentBtn } from "@/utils/actions";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function ViewCommentBtn({ postId }) {
  async function handleBtnClick() {
    await handleViewCommentBtn(postId);
  }

  return (
    <>
      <button title="Comments" onClick={handleBtnClick}>
        <ChatBubbleIcon />
      </button>
    </>
  );
}
