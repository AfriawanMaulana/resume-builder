"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { PlusCircle, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';



export default function Page() {
    const [step, setStep] = useState(1);
    const [openPrompt, setOpenPrompt] = useState(false);
    const [draftLog, setDraftLog] = useState(false);
    const [dataForm, setDataForm] = useState({
        //? User Data
        fullname: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        portfolio: '', // Fixed typo: was "porfolio"

        //? Summary
        summary: '',

        //? Experience
        experience: [
            {
                company_name: '',
                position: '',
                company_location: '',
                period_start: '',
                period_end: '',
                description_task: '', 
            }
        ],

        //? Education
        education: [
            {
                institutions: '',
                level: '',
                major: '',
                graduation: '',
                achievement: '' // Fixed typo: was "achievment"
            }
        ],

        //? Skills
        hard_skill: '',
        soft_skill: '',

        //? Language
        language: '',

        //? Certificate
        certificate: '', // Fixed typo: was "sertificate"

        //? Project
        project: ''
    });

    const userData = [
        { header: "Data Pribadi" },
        { header: "Ringkasan" },
        { header: "Pengalaman" },
        { header: "Pendidikan" },
        { header: "Keterampilan" },
        { header: "Bahasa" },
        { header: "Sertifikat" },
        { header: "Project" },
    ];

    //? Form Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});
    };

    //? Experience Change Handler
    const handleExperienceChange = (index: number, field: string, value: string) => {
        const updatedExperience = [...dataForm.experience];
        updatedExperience[index] = { ...updatedExperience[index], [field]: value };
        setDataForm({ ...dataForm, experience: updatedExperience });
    };

    //? Education Change Handler
    const handleEducationChange = (index: number, field: string, value: string) => {
        const updatedEducation = [...dataForm.education];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setDataForm({ ...dataForm, education: updatedEducation });
    };

    //? Add Experience
    const addExperience = () => {
        setDataForm({
            ...dataForm,
            experience: [
                ...dataForm.experience,
                {
                    company_name: '',
                    position: '',
                    company_location: '',
                    period_start: '',
                    period_end: '',
                    description_task: '',
                }
            ]
        });
    };

    //? Remove Experience
    const removeExperience = (index: number) => {
        if (dataForm.experience.length > 1) {
            const updatedExperience = dataForm.experience.filter((_, i) => i !== index);
            setDataForm({ ...dataForm, experience: updatedExperience });
        }
    };

    //? Add Education
    const addEducation = () => {
        setDataForm({
            ...dataForm,
            education: [
                ...dataForm.education,
                {
                    institutions: '',
                    level: '',
                    major: '',
                    graduation: '',
                    achievement: ''
                }
            ]
        });
    };

    //? Remove Education
    const removeEducation = (index: number) => {
        if (dataForm.education.length > 1) {
            const updatedEducation = dataForm.education.filter((_, i) => i !== index);
            setDataForm({ ...dataForm, education: updatedEducation });
        }
    };

    //? Save Draft
    const saveDraft = (e: React.SyntheticEvent) => {
        e.preventDefault();
        localStorage.setItem('resume-draft', JSON.stringify(dataForm));
        toast.success('Draft saved successfully!', { position: "bottom-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light",
        });
    };

    //? Generate AI Summary (mock function)
    const generateAISummary = async () => {
        const res = await fetch("/api/gemini", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: `
                Summarize the following resume into a short professional profile (3-5 sentences).
                Write the results directly, without prefixes, introductions, or additional explanations.
                ---
                Experience: ${dataForm.experience.map(exp => `${exp.position} at ${exp.company_name} (${exp.period_start} - ${exp.period_end})`).join("; ")}
                Education: ${dataForm.education.map(edu => `${edu.level} in ${edu.major} from ${edu.institutions} (${edu.graduation})`).join("; ")}
                Certificate: ${dataForm.certificate}
                Hard Skills: ${dataForm.hard_skill}
                Soft Skills: ${dataForm.soft_skill}
            ` })

        })

        const data = await res.json();
        setDataForm({ ...dataForm, summary:  data.summary});
        setOpenPrompt(false);
    };

    useEffect(() => {
        //? Get Draft
        if (typeof window !== "undefined") {
            const draft = localStorage.getItem("resume-draft");
            if (draft) {
                try {
                    const getDraft = JSON.parse(draft);
                    setDataForm((prev) => ({
                        ...prev, 
                        ...getDraft,
                        experience: getDraft.experience || prev.experience,
                        education: getDraft.education || prev.education,
                    }));
                    setDraftLog(true)
                } catch (err) {
                    console.error("Error parsing draft:", err);
                }
            } else {
                setDraftLog(false);
            }
        }
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <section className="mt-20 flex flex-col space-y-20 w-full h-auto items-center pb-10">
            
                {/* Show Draft Log */}
                {draftLog && (
                    <div className="flex absolute z-10 w-full h-screen items-center justify-center backdrop-blur-xs">
                        <div className="bg-white p-4 rounded-xl w-96 flex flex-col items-center justify-center space-y-10 shadow shadow-black/20">
                            <h1 className="font-semibold text-2xl">Continue editing draft?</h1>
                            <div className="grid grid-cols-2 items-center gap-4 w-full text-white">
                                <button
                                    onClick={(e) => { 
                                        e.preventDefault();
                                        setDraftLog(false);
                                        localStorage.removeItem('resume-draft');
                                        window.location.href = window.location.href;
                                    }} 
                                    className="bg-red-500 rounded-md p-1 cursor-pointer"
                                >
                                    No
                                </button>
                                <button 
                                    onClick={(e) => { 
                                        e.preventDefault();
                                        setDraftLog(false);
                                    }} 
                                    className="bg-green-500 rounded-md p-1 cursor-pointer"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <h1 className="font-bold text-4xl text-center">Lengkapi Data CV Kamu</h1>
                </div>
                <div className="shadow-lg shadow-black/10 rounded-xl w-[90%] md:w-[70%] h-auto p-5 md:pt-10 md:px-10 bg-white">
                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap items-center md:justify-evenly bg-slate-100 rounded-md p-1 mb-8">
                        {userData.map((item, index) => (
                            <button 
                                key={index + 1} 
                                className={`${step === index + 1 ? 'bg-white/80 opacity-100 shadow-sm' : 'opacity-50'} cursor-pointer rounded-sm py-1.5 w-24 transition-all duration-200 ease-in-out font-semibold text-sm hover:opacity-75`}
                                onClick={() => setStep(index + 1)}
                            >
                                {item.header}
                            </button>
                        ))}
                    </div>

                    {/* Form Data Pribadi */} 
                    {step === 1 && (
                        <motion.form 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    name="fullname"
                                    value={dataForm.fullname}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama lengkap" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Nomor Telepon</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={dataForm.phone}
                                    onChange={handleChange}
                                    placeholder="+62 812 3456 7890" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Alamat</label>
                                <input 
                                    type="text" 
                                    name="address"
                                    value={dataForm.address}
                                    onChange={handleChange}
                                    placeholder="Kota, Provinsi" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">LinkedIn</label>
                                <input 
                                    type="url" 
                                    name="linkedin"
                                    value={dataForm.linkedin}
                                    onChange={handleChange}
                                    placeholder="linkedin.com/in/username" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Website/Portfolio</label>
                                <input 
                                    type="url" 
                                    name="portfolio"
                                    value={dataForm.portfolio}
                                    onChange={handleChange}
                                    placeholder="https://yourwebsite.com" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </motion.form>
                    )} 

                    {/* Form Ringkasan */} 
                    {step === 2 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="font-medium">Ringkasan Profesional</label>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            setOpenPrompt(!openPrompt);
                                        }} 
                                        className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200 cursor-pointer hover:bg-violet-200 transition-colors"
                                    >
                                        <Sparkles className="h-4 w-4" /> Generate with AI
                                    </button>
                                </div>

                                {openPrompt && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-violet-50 rounded-lg border border-violet-200 mb-4"
                                    >
                                        <p className="text-sm text-violet-700 mb-3">
                                            Klik tombol di bawah untuk generate ringkasan profesional menggunakan AI
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={generateAISummary}
                                                className="px-3 py-1 bg-violet-600 text-white rounded text-sm hover:bg-violet-700 transition-colors"
                                            >
                                                Generate
                                            </button>
                                            <button
                                                onClick={() => setOpenPrompt(false)}
                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                <textarea 
                                    name="summary"
                                    value={dataForm.summary}
                                    onChange={handleChange}
                                    placeholder="Tuliskan ringkasan profesional Anda dalam 3-5 kalimat yang menggambarkan pengalaman, keahlian, dan tujuan karier Anda." 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-40 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </motion.div>
                    )} 

                    {/* Form Pengalaman */} 
                    {step === 3 && (
                        <div className="flex flex-col space-y-6">
                            {dataForm.experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.6 }} 
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md border p-4 rounded-xl relative"
                                >
                                    <div className="flex justify-between items-center col-span-1 md:col-span-2">
                                        <h1 className="font-semibold">
                                            Pengalaman Kerja {index + 1}
                                        </h1>
                                        {dataForm.experience.length > 1 && (
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Nama Perusahaan</label>
                                        <input 
                                            type="text" 
                                            value={exp.company_name}
                                            onChange={(e) => handleExperienceChange(index, 'company_name', e.target.value)}
                                            placeholder="Masukkan nama perusahaan" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Posisi</label>
                                        <input 
                                            type="text" 
                                            value={exp.position}
                                            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                            placeholder="Engineer" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Lokasi</label>
                                        <input 
                                            type="text" 
                                            value={exp.company_location}
                                            onChange={(e) => handleExperienceChange(index, 'company_location', e.target.value)}
                                            placeholder="Surabaya, Indonesia" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Periode</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <input 
                                                type="text" 
                                                value={exp.period_start}
                                                onChange={(e) => handleExperienceChange(index, 'period_start', e.target.value)}
                                                placeholder="Jan 2025" 
                                                className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                            />
                                            <input 
                                                type="text" 
                                                value={exp.period_end}
                                                onChange={(e) => handleExperienceChange(index, 'period_end', e.target.value)}
                                                placeholder="Present" 
                                                className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
                                        <label className="font-medium">Deskripsi Tugas</label>
                                        <textarea  
                                            value={exp.description_task}
                                            onChange={(e) => handleExperienceChange(index, 'description_task', e.target.value)}
                                            placeholder="Jelaskan tanggung jawab dan pencapaian Anda di posisi ini." 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 h-28 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                            <button 
                                onClick={addExperience}
                                className="col-span-2 p-3 shadow-sm rounded-md border inline-flex items-center gap-2 justify-center hover:cursor-pointer hover:bg-slate-100 hover:scale-[1.01] transition-all duration-200"
                            >
                                <PlusCircle className="w-4 h-4" /> Tambahkan Pengalaman Kerja
                            </button>
                        </div>
                    )} 

                    {/* Form Pendidikan */} 
                    {step === 4 && (
                        <div className="flex flex-col space-y-6">
                            {dataForm.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.6 }} 
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md border p-4 rounded-xl relative"
                                >
                                    <div className="flex justify-between items-center col-span-1 md:col-span-2">
                                        <h1 className="font-semibold">
                                            Pendidikan {index + 1}
                                        </h1>
                                        {dataForm.education.length > 1 && (
                                            <button
                                                onClick={() => removeEducation(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Nama Institusi</label>
                                        <input 
                                            type="text" 
                                            value={edu.institutions}
                                            onChange={(e) => handleEducationChange(index, 'institutions', e.target.value)}
                                            placeholder="Harvard University" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Jenjang</label>
                                        <input 
                                            type="text" 
                                            value={edu.level}
                                            onChange={(e) => handleEducationChange(index, 'level', e.target.value)}
                                            placeholder="S1 / Bachelor's Degree" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Jurusan</label>
                                        <input 
                                            type="text" 
                                            value={edu.major}
                                            onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                                            placeholder="Teknik Informatika" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="font-medium">Tahun Lulus</label>
                                        <input 
                                            type="text" 
                                            value={edu.graduation}
                                            onChange={(e) => handleEducationChange(index, 'graduation', e.target.value)}
                                            placeholder="2025" 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
                                        <label className="font-medium">Pencapaian (Opsional)</label>
                                        <textarea  
                                            value={edu.achievement}
                                            onChange={(e) => handleEducationChange(index, 'achievement', e.target.value)}
                                            placeholder="Prestasi akademik, kegiatan organisasi, atau proyek penelitian yang relevan." 
                                            className="p-3 rounded-md border-2 bg-slate-100/20 h-28 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                            <button 
                                onClick={addEducation}
                                className="col-span-2 p-3 shadow-sm rounded-md border inline-flex items-center gap-2 justify-center hover:cursor-pointer hover:bg-slate-100 hover:scale-[1.01] transition-all duration-200"
                            >
                                <PlusCircle className="w-4 h-4" /> Tambahkan Pendidikan
                            </button>
                        </div>
                    )} 

                    {/* Form Keterampilan */} 
                    {step === 5 && (
                        <motion.form 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Hard Skills</label>
                                <textarea 
                                    name="hard_skill"
                                    value={dataForm.hard_skill}
                                    onChange={handleChange}
                                    placeholder="Masukkan keterampilan teknis Anda, dipisahkan dengan tanda koma. Contoh: Python, JavaScript, SQL, Adobe Photoshop, Microsoft Excel" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-24 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Soft Skills</label>
                                <textarea 
                                    name="soft_skill"
                                    value={dataForm.soft_skill}
                                    onChange={handleChange}
                                    placeholder="Masukkan keterampilan non-teknis Anda, dipisahkan dengan tanda koma. Contoh: Komunikasi, Kepemimpinan, Manajemen Waktu, Problem Solver" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-24 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </motion.form>
                    )} 

                    {/* Form Bahasa */} 
                    {step === 6 && (
                        <motion.form 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Bahasa</label>
                                <textarea 
                                    name="language"
                                    value={dataForm.language}
                                    onChange={handleChange}
                                    placeholder="Masukkan bahasa yang Anda kuasai beserta tingkat kemampuannya. Contoh: Bahasa Indonesia (Native), English (C1)" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-24 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </motion.form>
                    )} 

                    {/* Form Sertifikat */} 
                    {step === 7 && (
                        <motion.form 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Sertifikat / Pelatihan</label>
                                <textarea 
                                    name="certificate"
                                    value={dataForm.certificate}
                                    onChange={handleChange}
                                    placeholder="Masukkan sertifikat atau pelatihan yang Anda miliki. Contoh: AWS Certified Solutions Architect - Amazon Web Services (2023)" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-32 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </motion.form>
                    )} 

                    {/* Form Project */} 
                    {step === 8 && (
                        <motion.form 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.6 }} 
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="flex flex-col space-y-2">
                                <label className="font-medium">Project</label>
                                <textarea 
                                    name="project"
                                    value={dataForm.project}
                                    onChange={handleChange}
                                    placeholder="Masukkan project yang relevan. Format: Nama Project - Deskripsi Singkat - Link (opsional). Contoh: E-commerce website - Mengembangkan website e-commerce menggunakan NextJs dan Node.js - github.com/username/project" 
                                    className="p-3 rounded-md border-2 bg-slate-100/20 h-32 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </motion.form>
                    )} 

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center p-2 mt-10">
                        <Link 
                            href={'/preview-cv'}
                            className="p-3 rounded-md border bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors font-medium text-center"
                        >
                            Preview CV
                        </Link>
                        {/* <button 
                            className="p-3 rounded-md border bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors font-medium"
                            
                        >
                            Download PDF
                        </button> */}
                        <button 
                            className="p-3 rounded-md border bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors font-medium"
                            onClick={saveDraft}
                        >
                            Simpan Draft
                        </button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}