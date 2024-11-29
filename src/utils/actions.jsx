"use server";
import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

//------------------------------------------------------------Handle add new post Btn
export async function handleAddNewPostBtn() {
  redirect(`/posts/new`);
}

//------------------------------------------------------------Handle add new comment Btn
export async function handleAddNewCommentBtn(postId) {
  redirect(`/posts/${postId}/new`);
}

//------------------------------------------------------------Handle Post Like Btn

export async function handlePostLikeBtn(post) {
  db.query(`UPDATE posts SET likes = likes + 1 WHERE id = ${post.id}`);
  revalidatePath("/posts");
  revalidatePath(`/posts/${post.id}`);
}

//------------------------------------------------------------Handle Post Like Btn

export async function handleCommentLikeBtn(comment, post) {
  db.query(`UPDATE comments SET likes = likes + 1 WHERE id = ${comment.id}`);
  revalidatePath(`/posts/${post.id}`);
}
