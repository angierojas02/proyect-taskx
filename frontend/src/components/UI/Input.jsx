export const Input = ({isRegisterOn}) => {
    
    return (
        <div className="flex flex-col gap-3 font-raleway">  
            {isRegisterOn && ( 
            <div>
                <label className="block text-sm font-bold text-slate-700">
                Correo electrónico
                </label>
                <input 
                    type="email"
                    placeholder="juanperez@gmail.com"
                    className="mt-2 w-full px-6 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
            </div>)}

             <div>
                <label className="block text-sm font-bold text-slate-700"> Usuario </label>
                <input type="text" placeholder="juanperez"
                className="mt-2 w-full px-6 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700">
                Contraseña
                </label>
                <input 
                type="password"
                className="mt-2 w-full px-6 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
            </div>

            <div className="mt-1.5">
                <button className="w-full rounded-md bg-slate-600 p-1.5 text-white font-semibold hover:bg-slate-700">{isRegisterOn ? "Registrate" : "Iniciar sesión"}</button>
            </div>
            
        </div>
        
    )
}