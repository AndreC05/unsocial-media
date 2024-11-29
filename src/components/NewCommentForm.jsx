import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewCommentForm({ postId }) {
  const { userId } = await auth();
  //----------------------------------------------Submit Data
  async function handleSubmit(formData) {
    "use server";
    const content = formData.get("content");

    await db.query(
      `INSERT INTO comments (clerk_id, post_id, content) VALUES ($1, $2, $3)`,
      [userId, postId, content]
    );

    //revalidate and redirect to path
    revalidatePath(`/posts/${postId}`);
    redirect(`/posts/${postId}`);
  }

  return (
    <form action={handleSubmit}>
      <div className="content">
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          placeholder="Your comment content..."
          minLength={5}
          maxLength={511}
          required
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}
