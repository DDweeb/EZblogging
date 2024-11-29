import Auth from "../components/Auth"
import Quote from "../components/quote"

export default function Signin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="Sign in"></Auth>
      </div>
      <div className="hidden lg:block">
        <Quote></Quote>
      </div>
    </div>
  )
}