import axios from "axios";

import { useServerQuery } from "$shared/server-context";
import { authClient } from "$client/libs/auth-client";
import { Button } from "$client/components/ui/button";

export const About = () => {
  const session = authClient.useSession;
  const { data, isLoading, error } = useServerQuery({
    id: "About",
    handler: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users/1")
        .then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  const handleSignUp = async () => {
    const { data } = await authClient.signUp.email({
      email: "test@test.com",
      password: "123456",
      name: "Test User",
    });
    console.log(data);
  };

  const handleSignIn = async () => {
    const { data } = await authClient.signIn.email({
      email: "test@test.com",
      password: "123456",
    });
    console.log(data);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 items-left justify-left">
        <Button className="hover:cursor-pointer" onClick={handleSignUp}>
          Sign Up (test@test.com)
        </Button>
        <Button className="mb-4 hover:cursor-pointer" onClick={handleSignIn}>
          Sign In (test@test.com)
        </Button>
      </div>

      <h1>About</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {session && (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <pre>{JSON.stringify(session, null, 2)}</pre>

          <Button onClick={() => authClient.signOut()}>Sign Out</Button>
        </>
      )}
    </div>
  );
};

export default About;
