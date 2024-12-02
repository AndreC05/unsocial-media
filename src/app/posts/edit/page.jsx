"use server";
import EditPostForm from "@/components/EditPostForm";
import { Suspense } from "react";

export default async function EditPost({ searchParams }) {
  const postId = (await searchParams).postId;
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <EditPostForm postId={postId} />
    </Suspense>
  );
}
