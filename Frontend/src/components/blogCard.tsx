import { Link } from "react-router-dom"

interface inpuTypes {
    name: string,
    date: string,
    title: string,
    content: string,
    id: string
}

export default function BlogCard({ name, date, title, content, id }: inpuTypes) {
    return (
        <Link to={`/getOneBlog/${id}`}>
            <div className="max-w-screen-md cursor-pointer">
                <div className="flex pt-2 ">
                    <Avatar name={name}  ></Avatar>
                    <div className="text-sm flex justify-center flex-col font-medium pl-2">{name}</div>
                    <div className="flex justify-center flex-col pl-1"> <Dot></Dot> </div>
                    <div className="text-slate-600 text-sm flex justify-center flex-col font-medium pl-1"> {date} </div>
                </div>
                <div className="font-bold text-lg mt-2">{title}</div>
                <div className="text-base">{content.slice(0, 200) + "..."}</div>
                <div className="text-slate-600 text-sm font-medium mt-5">{Math.floor(content.length / 100) + "minute(s) read"}</div>
                <div className="border border-slate-100 border-t-1 mt-3 h-px"></div>
            </div>
        </Link>
    )
}

function Dot() {
    return <div className="bg-slate-600 h-px w-px rounded-full"></div>
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 text-xs dark:text-gray-300">{name[0]}</span>
        </div>
    )
}
