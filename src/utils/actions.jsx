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

//------------------------------------------------------------Handle View comment Btn
export async function handleViewCommentBtn(postId) {
  redirect(`/posts/${postId}`);
}

//------------------------------------------------------------Handle Post Like Btn

export async function handlePostLikeBtn(post) {
  db.query(`UPDATE posts SET likes = likes + 1 WHERE id = ${post.id}`);
  revalidatePath("/posts");
  revalidatePath(`/posts/${post.id}`);
}

//------------------------------------------------------------Handle Post Delete Btn

export async function handlePostDeleteBtn(post) {
  db.query(`DELETE FROM comments WHERE post_id = ${post.id}`);
  db.query(`DELETE FROM posts WHERE id = ${post.id}`);
  revalidatePath("/posts");
  redirect(`/posts`);
}

//------------------------------------------------------------Handle edit post Btn
export async function handlePostEditBtn(postId) {
  redirect(`/posts/edit?postId=${postId}`);
}

//------------------------------------------------------------Handle Comment Like Btn

export async function handleCommentLikeBtn(comment, post) {
  db.query(`UPDATE comments SET likes = likes + 1 WHERE id = ${comment.id}`);
  revalidatePath(`/posts/${post.id}`);
}

//------------------------------------------------------------Handle Comment Delete Btn

export async function handleCommentDeleteBtn(comment, post) {
  db.query(`DELETE FROM comments WHERE id = ${comment.id}`);
  revalidatePath(`/posts/${post.id}`);
}

//------------------------------------------------------------Handle edit comment Btn
export async function handleEditCommentBtn(postId, commentId) {
  redirect(`/posts/${postId}/edit?commentId=${commentId}`);
}
