//page with a single post and its comments

import NotFound from "@/app/not-found";
import AddNewCommentBtn from "@/components/AddNewCommentBtn";
import CommentDeleteBtn from "@/components/CommentDeleteBtn";
import CommentLikeBtn from "@/components/CommentLikeBtn";
import PostDeleteBtn from "@/components/PostDeleteBtn";
import PostLikeBtn from "@/components/PostLikeBtn";
import {
  handleAddNewCommentBtn,
  handleCommentDeleteBtn,
  handleCommentLikeBtn,
  handleEditCommentBtn,
  handlePostDeleteBtn,
  handlePostLikeBtn,
} from "@/utils/actions";
import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import EditCommentBtn from "@/components/EditCommentBtn";
import { Suspense } from "react";

export default async function SinglePostsPage({ params }) {
  const postId = (await params).id;
  const { userId } = await auth();

  //get current post
  const responsePost = await db.query(
    `SELECT posts.id, posts.clerk_id, posts.title, posts.content, users.username, users.id as user_id, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes
    FROM posts
    JOIN users ON posts.clerk_id = users.clerk_id
    WHERE posts.id = $1
    ORDER BY posts.id DESC;`,
    [postId]
  );

  const post = responsePost.rows;

  //get comments for this post
  const responseComments = await db.query(
    `SELECT comments.id, comments.content, comments.clerk_id, comments.post_id, users.username, users.id AS user_id, TO_CHAR(comments.comment_date, 'YYYY-MM-DD') AS date, comments.likes
    FROM comments
    JOIN users ON comments.clerk_id = users.clerk_id
    WHERE comments.post_id = $1
    ORDER BY comments.id DESC;`,
    [postId]
  );

  const comments = responseComments.rows;

  if (Object.keys(post).length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <SignedIn>
        <Suspense fallback={<p>Loading ...</p>}>
          {post.map((p) => (
            <div key={p.id}>
              <h3>
                Username: <Link href={`/users/${p.user_id}`}>{p.username}</Link>
              </h3>
              <h4>Title: {p.title}</h4>
              <p>Content: {p.content}</p>
              <h4>Date: {p.date}</h4>
              <p>Likes: {p.likes}</p>
              <PostLikeBtn post={p} handlePostLikeBtn={handlePostLikeBtn} />
              {userId == p.clerk_id && (
                <PostDeleteBtn
                  post={p}
                  handlePostDeleteBtn={handlePostDeleteBtn}
                />
              )}
            </div>
          ))}
          <AddNewCommentBtn postId={postId} />
          <h2>Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h3>
                Username:{" "}
                <Link href={`/users/${comment.user_id}`}>
                  {comment.username}
                </Link>
              </h3>
              <p>Content: {comment.content}</p>
              <h4>Date: {comment.date}</h4>
              <p>Likes: {comment.likes}</p>
              <CommentLikeBtn
                comment={comment}
                post={post}
                handleCommentLikeBtn={handleCommentLikeBtn}
              />
              {userId == comment.clerk_id && (
                <CommentDeleteBtn
                  comment={comment}
                  post={post}
                  handleCommentDeleteBtn={handleCommentDeleteBtn}
                />
              )}
              {userId == comment.clerk_id && (
                <EditCommentBtn
                  postId={postId}
                  commentId={comment.id}
                  handleEditCommentBtn={handleEditCommentBtn}
                />
              )}
            </div>
          ))}
        </Suspense>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          Please click here to sign in before making a comment
        </Link>
      </SignedOut>
    </>
  );
}
