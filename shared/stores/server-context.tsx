import { createContext, useContext, useEffect, useRef, useState } from "react";

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
    const fetchPromise = () => handler().then((res) => {
        context.dataMap[id] = res;
        setData(res);
    });

    if (context.isServer && context.dataMap[id] === undefined) {
        // Simpan promise ke handlers agar bisa di-prepass
        context.handlers.push(fetchPromise());
    }

    return { isReady: !context.isServer, data };
}

