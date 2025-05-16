import { createContext, useContext, useEffect, useState } from "react";

export interface ServerContextI {
    isServer: boolean;
    handlers: Promise<any>[],
    dataMap: Record<string, any>,
}

const ServerContext = createContext<ServerContextI>({} as ServerContextI);

export const ServerQueryProvider = ({ value, children }: { value: ServerContextI, children: React.ReactNode }) => {
    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export interface ServerQueryProps {
    id: string;
    handler: () => Promise<any>;
}

export const useServerQuery = ({ id, handler }: ServerQueryProps) => {

    const context = useContext(ServerContext);

    const [data, setData] = useState<any>(() => {
        return context.dataMap[id] ?? null;
    });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const fetchPromise = () => handler().then((res) => {
        context.dataMap[id] = res;
        setData(res);
    }).catch((err) => setError(err));

    const fetchClient = () => {
        if (!context.dataMap[id]) {
            setIsLoading(true);
        };

        fetchPromise()
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if (context.isServer || typeof window === "undefined") return;

        fetchClient()
    }, [])

    if (context.isServer && context.dataMap[id] === undefined) {
        context.handlers.push(fetchPromise());
    }

    return { isLoading, data, error };
}

