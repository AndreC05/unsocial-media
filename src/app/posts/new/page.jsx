import NewPostForm from "@/components/NewPostForm";
import { Suspense } from "react";

export default async function NewPost() {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <NewPostForm />
    </Suspense>
  );
}
