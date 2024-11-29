import Appbar from "./Appbar";

interface InputTypes {
    name: string,
    title: string,
    content: string,
    date: string,
    tagline: string
}


export default function FullBlog({ name, content, title, date, tagline }: InputTypes) {
    return (
        <div >
            <Appbar name={name}></Appbar>
            <div className=" grid w-screen grid-cols-12">
                <div className=" col-span-8 ">
                    <div className="text-6xl font-bold pl-20 mt-10">{title}</div>
                    <div className="mt-3 pl-20 text-slate-500 text-lg">Posted on {date}</div>
                    <div className="mt-3 pl-20">{content}</div>
                </div>
                <div className="col-span-4">
                    <div className="mt-10 text-lg">Author</div>
                    <div className="flex mt-3">
                        <div> <Avatar name={name} ></Avatar> </div>
                        <div className="ml-3 text-2xl font-bold">{name}</div>
                    </div>
                    <div className="mt-2 ml-12">{tagline}</div>
                </div>
            </div>
        </div>
    )
}


function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 text-lg dark:text-gray-300">{name[0]}</span>
        </div>
    )
}
