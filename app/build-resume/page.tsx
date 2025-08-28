'use client';

import Navbar from '@/components/Navbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';

// import html2pdf from 'html2pdf.js';

export default function ResumeBuilder() {
  const [step, setStep] = useState(1);
  // const [totalExperience, setTotalExperience] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    description: '',

    experience_position: '',
    experience_company: '',
    experience_company_city: '',
    experience_company_state: '',
    experience_start: '',
    experience_end: '',
    experience_description: '',
    
    education_place: '',
    education_degree: '',
    education_major: '',
    education_start: '',
    education_end: '',

    skills: '',
  });

  const [themeColor, setThemeColor] = useState('#9333ea');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resumeRef = React.useRef(null);

  const downloadPDF = async () => {
    const elements = resumeRef.current;
    // if (!form.firstName || !form.jobTitle || !form.address || !form.phone || !form.email || !form.description || !form.experience_position || !form.skills || !form.education) return;
    if (!elements) return;
    const canvas = await html2canvas(elements, {
      scale: 2
    });
    // const imgData = canvas.toDataURL('image/png');
    const imgData = canvas.toDataURL('image/png');

// Ukuran asli canvas
const imgWidth = canvas.width;
const imgHeight = canvas.height;

// Ukuran A4 di px
const pdfWidth = 595.28;
const pdfHeight = 841.89;

// Hitung rasio agar gambar fit ke dalam A4
const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

// Ukuran gambar yang akan dimasukkan ke PDF
const finalImgWidth = imgWidth * ratio;
const finalImgHeight = imgHeight * ratio;

const pdf = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'A4',
});

// Tengahin gambar (opsional)
const x = (pdfWidth - finalImgWidth) / 2;
// const y = (pdfHeight - finalImgHeight) / 2;

