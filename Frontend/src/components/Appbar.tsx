import { useState } from "react";
import { Link } from "react-router-dom";
import { useFilter } from "../hooks";

export default function Appbar({ name }: { name: string }) {
    const [filter, setFilter] = useState("");
    const [dropdown, setDropdown] = useState(false)

    const { title } = useFilter({
        filterInput: filter || ""
    })


    console.log(title);

    return (
        <div>
            <div className="h-16 w-screen flex justify-between ">
                <div className="pl-10 flex">
                    <div className="flex">
                        <div className=" flex justify-col items-center font-mono text-2xl">
                            <Link to={"/getblogs"}>EZblogging</Link>
                        </div>
                    </div>
                    <div className="flex pl-10">
                        <form className="flex items-center max-w-sm mx-auto">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                    </svg>
                                </div>
                                <input onChange={(e) => {
                                    setFilter(e.target.value)

                                    setDropdown(true)
                                }}
                                    onClick={() => {
                                        setDropdown(false)
                                    }}
                                    type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 ps-10 p-2.5  " placeholder="Search blog name..." required />
                                {dropdown && title.length > 0 && (
                                    <div className="absolute top-full mt-1 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                        {title.map((blog) => (
                                            <Suggestion key={blog.id} id={blog.id} title={blog.title} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>


                </div>
                <div className="flex">
                    <div className="flex justify-center flex-col mr-2 ">
                        <button type="button" className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 font-semibold ">
                            <Link to={"/createBlog"}>New</Link>
                        </button>
                    </div>
                    <div className="flex justify-center flex-col mr-10">
                        <div className=" relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full text-xl ">
                            <span className="font-medium text-gray-600 ">{name[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border border-slate-600 w-screen"></div>
        </div>
    )
}


function Suggestion({ title, id }: { title: string, id: string }) {
    return (
        <Link to={`/getOneBlog/${id}`}>
            <div className="p-2 text-gray-700 hover:bg-gray-100 cursor-pointer h-10">
                {title}
            </div>
        </Link>
    );
}



