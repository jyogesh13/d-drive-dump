import { useState } from "react"

const Navbar = () => {
    const [username, setUserName] = useState(null)
    return (
        <nav className="bg-slate-950">
            <div className="myContainer flex justify-between items-center px-4 py-5  h-14  ">
                <div className="logo text-2xl font-bold">
                    <span className="text-green-700">&lt;</span>
                    <span className="text-white">Pass</span>
                    <span className="text-green-700">Op/&gt;</span>

                </div>
                <div>
                    <ul>
                        <li className="flex gap-2 text-white">

                            {username ? <button className="hover:bg-amber-300 w-[70px] h-[35px] rounded-3xl cursor-pointer ">LogOut</button> :
                                <div>
                                    <button className="hover:bg-amber-300 w-[70px] h-[35px] rounded-3xl cursor-pointer " >Login</button>
                                    <button className="hover:bg-amber-300 w-[70px] h-[35px] rounded-3xl cursor-pointer ">SignUp</button>
                                </div>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
