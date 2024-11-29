import Appbar from "../components/Appbar"
import BlogCard from "../components/blogCard"
import Skeleton from "../components/skeleton";
import { useBlogs } from "../hooks"



export default function GetBlogs() {
    let key = 0;
    const { loading, blogs } = useBlogs();


    if (loading) {
        return <div>
            <div className="flex justify-center mt-10">
                <div>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
            </div>
        </div>
    }
    return <div>
        <div> <Appbar name="Vidhi Gaba"></Appbar> </div>
        <div className="flex justify-center">
            <div className="">
                <div className="mt-2">
                    {blogs.map((blog: { id: string; content: string; title: string; date: string; author: { name: string; }; }) => {
                        return <BlogCard key={key++} id={blog.id} content={blog.content} title={blog.title} name={blog.author.name} date={blog.date}></BlogCard>
                    })}
                </div>
            </div>
        </div>
    </div>
}

