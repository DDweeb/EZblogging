import axios from 'axios';
import { useEffect, useState } from 'react'

interface Blog {
    tagline: string;
    id: string,
    content: string,
    title: string,
    date: string,
    author: {
        name: string
    }
}

interface Title {
    title: string,
    id: string
}

export function useBlogs() {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://backend.vidhigaba46.workers.dev/api/v1/blog/bulk", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            setBlogs(res.data)
            setLoading(false)
        })

    }, [])

    return {
        loading,
        blogs
    }

}


export function useBlog({ id }: { id: string }) {

    const [blog, setBlog] = useState<Blog>({
        id: "",
        content: "",
        title: "",
        tagline: "",
        date: "",
        author: {
            name: ""
        }
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://backend.vidhigaba46.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            setBlog(res.data)
            setLoading(false)
        })

    }, [id])

    return {
        loading,
        blog
    }
}

export function useFilter({ filterInput }: { filterInput: string }) {
    console.log(filterInput)

    const [title, setTitle] = useState<Title[]>([])

    useEffect(() => {
        axios.get(`https://backend.vidhigaba46.workers.dev/api/v1/blog/filter?filter=${filterInput}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            setTitle(res.data);
        })

    }, [filterInput])

    return {
        title
    }

}