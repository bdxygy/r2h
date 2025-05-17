import axios from "axios";

import { useServerQuery } from "$shared/server-context";

export const Home = () => {
  const { data, isLoading, error } = useServerQuery({
    id: "home",
    handler: () =>
      axios
        .get("http://localhost:32300/api")
        .then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Home</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default Home;
