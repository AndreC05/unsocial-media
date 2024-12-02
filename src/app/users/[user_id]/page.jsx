import NotFound from "@/app/not-found";
import PostLikeBtn from "@/components/PostLikeBtn";
import ViewCommentBtn from "@/components/ViewCommentsBtn";
import { handlePostLikeBtn } from "@/utils/actions";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

//page containing info about 1 user
export default async function UserProfile({ params }) {
  const profileId = (await params).user_id;
  console.log(profileId);

  const responseUser = await db.query(
    `SELECT id, username, bio, TO_CHAR(date_joined, 'YYYY-MM-DD') AS date, clerk_id FROM users WHERE users.id = ${profileId}`
  );
  const userProfile = responseUser.rows;

  //page not found
  if (userProfile.length === 0) {
    return <NotFound />;
  }

  const clerk_id = userProfile[0].clerk_id;

  // get all the posts from this user
  const responsePosts = await db.query(
    `
    SELECT posts.id, posts.title, posts.content, users.username, users.id as user_id, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes
FROM posts
JOIN users ON posts.clerk_id = users.clerk_id
WHERE posts.clerk_id = $1
ORDER BY posts.id DESC;`,
    [clerk_id]
  );
  const posts = responsePosts.rows;

  return (
    <>
      <SignedIn>
        <Suspense fallback={<p>Loading ...</p>}>
          <h2 className="profileTitle">Profile:</h2>
          {userProfile.map((user) => (
            <div key={user.id}>
              <h2>Username: {user.username}</h2>
              <h4>Bio: {user.bio}</h4>
              <h3>Date Joined: {user.date}</h3>
            </div>
          ))}

          <h2 className="userPostsTitle">All posts:</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>Title: {post.title}</h3>
              <p>Content: {post.content}</p>
              <h4>Date: {post.date}</h4>
              <p>Likes: {post.likes}</p>
              <PostLikeBtn post={post} handlePostLikeBtn={handlePostLikeBtn} />
              <ViewCommentBtn postId={post.id} />
            </div>
          ))}
        </Suspense>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">Please click here to sign in</Link>
      </SignedOut>
    </>
  );
}
