import EditCommentForm from "@/components/EditCommentForm";
import { Suspense } from "react";

export default async function EditComment({ params, searchParams }) {
  const postId = (await params).id;
  const commentId = (await searchParams).commentId;

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <EditCommentForm postId={postId} commentId={commentId} />
    </Suspense>
  );
}
