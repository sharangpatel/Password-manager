import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const imgRef = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords);
    setpasswordArray(passwords);
  }

  useEffect(() => {
      getPasswords()
  }, []);

  const copyText = (text) => {
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(imgRef.current.src);
    if (imgRef.current.src.includes("/src/assets/hiddenEye.png")) {
      passwordRef.current.type = "password";
      imgRef.current.src = "/src/assets/showEye.png";
    } else {
      imgRef.current.src = "/src/assets/hiddenEye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async() => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){


      //if any such entries exists in the db, delete it!
      //await fetch("http://localhost:3000/", { method:"DELETE" , headers :{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})}) 

      setpasswordArray([...passwordArray, {...form,id:uuidv4() }]);

      await fetch("http://localhost:3000/", { method:"POST" , headers :{"Content-Type":"application/json"},body:JSON.stringify({...form,id: uuidv4()}) })
      setform({site:"",username:"",password:""})
    }else{
      toast("All the fileds should be min of 4 characters", { position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
   
    
  };


  const deletePassword =async (id) => {
    console.log("Deleting pass with id",id);
    let c = confirm("Do you really want to delete this password ?")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id));
      let res =await fetch("http://localhost:3000/", { method:"DELETE" , headers :{"Content-Type":"application/json"},body:JSON.stringify({id})})
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast("Deleted successfully!", { position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
    
  };


  const editPassword = (id) => {
    console.log("Editing pass with id",id);
    setform({...passwordArray.filter(i => i.id === id )[0],id:id})
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
  };


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:p-0 md:mycontainer max-w-4xl min-h-[86.2vh]">
        <h1 className="text-4xl font-bold text-center pt-4">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter Website URL"
            name="site"
            id="site"
            className="rounded-full border border-green-500 w-full p-4 py-1"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
              />
              <span
                className="absolute right-0 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={imgRef}
                  className="p-1"
                  width={26}
                  src="/src/assets/showEye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex bg-green-500 hover:bg-green-700 rounded-full text-white font-semibold py-3 px-6 w-fit border border-green-900"
          >
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl text-center py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show!</div>}
          {passwordArray.length != 0 && 
          (
            <table className="table-auto w-full rounded-md overflow-hidden mb-14">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center justify-center py-2 border border-white text-center ">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy cursor-pointer size-7"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px 0 0 4px",
                            }}
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "20px",
                                padding: "4px 0 0 4px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "20px",
                                padding: "4px 0 0 4px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <span className='cursor-pointer size-7 mx-2' onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover"
                            style={{
                                width: "25px",
                                height: "25px",
                                padding: "4px 0 0 4px",
                              }}
                          ></lord-icon>
                        </span>
                        <span className='cursor-pointer size-7 mx-2' onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                             src="https://cdn.lordicon.com/hjbrplwk.json"
                            trigger="hover"
                            style={{
                                width: "25px",
                                height: "25px",
                                padding: "4px 0 0 4px",
                              }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
