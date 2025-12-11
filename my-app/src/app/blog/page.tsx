import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Blog",
  },
};

const Blog = async () => {
  await new Promise((resolve) => {
    setTimeout(()=>{
      resolve("Intesionally delayed for 2 seconds");
    }, 2000)
  });
  return <h1>My Blog!</h1>;
};

export default Blog;
