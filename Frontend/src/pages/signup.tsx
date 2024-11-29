import Quote from "../components/quote";
import Auth from "../components/Auth"

export default function Signup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="Sign up"></Auth>
      </div>
      <div className="hidden lg:block">
        <Quote></Quote>
      </div>
    </div>
  )
}
