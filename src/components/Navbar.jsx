import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-800 text-white py-2'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">iTask</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer transition-all hover:text-slate-800 font-bold'>Home</li>
        <li className='cursor-pointer transition-all  hover:text-slate-800 font-bold'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
