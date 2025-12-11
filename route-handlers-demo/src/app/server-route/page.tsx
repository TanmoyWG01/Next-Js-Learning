import { serverSideFunction } from "@/utils/server-utils";

export default function ServerRoutePage() {
    const result = serverSideFunction();
    return (
        <div>
            <h2>Server Route Page {result}</h2>
        </div>
    );
}