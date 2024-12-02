// Page containing a list of all users

import NewUserForm from "@/components/NewUserForm";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function PostsPage() {
  const { userId } = await auth();

  // check if user has a username already
  const responseUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  const usernameNum = responseUser.rowCount;

  const responseAllUsers = await db.query(`SELECT id, username FROM users`);
  const allUsers = responseAllUsers.rows;

  return (
    <>
      <h2 className="usersTitle">Users</h2>
      <p>Click on a username to be taken to that user profile</p>
      <SignedIn>
        <Suspense fallback={<p>Loading ...</p>}>
          {usernameNum === 1 ? (
            allUsers.map((user) => (
              <div key={user.id}>
                <h3>
                  User:
                  <Link href={`/users/${user.id}`}>{user.username}</Link>
                </h3>
              </div>
            ))
          ) : (
            <div>
              <p>please create a username before looking for other users</p>
              <NewUserForm />
            </div>
          )}
        </Suspense>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          Please click here to sign in before making a post
        </Link>
      </SignedOut>
    </>
  );
}
