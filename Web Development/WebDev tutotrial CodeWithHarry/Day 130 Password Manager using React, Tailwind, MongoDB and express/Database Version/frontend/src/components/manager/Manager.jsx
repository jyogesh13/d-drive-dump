import { SaveAs, Visibility, VisibilityOff, ContentCopy, Edit, Delete } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [show, setShow] = useState(false)
  const [passwordArray, setPasswordArray] = useState([])


  // const passRef = useRef();
  // const siteRef = useRef()
  // const emailRef = useRef()
  // const passRef = useRef()
  const [form, setform] = useState({ site: "", email: "", password: "" })

  useEffect(() => {

    const getPassword = async ()=>{
      let req =  await fetch("http://localhost:3000/api/data/");
      let passwords = await req.json()
      setPasswordArray(passwords);
      console.log(passwords);
    }

    getPassword();
  }, [])

  const notify = (text) => {
    toast.success(`${text}`, {
      position: 'bottom-right',
    });
  };

  const copyText = (text) => {
    notify(`Copied ${text}`)
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    setShow(!show)
  }

  const savePassword = async () => {
    if(form.site.length > 3 && form.email.length > 3 && form.password.length > 3){

      // if any such id exist, delete it
      await fetch("http://localhost:3000/api/data/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
      
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/api/data/",{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})

      setform({ site: "", email: "", password: "" })
      notify("Password saved")
    }
    else{
      notify("Error: Password not saved")
    }

  }

  const deleteText = async (id) => {
    console.log(`deleting id: ${id}`)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id != id))
      await fetch("http://localhost:3000/api/data/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
      notify('Deleted Successfully')
    }
  }
  const editText = async (id) => {
    setform({...passwordArray.filter(item => item.id === id)[0], id:id})
    setPasswordArray(passwordArray.filter(item => item.id != id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const generatePassword = ()=>{
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    let chars = lower+upperChars+numChars+specialChars;

    let pass = "";
    let len = 8
    for (let i = 0; i < len; i++) {
        const randIdx = Math.floor(Math.random() * chars.length);
        pass += chars[randIdx];
    }
    setform({...form,password:`${pass}`})
  }

  return (
    <>
      <ToastContainer />
      <div className=' relative overflow-x-hidden bg-slate-700'>
        <div className=" pointer-events-none absolute inset-0 z-0">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
        <div className="py-4 myContainer">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-300">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-green-300">Op/&gt;</span>
          </h1>
          <p className="text-green-300 text-lg text-center">Your own Password manager</p>
          <div className="text-black flex flex-col gap-3 p-4 items-center">
            <input value={form.site} onChange={handleChange} className="w-full rounded-2xl p-2 px-4 border border-green-200 focus:outline-none bg-gray-300" type="text" name="site" placeholder="site name" />
            <div className="w-full flex justify-around">
              <input value={form.email} onChange={handleChange} className="w-[28vw] rounded-2xl p-2 px-4 border border-green-200 focus:outline-none bg-white" type="email" name="email" id="email" placeholder="Email address" />
              <div className="flex gap-2">
                <div className="relative ">
                  <input value={form.password} onChange={handleChange} className=" rounded-2xl p-2 px-4 border border-green-200 focus:outline-none bg-white" type={show ? "text" : "password"} name="password" id="passwrd" placeholder="password" />

                  <button className='absolute right-1.5 top-1.5 cursor-pointer' onClick={showPassword} >{show ? <VisibilityOff /> : <Visibility />}</button>
                </div>
                <button className=" bg-slate-400 rounded-2xl px-2 text-[13px] cursor-pointer" onClick={() => generatePassword()}>Generate password</button>
              </div>
            </div>
            <button className='flex gap-2 w-30 items-center justify-center text-xl rounded-full bg-green-500 px-2 py-2 hover:bg-green-300 cursor-pointer' onClick={savePassword}> <SaveAs /> Save</button>

          </div>
          <div className='w-full'>
            <h2 className='text-center- text-white font-bold text-2xl mb-2'>Your passwords</h2>

            <div className='h-87 overflow-y-auto scrollbar-hidden'>
              {passwordArray.length === 0 && <div className='text-white'>No Passwords to show</div>}
              {passwordArray.length != 0 && <div className='overflow-y-auto'>
                <table className="table-auto w-full rounded-md overflow-auto mb-20">
                  <thead className='bg-green-800 text-white '>
                    <tr>
                      <th className='py-2'>Site Name</th>
                      <th className='py-2'>Email</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-green-100'>
                    {passwordArray.map((item, index) => (
                      <tr key={index}>
                        <td className='border-2 border-white  text-center w-32 py-2 cursor-pointer'>
                          <div className='flex justify-center gap-2'>
                            <a href={item.site} target='_blank'>{item.site}</a>
                            <button className='cursor-pointer ' onClick={() => copyText(item.site)}><ContentCopy className='p-[2px]' /></button>
                          </div>
                        </td>
                        <td title='click to copy' className='border-2 border-white  text-center w-32 py-2 cursor-pointer'>
                          <div className='flex justify-center gap-2'>
                            {item.email}
                            <button className='cursor-pointer' onClick={() => copyText(item.email)}><ContentCopy className='p-[2px]' /></button>
                          </div>
                        </td>
                        <td title='click to copy' className='border-2 border-white  text-center w-32 py-2 cursor-pointer'>
                          <div className='flex justify-center gap-2'>
                            {"*".repeat(item.password.length)}
                            <button className='cursor-pointer' onClick={() => copyText(item.password)}><ContentCopy className='p-[2px]' /></button>
                          </div>
                        </td>
                        <td className='border-2 border-white  text-center w-32 py-2 cursor-pointer'>
                          <div className='flex justify-center gap-1'>
                            <button title='Edit' className='cursor-pointer' onClick={() => editText(item.id)}><Edit className='p-[2px]' /></button>
                            <button title='Delete' className='cursor-pointer' onClick={() => deleteText(item.id)}><Delete className='p-[2px]' /></button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
