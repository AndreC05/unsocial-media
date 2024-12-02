import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";

export const metadata = {
  title: "Unsocial media",
  description: "Not quite as good as social media",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <h1>Unsocial Media</h1>
            <NavMenu />
            <SignedOut>
              <SignInButton>
                <button className="signInBtn">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
