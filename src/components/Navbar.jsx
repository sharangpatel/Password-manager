import React from 'react'

const Navbar = () => {
  return (
    <nav  className="bg-slate-800 text-white">
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className='logo font-bold text-2xl'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-3'>
            <a href='#' className='hover:font-bold'>Home</a>
            <a href='#' className='hover:font-bold'>Contact</a>
            <a href='#' className='hover:font-bold'>SignUp</a>
          </li>
        </ul> */}
        <button className='text-white bg-green-900 my-5 rounded-full flex justify-between items-center'>
          <img className='invert w-10 p-1' src='/src/assets/github (1).png' alt='gitLogo'/>
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div> 
    </nav>
  )
}

export default Navbar
