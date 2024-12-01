import EditCommentForm from "@/components/EditCommentForm";

export default async function EditComment({ params, searchParams }) {
  const postId = (await params).id;
  const commentId = (await searchParams).commentId;

  return <EditCommentForm postId={postId} commentId={commentId} />;
}
