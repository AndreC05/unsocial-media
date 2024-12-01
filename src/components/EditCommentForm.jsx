import { db } from "@/utils/db";
import { redirect } from "next/navigation";

export default async function EditCommentForm({ postId, commentId }) {
  //---------------------------------------Update Data
  async function handleSubmit(formData) {
    "use server";
    const content = formData.get("content");
    db.query(`UPDATE comments SET content = $1 WHERE id = $2`, [
      content,
      commentId,
    ]);
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
