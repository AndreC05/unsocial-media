//page with a single post and its comments

import AddNewCommentBtn from "@/components/AddNewCommentBtn";
import CommentLikeBtn from "@/components/CommentLikeBtn";
import PostLikeBtn from "@/components/PostLikeBtn";
import {
  handleAddNewCommentBtn,
  handleCommentLikeBtn,
  handlePostLikeBtn,
} from "@/utils/actions";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function SinglePostsPage({ params }) {
  const postId = (await params).id;

  //get current post
  const responsePost = await db.query(
    `SELECT posts.id, posts.title, posts.content, users.username, users.id as user_id, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes
    FROM posts
    JOIN users ON posts.clerk_id = users.clerk_id
    WHERE posts.id = $1
    ORDER BY posts.id DESC;`,
    [postId]
  );

  const post = responsePost.rows;

  //get comments for this post
  const responseComments = await db.query(
    `SELECT comments.id, comments.content, comments.post_id, users.username, users.id AS user_id, TO_CHAR(comments.comment_date, 'YYYY-MM-DD') AS date, comments.likes
    FROM comments
    JOIN users ON comments.clerk_id = users.clerk_id
    WHERE comments.post_id = $1
    ORDER BY comments.id DESC;`,
    [postId]
  );

  const comments = responseComments.rows;

  return (
    <>
      <SignedIn>
        {post.map((p) => (
          <div key={p.id}>
            <h3>
              Username: <Link href={`/user/${p.user_id}`}>{p.username}</Link>
            </h3>
            <h4>Title: {p.title}</h4>
            <p>Content: {p.content}</p>
            <h4>Date: {p.date}</h4>
            <p>Likes: {p.likes}</p>
            <PostLikeBtn post={p} handlePostLikeBtn={handlePostLikeBtn} />
          </div>
        ))}
        <AddNewCommentBtn postId={postId} />
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id}>
            <h3>
              Username:{" "}
              <Link href={`/user/${comment.user_id}`}>{comment.username}</Link>
            </h3>
            <p>Content: {comment.content}</p>
            <h4>Date: {comment.date}</h4>
            <p>Likes: {comment.likes}</p>
            <CommentLikeBtn
              comment={comment}
              post={post}
              handleCommentLikeBtn={handleCommentLikeBtn}
            />
          </div>
        ))}
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          Please click here to sign in before making a comment
        </Link>
      </SignedOut>
    </>
  );
}
