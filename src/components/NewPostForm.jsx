import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function NewPostForm() {
  const { userId } = await auth();
  //----------------------------------------------Submit Data
  async function handleSubmit(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");

    await db.query(
      `INSERT INTO posts (clerk_id, title, content) VALUES ($1, $2, $3)`,
      [userId, title, content]
    );

    //revalidate pats /posts
    revalidatePath("/posts");
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
