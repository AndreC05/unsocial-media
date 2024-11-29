"use client";

export default function CommentLikeBtn({
  comment,
  post,
  handleCommentLikeBtn,
}) {
  async function handleLikeClick() {
    await handleCommentLikeBtn(comment, post);
  }

  return <button onClick={() => handleLikeClick(comment)}>Like</button>;
}
