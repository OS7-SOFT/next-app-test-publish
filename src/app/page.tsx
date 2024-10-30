import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/authOption";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user && <h1>{session.user.email}</h1>}
      <div>Home Page</div>

      <Link href="/api/auth/signin">Login</Link>
    </>
  );
};

export default page;
