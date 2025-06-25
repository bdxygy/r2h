import axios from "axios";

import { useServerQuery } from "$shared/server-context";
import { authClient } from "$client/libs/auth-client";
import { Button } from "$client/components/ui/button";

export const About = async () => {
  const { data: session } = await authClient.getSession();
  const { data, isLoading, error } = useServerQuery({
    id: "About",
    handler: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users/1")
        .then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <Button
        className="mb-4 hover:cursor-pointer"
        onClick={() =>
          authClient.signIn.email({
            email: "test@test.com",
            password: "123456",
          })
        }
      >
        Sign In (test@test.com)
      </Button>

      <h1>About</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {session && session?.user && session?.session && (
        <>
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
          <pre>{JSON.stringify(session.session, null, 2)}</pre>

          <Button onClick={() => authClient.signOut()}>Sign Out</Button>
        </>
      )}
    </div>
  );
};

export default About;
