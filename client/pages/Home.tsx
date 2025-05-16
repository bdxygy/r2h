import { useServerQuery } from "$shared/server-context";
import axios from "axios";

export const Home = () => {
    const { data, isLoading } = useServerQuery({
        id: "home",
        handler: () =>
            axios
                .get(origin + "/api")
                .then((res) => res.data).catch(() => null),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Home</h1>
            <h2>{data}</h2>
        </div>
    );
};

export default Home;
