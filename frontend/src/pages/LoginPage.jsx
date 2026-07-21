import { Input } from "../components/UI/Input"


function LoginPage () {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <form>
                    <Input isRegisterOn={false}/>
                </form>
            </div>
        </div>
    )
}

export default LoginPage