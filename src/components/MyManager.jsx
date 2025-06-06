import React from 'react'
import { FaCopy, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
const MyManager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])

    const getpasswords= async ()=>{
      let req=await fetch("http://localhost:4000/")
      let pass =await req.json()
      console.log(pass)
      setpasswordsArray(pass)
    }
   
    useEffect(() => {
       getpasswords()

    }, [])


    const showpassword = () => {

        if (ref.current.src.includes("/eye-close.jpg")) {
            ref.current.src = "/eye.webp"
            ref.current.width = 30
            passwordref.current.type = "text"

        }
        else {
            ref.current.src = "/eye-close.jpg"
            ref.current.width = 40
            passwordref.current.type = "password"
        }

    }
    const savePassword = async() => {
        if (!form.password.trim()) {
          toast.error("Credentials cannot be empty", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
         await fetch("http://localhost:4000/",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({id:form.id})})
      
        const newEntry = { ...form, id: uuidv4() };
        const updatedPasswords = [...passwordsArray, newEntry];
      
        setpasswordsArray(updatedPasswords);
         await fetch("http://localhost:4000/",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setform({ site: "", username: "", password: "" });
      
        toast("Credentials Saved!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      
    const deletePassword = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password?");
        if (!confirmDelete) return;
       
        const updatedPasswords = passwordsArray.filter(item => item.id !== id);
        setpasswordsArray(updatedPasswords);
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        let res= await fetch("http://localhost:4000/",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({id})})
        toast('Credentials Deleted!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
      };
    const editPassword = (id) => {
        setform({...passwordsArray.filter(item=>item.id===id)[0],id:id})
        setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
      
    }
    
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)

    }
    return (
        <>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Background */}
          <div
            className="absolute inset-0 -z-10 h-full w-full bg-white
            bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
            bg-[size:6rem_4rem]"
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0
                bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
            ></div>
          </div>
      
          {/* Manager UI */}
          <div className="mx-auto my-12 max-w-full sm:max-w-[90%] md:max-w-[67%] rounded-2xl bg-white/90 shadow-xl backdrop-blur-md border border-gray-300 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col p-4 sm:p-6 gap-4 sm:gap-6">
              <h1 className="text-center text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent tracking-wide">
                Securox
              </h1>
              <p className="text-center font-semibold text-gray-600 text-sm sm:text-base">
                A Smarter Way to Manage Credentials
              </p>
              <input
                value={form.site}
                onChange={handlechange}
                type="text"
                name="site"
                className="p-2 sm:p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Website URL"
              />
      
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <input
                  value={form.username}
                  onChange={handlechange}
                  className="flex-1 p-2 sm:p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <div className="relative flex-1">
                  <input
                    ref={passwordref}
                    value={form.password}
                    onChange={handlechange}
                    className="w-full p-2 sm:p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    className="absolute right-2 top-2.5 cursor-pointer"
                    onClick={showpassword}
                  >
                    <img ref={ref} src="/eye-close.jpg" alt="eye" width={40} height={30} />
                  </span>
                </div>
              </div>
      
              <div className="flex justify-center items-center">
                <button
                  onClick={savePassword}
                  className="bg-gray-300 hover:bg-gray-200 text-shadow-gray-50 items-center justify-center rounded-xl px-6 py-2 w-fit border border-gray-600"
                >
                  Save
                </button>
              </div>
            </div>
      
            <hr className="my-6 mx-4" />
      
            <div className="passwords mx-3 overflow-x-auto">
              <h1 className="text-gray-600 font-bold py-3 text-center sm:text-left text-lg sm:text-xl">
                Your Credentials
              </h1>
              {passwordsArray.length === 0 && <div className="text-center py-3">No Any Credentials Currently</div>}
              {passwordsArray.length !== 0 && (
                <table className="table-auto w-full min-w-[600px] sm:min-w-full rounded-2xl overflow-hidden m-2">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="py-2 px-2 sm:px-4">Website</th>
                      <th className="py-2 px-2 sm:px-4">UserName</th>
                      <th className="py-2 px-2 sm:px-4">Password</th>
                      <th className="py-2 px-2 sm:px-4">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {passwordsArray.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-200 py-2 px-2 sm:px-4">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <a href={item.site} target="_blank" rel="noopener noreferrer" className="truncate max-w-[100px] sm:max-w-full">
                              {item.site}
                            </a>
                            <div className="icon cursor-pointer m-2" onClick={() => copyText(item.site)}>
                              <FaCopy />
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-200 py-2 px-2 sm:px-4">
                          <div className="flex items-center justify-center gap-1 sm:gap-2 truncate max-w-[100px] sm:max-w-full">
                            <span>{item.username}</span>
                            <div className="icon cursor-pointer m-2" onClick={() => copyText(item.username)}>
                              <FaCopy />
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-200 py-2 px-2 sm:px-4">
                          <div className="flex items-center justify-center gap-1 sm:gap-2 truncate max-w-[100px] sm:max-w-full">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div className="icon cursor-pointer m-2" onClick={() => copyText(item.password)}>
                              <FaCopy />
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-200 py-2 px-2 sm:px-4">
                          <div className="flex items-center justify-center gap-4 text-lg">
                            <span onClick={() => editPassword(item.id)}>
                              <FaUserEdit />
                            </span>
                            <span onClick={() => deletePassword(item.id)}>
                              <MdDelete />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      );
      
}

export default MyManager
