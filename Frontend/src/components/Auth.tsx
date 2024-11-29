/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import Label from "./label"
import { signupInput } from "@vidhigaba07/medium-common"
import CustomizedButton from "./button"
import axios from "axios"
import { BACKEND_URL } from "../../config"

import { useState } from "react"

export default function Auth({ type }: { type: "Sign up" | "Sign in" }) {
    const navigate = useNavigate();
    const [input, setInput] = useState<signupInput>({
        username: "",
        password: "",
        name: ""
    })
    const [passwordType, setPasswordType] = useState("password")
    const [authorizing, setAuthorizing] = useState(true);
    const [touched, setTouched] = useState({
        username: false,
        password: false,
        email: false
    });
    const [correctEmail, setCorrectEmail] = useState(false)

    async function sendInputs() {
        if (!input.username || !input.password || !input.name) {
            setTouched({
                password: true,
                username: true,
                email: true
            })
            return;
        }

        try {
            setAuthorizing(false);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "Sign up" ? "signup" : "signin"}`, input)
            const jwt = await response.data;
            if (jwt === "Wrong Inputs Entered") {
                setAuthorizing(true)
                setCorrectEmail(true);
                return
            }
            localStorage.setItem("token", jwt);
            navigate("/getblogs")
        }
        catch (e) {
            alert("Cant able to signin")
        }

    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold"> Create an account</div>
                        <div className="text-slate-500 text-base mt-2 text-center">{type === "Sign up" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "Sign up" ? "/Signin" : "/Signup"}>{type === "Sign up" ? "Sign in" : "Sign up"}</Link>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div>
                            {type === "Sign up" ? <Label label="Username" placeholder="Enter your username" onChange={(e) => {
                                setInput({
                                    ...input,
                                    name: e.target.value
                                })
                            }} onblur={() => {
                                setTouched({
                                    ...touched,
                                    username: true
                                })
                            }} isError={touched.username && input.name === ""}></Label> : null}
                        </div>
                        <div className="mt-3">
                            <Label label="Email" placeholder="m@example.com" onChange={(e) => {
                                setInput({
                                    ...input,
                                    username: e.target.value
                                })
                            }} onblur={() => {
                                setTouched({
                                    ...touched,
                                    email: true
                                })
                            }} isError={touched.email && input.username === ""}></Label>
                            {correctEmail ? <p className="mt-1 text-xs text-red-500">Please enter a valid email.</p> : ""}
                        </div>
                        <div className="mt-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-black font-semibold">Password</label>
                                <input type={passwordType} onChange={(e) => {
                                    setInput({
                                        ...input,
                                        password: e.target.value
                                    })
                                }} onBlur={() => {
                                    setTouched({
                                        ...touched,
                                        password: true
                                    })
                                }} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${touched.password && input.password === "" ? "border-red-500" : "border-gray-300"
                                    }`} placeholder="Enter your password" required />
                                {touched.password && input.password === "" && (
                                    <p className="mt-1 text-xs text-red-500">This field is required.</p>
                                )}
                                <div className="flex mt-4">
                                    <input onClick={() => {
                                        { passwordType === "password" ? setPasswordType("text") : setPasswordType("password") }
                                    }} data-hs-toggle-password='{
        "target": "#hs-toggle-password-with-checkbox"
      }' id="hs-toggle-password-checkbox" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500" />
                                    <label htmlFor="hs-toggle-password-checkbox" className="text-sm text-gray-500 ms-3 ">Show password</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <CustomizedButton authorizing={authorizing} beforeLabel={type == "Sign up" ? "Sign up" : "Sign in"} afterLabel={type == "Sign up" ? "Signing up" : "Signing in"} onClick={sendInputs}></CustomizedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}