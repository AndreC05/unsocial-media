import { db } from "@/utils/db";
import { redirect } from "next/navigation";

export default async function EditPostForm({ postId }) {
  async function handleSubmit(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");

    db.query(`UPDATE posts SET title=$1, content=$2 WHERE id=$3`, [
      title,
      content,
      postId,
    ]);

    redirect("/posts");
  }

  return (
    <form action={handleSubmit}>
      <div className="title">
        <label htmlFor="title">Post title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Your post title..."
          minLength={5}
          maxLength={50}
          required
        />
      </div>

      <div className="content">
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          placeholder="Your post content..."
          minLength={10}
          maxLength={1500}
          required
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}
