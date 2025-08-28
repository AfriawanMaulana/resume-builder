// "use client"
// import { useState } from "react";

// const PersonalData = () => {
//     const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     jobTitle: '',
//     address: '',
//     phone: '',
//     email: '',
//     description: '',
//     experience: '',
//     skills: '',
//     education: '',
//   });

//   const [themeColor, setThemeColor] = useState('#9333ea');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//     return (
//         <div>
//             {/* Form Input */}
//         <form className="bg-white rounded-md border-t-6 border-purple-500 shadow-xl p-6 w-full md:max-h-screen hide-scrollbar overflow-y-auto md:w-1/2 space-y-4">
//           <h2 className="text-2xl font-bold">Personal Detail</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>First Name</h1>
//               <input name="firstName" placeholder="First Name" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>Last Name</h1>
//               <input name="lastName" placeholder="Last Name" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//           </div>

//           <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>Job Title</h1>
//               <input name="jobTitle" placeholder="Job Title" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>Address</h1>
//               <input name="address" placeholder="Address" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>Phone</h1>
//               <input name="phone" placeholder="Phone" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//             <div className='flex flex-col'>
//               <h1 className='font-semibold'>Email</h1>
//               <input name="email" placeholder="Email" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
//             </div>
//           </div>

//           <div className='flex flex-col'>
//             <h1 className='font-semibold'>Summary / About Me</h1>
//             <textarea name="description" placeholder="Summary / About Me" className="border rounded-md py-1 px-2 h-24" onChange={handleChange} required />
//           </div>

//           <div className='flex flex-col'>
//             <h1 className='font-semibold'>Experience</h1>
//             <textarea name="experience" placeholder="Experience" className="border rounded-md py-1 px-2 h-24" onChange={handleChange} required />
//           </div>

//           <div className='flex flex-col'>
//             <h1 className='font-semibold'>Skills</h1>
//             <textarea name="skills" placeholder="Skills (comma separated)" className="border rounded-md py-1 px-2 h-24" onChange={handleChange} required />
//           </div>

//           <div className='flex flex-col'>
//             <h1 className='font-semibold'>Education</h1>
//             <textarea name="education" placeholder="Education" className="border rounded-md py-1 px-2 h-24" onChange={handleChange} required />
//           </div>

//           {/* Color Picker */}
//           <div className="flex items-center gap-2">
//             <label>Theme Color:</label>
//             <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} />
//           </div>

//           <button
//             type="button"
//             onClick={downloadPDF}
//             className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
//           >
//             Download PDF
//           </button>
//         </form>
//         </div>
//     )
// }

// export default PersonalData;