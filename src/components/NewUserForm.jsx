import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewUserForm() {
  const { userId } = await auth();
  console.log(userId);
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    db.query(
      `INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
      [username, bio, userId]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }
  return (
    <form action={handleSubmit}>
      <input name="username" placeholder="Username" />
      <textarea name="bio" placeholder="Bio"></textarea>
      <button>Submit</button>
    </form>
  );
}
