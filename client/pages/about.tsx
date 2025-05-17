import axios from "axios";

import { useServerQuery } from "$shared/server-context";

export const About = () => {
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
      <h1>About</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default About;
