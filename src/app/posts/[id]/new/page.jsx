import NewCommentForm from "@/components/NewCommentForm";

export default async function NewComment({ params }) {
  const postId = (await params).id;

  return <NewCommentForm postId={postId} />;
}
