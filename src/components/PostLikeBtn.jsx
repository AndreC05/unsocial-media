"use client";

export default function PostLikeBtn({ post, handlePostLikeBtn }) {
  async function handleLikeClick() {
    await handlePostLikeBtn(post);
  }

  return <button onClick={() => handleLikeClick(post)}>Like</button>;
}
