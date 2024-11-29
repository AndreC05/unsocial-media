"use server";
import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

//------------------------------------------------------------Handle add new post Btn
export async function handleAddNewPostBtn() {
  redirect(`/posts/new`);
}

//------------------------------------------------------------Handle Post Like Btn

export async function handlePostLikeBtn(post) {
  db.query(`UPDATE posts SET likes = likes + 1 WHERE id = ${post.id}`);
  revalidatePath("/posts");
}
