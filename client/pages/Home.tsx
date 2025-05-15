import { useServerQuery } from "$shared/stores/server-context";
import axios from "axios";

export const Home = () => {
  const { isReady, data } = useServerQuery({
    id: "home",
    handler: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => res.data),
  });

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
