import EditPostBtn from "@/components/EditPostBtn";
import NewUserForm from "@/components/NewUserForm";
import PostDeleteBtn from "@/components/PostDeleteBtn";
import PostLikeBtn from "@/components/PostLikeBtn";
import ViewCommentBtn from "@/components/ViewCommentsBtn";
import {
  handleAddNewPostBtn,
  handlePostDeleteBtn,
  handlePostEditBtn,
  handlePostLikeBtn,
} from "@/utils/actions";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PostsPage() {
  const { userId } = await auth();

  // get all the posts
  const responsePosts = await db.query(`
    SELECT posts.id, posts.title, posts.clerk_id, posts.content, users.username, users.id as user_id, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes
FROM posts
JOIN users ON posts.clerk_id = users.clerk_id
ORDER BY posts.id DESC;`);
  const posts = responsePosts.rows;

  // check if user has a username already
  const responseUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  const usernameNum = responseUser.rowCount;

  return (
    <div>
      <h2>Posts</h2>
      <SignedIn>
        {usernameNum === 1 ? (
          <button onClick={handleAddNewPostBtn}>Add Post</button>
        ) : (
          <div>
            <p>please create a username before adding new posts</p>
            <NewUserForm />
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          Please click here to sign in before making a post
        </Link>
      </SignedOut>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>
              Username:{" "}
              <Link href={`/users/${post.user_id}`}>{post.username}</Link>
            </h3>
            <h4>Title: {post.title}</h4>
            <p>Content: {post.content}</p>
            <h4>Date: {post.date}</h4>
            <p>Likes: {post.likes}</p>
            <PostLikeBtn post={post} handlePostLikeBtn={handlePostLikeBtn} />
            <ViewCommentBtn postId={post.id} />
            {userId == post.clerk_id && (
              <PostDeleteBtn
                post={post}
                handlePostDeleteBtn={handlePostDeleteBtn}
              />
            )}
            {userId == post.clerk_id && (
              <EditPostBtn
                postId={post.id}
                handlePostEditBtn={handlePostEditBtn}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
