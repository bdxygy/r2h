import { useServerQuery } from "$shared/server-context";
import axios from "axios";

export const About = () => {
    const { data, isLoading } = useServerQuery({
        id: "About",
        handler: () =>
            axios
                .get("https://jsonplaceholder.typicode.com/users/1")
                .then((res) => res.data).catch(() => null),
    });

    console.log({ data, isLoading });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>About</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default About;
