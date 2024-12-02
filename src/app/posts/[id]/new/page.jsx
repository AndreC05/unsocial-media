import NewCommentForm from "@/components/NewCommentForm";
import { Suspense } from "react";

export default async function NewComment({ params }) {
  const postId = (await params).id;

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <NewCommentForm postId={postId} />
    </Suspense>
  );
}
