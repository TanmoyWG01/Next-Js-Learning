import ImageSlider from "@/components/ImageSlider";
import { serverSideFunction } from "@/utils/server-utils";

export default function ServerRoutePage() {
    const result = serverSideFunction();
    return (
        <>
            <h2>Server Route Page {result}</h2>
            <ImageSlider />
        </>
    );
}