pdf.addImage(imgData, 'PNG', x, 0, finalImgWidth, finalImgHeight);
pdf.save('resume.pdf');

}
  return (
    <div>
      <Navbar />
      <div className='min-h-screen bg-gray-50 p-6 flex flex-col-reverse md:flex-row gap-8'>
        <div className='w-full md:w-1/2 bg-white shadow-xl p-6 rounded-md'>
          {/* Header */}
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <div className='rounded-md flex gap-4 bg-purple-500 py-1 px-2 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} />
              </div>
            </div>

            <div className='flex gap-2'>
              {step > 1 && 
              <button onClick={() => setStep(step - 1)} className='w-16 cursor-pointer flex items-center justify-center bg-purple-500 p-1 rounded-md text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>}
              <button onClick={() => setStep(step + 1)} className='w-20 flex items-center gap-2 justify-center cursor-pointer bg-purple-500 py-1 px-2 rounded-md text-white'>
                <p>Next</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Form Input */}
          {step === 1 && (
            <form className='space-y-4 relative mt-10 border-t-8 border-purple-500 rounded-md p-4 shadow-xl'>
              <div>
                <h1 className='text-xl font-bold'>Personal Detail</h1>
                <p className='italic'>Get Started with the basic information</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className='flex flex-col'>
                  <h1 className='font-semibold'>First Name</h1>
                  <input name="firstName" value={form.firstName} placeholder="First Name" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-semibold'>Last Name</h1>
                  <input name="lastName" value={form.lastName} placeholder="Last Name" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
                </div>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-semibold'>Job Title</h1>
                <input name="jobTitle" value={form.jobTitle} placeholder="Job Title" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
              </div>
              
              <div className='flex flex-col'>
                <h1 className='font-semibold'>Address</h1>
                <input name="address" value={form.address} placeholder="Address" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className='flex flex-col'>
                  <h1 className='font-semibold'>Phone</h1>
                  <input name="phone" value={form.phone} placeholder="Phone" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-semibold'>Email</h1>
                  <input name="email" value={form.email} placeholder="Email" className="border py-1 px-2 rounded-md" onChange={handleChange} required />
                </div>
              </div>
              {/* <button className='bg-purple-500 p-1 rounded-md w-20 text-white absolute right-3'>Save</button> */}
            </form>
          )}

          {step === 2 && (
            <form className='p-4 border-t-8 rounded-md border-purple-500 space-y-4 mt-10 shadow-xl'>
              <div>
                <h1 className='text-xl font-bold'>Summary</h1>
                <p className='italic'>Add summary for your job title</p>
              </div>
              <div className='flex flex-col'>
                <h1 className='font-semibold'>Add Summary</h1>
                <textarea name="description" value={form.description} className="border rounded-md py-1 px-2 h-24" onChange={handleChange} required />
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <form className='space-y-4 border-t-6 border-purple-500 rounded-md mt-10 border p-4'>
                <div>
                  <h1 className='text-xl font-bold'>Professional Experience</h1>
                  <p className='italic'>Add Your previous Job experience</p>
                </div>

                {/* experience container */}
                <div className='space-y-4 p-4 rounded-md border border-black/50'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Position Title</h1>
                      <input name="experience_position" value={form.experience_position} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Company Name</h1>
                      <input name="experience_company" value={form.experience_company} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>City</h1>
                      <input name="experience_company_city" value={form.experience_company_city} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>State</h1>
                      <input name="experience_company_state" value={form.experience_company_state} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Start Date</h1>
                      <input name="experience_start" value={form.experience_start} type='date' className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>End Date</h1>
                      <input name="experience_end" value={form.experience_end} type='date' className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                  </div>
                  <div >
                    <h1>Summary</h1>
                    <textarea name="experience_description" value={form.experience_description} className="border rounded-md py-1 px-2 w-full h-24" onChange={handleChange}></textarea>
                  </div>
                </div>
              </form>
              <button className='text-purple-500 hover:text-purple-700 text-sm font-semibold'>+ Add More Experience</button>              
            </div>
          )}

          {step === 4 && (
            <div>
              <form className='space-y-4 border-t-6 border-purple-500 rounded-md mt-10 border p-4'>
                <div>
                  <h1 className='text-xl font-bold'>Education</h1>
                  <p className='italic'>Add Your educational details</p>
                </div>

                {/* experience container */}
                <div className='space-y-4 p-4 rounded-md border border-black/50'>
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-sm text-gray-700'>University / School Name</h1>
                    <input name="education_place" value={form.education_place} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                  </div>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Degree</h1>
                      <input name="education_degree" value={form.education_degree} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Major</h1>
                      <input name="education_major" value={form.education_major} className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>Start Date</h1>
                      <input name="education_start" value={form. education_start} type='date' className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-sm text-gray-700'>End Date</h1>
                      <input name="education_end" value={form.education_end} type='date' className="border rounded-md py-1 px-2" onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              </form>
              <div className='flex justify-between'>
                <button className='text-purple-500 hover:text-purple-700 border border-purple-500 rounded-md p-2 mt-2 text-sm font-semibold'>+ Add More Education</button>              
                <button onClick={downloadPDF} className='cursor-pointer text-white hover:bg-purple-700 bg-purple-500 rounded-md p-2 mt-2 text-sm font-semibold w-20'>Save</button>              
              </div>
            </div>
          )}
        </div>








        {/* Preview Resume */}
        <div ref={resumeRef} className="w-full md:w-1/2 bg-[#ffffff] shadow-xl p-6 rounded" style={{ borderTop: `20px solid ${themeColor}` }}>
          <h1 className="text-3xl font-bold text-center" style={{ color: themeColor }}>
            {form.firstName} {form.lastName}
          </h1>
          <p className="text-center text-lg font-semibold">{form.jobTitle}</p>
          <p className="text-center text-sm" style={{ color: themeColor }}>{form.address}</p>

          {form.phone && form.email && (
            <div className='my-2 space-y-1.5'>
              <div className="flex justify-between">
                <p className="text-sm" style={{ color: themeColor }}>
                  {form.phone}
                </p>
                <p className="text-sm" style={{ color: themeColor }}>
                  {form.email}
                </p>
              </div>
              <hr style={{ color: themeColor, border: `2px solid ${themeColor}` }} />
            </div>
          )}

          {form.description && (
            <>
              {/* <h2 className="text-xl font-semibold mb-1" style={{ color: themeColor }}>Summary</h2>s */}
              <p className="mb-4 text-sm break-words whitespace-pre-wrap">{form.description}</p>
              {/* <hr className="my-4" style={{ color: themeColor }} /> */}
            </>
          )}

          {form.experience_position && (
            <>
              <h1 className="text-xl font-bold mb-1 text-center" style={{ color: themeColor }}>Professional Experience</h1>
              <hr style={{ color: themeColor, border: `1px solid ${themeColor}` }} />
              <div className=''>
                <h2 className='font-bold' style={{ color: themeColor }}>{form.experience_position}</h2>
                <div className='flex justify-between'>
                  <p className='text-sm font-semibold'>{form.experience_company}, {form.experience_company_city}, {form.experience_company_state}</p>
                  <p className='text-sm font-semibold' style={{ color: themeColor }}>{form.experience_start} - {form.experience_end}</p>
                </div>
              </div>
              <p className='text-sm'>{form.experience_description}</p>
            </>
          )}

          {/* {form.skills && (
            <>
              <h2 className="text-xl font-semibold mb-1 text-center" style={{ color: themeColor }}>Skills</h2>
              <hr style={{ color: themeColor, border: `1px solid ${themeColor}` }} />
              <ul className="list-disc pl-5 text-sm mb-4">
                {form.skills.split(',').map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
              <hr className="my-4" style={{ color: themeColor }} />
            </>
          )} */}

          {form.education_place && (
            <>
              <h1 className="text-xl font-bold mb-1 text-center" style={{ color: themeColor }}>Education</h1>
              <hr style={{ color: themeColor, border: `1px solid ${themeColor}` }} />
              <div className=''>
                <h2 className='font-bold' style={{ color: themeColor }}>{form.education_place}</h2>
                <div className='flex justify-between'>
                  <p className='text-sm font-semibold'>{form.education_degree} | {form.education_major}</p>
                  <p className='text-sm font-semibold' style={{ color: themeColor }}>{form.education_start} - {form.education_end}</p>
                </div>
              </div>
            </>
          )}

          {/* {form.phone && form.email && (
            <p className="text-sm text-[#4b5563]">
              📞 {form.phone} | ✉️ {form.email}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

