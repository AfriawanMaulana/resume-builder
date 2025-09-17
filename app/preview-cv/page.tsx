"use client"
import { ArrowLeft, Download, Phone, Mail, Locate, Linkedin, Calendar, Building } from "lucide-react";
import Link from "next/link";
import {
  Page as PDFPage, Text, View, Document, StyleSheet, pdf,
  Svg,
  Path,
  
} from "@react-pdf/renderer";

import { useEffect, useState } from "react";


/* === SVG ICONS FOR PDF === */
// 🎯 SVG Icons untuk PDF (dengan @react-pdf/renderer)
const Icons = {
  Phone: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="14" height="14">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2
           19.79 19.79 0 0 1-8.63-3.07
           19.5 19.5 0 0 1-6-6
           19.79 19.79 0 0 1-3.07-8.63
           A2 2 0 0 1 4.11 2h3
           a2 2 0 0 1 2 1.72
           c.12.81.37 1.6.73 2.34
           .21.45.1.99-.24 1.34L8.09 8.91
           a16 16 0 0 0 6 6l1.51-1.51
           a1.25 1.25 0 0 1 1.34-.24
           c.74.36 1.53.61 2.34.73
           a2 2 0 0 1 1.72 2.03z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  ),

  Mail: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="14" height="14">
      <Path
        d="M4 4h16v16H4V4z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M22 6 12 13 2 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  ),

  Location: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="14" height="14">
      <Path
        d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  ),

  Linkedin: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="14" height="14">
      <Path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7
           a2 2 0 0 0-4 0v7h-4v-7
           a6 6 0 0 1 6-6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M2 9h4v12H2z" stroke={color} strokeWidth={2} fill="none" />
      <Path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  ),

  Calendar: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="10" height="10">
      <Path
        d="M3 4h18v18H3z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M16 2v4M8 2v4M3 10h18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  ),

  Building: ({ color }: { color: string }) => (
    <Svg viewBox="0 0 24 24" width="10" height="10">
      <Path
        d="M3 21V7a2 2 0 0 1 2-2h4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v14h-4v-4H7v4H3zM9 9h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  ),
};



export default function Page() {
    const [themeColor, setThemeColor] = useState("#8b5cf6");
    const [language, setLanguage] = useState("id");
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

    useEffect(() => {
      if (typeof window !== "undefined") {
        const getDraft = localStorage.getItem("resume-draft");
        if (getDraft) {
          const draft = JSON.parse(getDraft);
          setDataForm(draft);
        }
      }
    }, [])

    const styles = (themeColor: string) =>
      StyleSheet.create({
        page: { backgroundColor: "#ffffff", padding: 30, fontSize: 11 },
        header: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
        subHeader: { fontSize: 14, marginBottom: 10, color: "#555" },
        section: { marginBottom: 20 },
        sectionTitle: {
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 6,
          color: themeColor,
        },
        text: { marginBottom: 3, fontSize: 10, color: "#333" },
        row: { flexDirection: "row", alignItems: "center", gap: 4 },
        flexRow: { flexDirection: "row", justifyContent: "space-between" },
        italic: { fontStyle: "italic", fontSize: 11, color: "#555" },
      });

    // 🎯 Resume Document
    const ResumePDF = ({ themeColor }: { themeColor: string }) => {
      const s = styles(themeColor);
      return (
        <Document>
          <PDFPage size="A4" style={s.page}>
            {/* Header */}
            <View style={s.section}>
              <Text style={s.header}>{dataForm?.fullname ?  dataForm?.fullname : "John Doe"}</Text>
              <Text style={s.subHeader}>{}</Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                <View style={s.row}>
                  <Icons.Phone color={themeColor} />
                  <Text>{dataForm.phone ? dataForm.phone : "(123) 456-7890"}</Text>
                </View>
                <View style={s.row}>
                  <Icons.Mail color={themeColor} />
                  <Text>{dataForm.email ? dataForm.email : "youremail@example.com"}</Text>
                </View>
                <View style={s.row}>
                  <Icons.Location color={themeColor} />
                  <Text>{dataForm.address ? dataForm.address : "Surabaya, Indonesia"}</Text>
                </View>
              </View>
              <View style={s.row}>
                <Icons.Linkedin color={themeColor} />
                <Text>{dataForm.linkedin ? dataForm.linkedin : "johndoe"}</Text>
              </View>
            </View>
            <View style={{ borderBottom: "1px solid #ccc", marginBottom: 20 }}></View>

            {/* Summary */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Ringkasan Profesional</Text>
              <Text style={s.text}>
                {dataForm.summary ? dataForm.summary : `
                  Profesional IT berpengalaman 5+ tahun dengan keahlian dalam
                  pengembangan web dan mobile. Memiliki track record dalam memimpin
                  tim dan mengembangkan solusi teknologi inovatif.
                `}
              </Text>
            </View>

            {/* Experience */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Pengalaman Kerja</Text>
              {dataForm.experience && dataForm.experience.length > 0 ? (
                dataForm.experience.map((exp, index) => (
                  <View key={index} style={{ marginBottom: 4 }}>
                    <View style={s.flexRow}>
                      <Text style={{ fontWeight: "bold" }}>{exp.position}</Text>
                      <View style={s.row}>
                        <Icons.Calendar color="#555" />
                        <Text style={s.italic}>{exp.period_start} - {exp.period_end}</Text>
                      </View>
                    </View>
                    <View style={s.row}>
                      <Icons.Building color="#555" />
                      <Text style={s.italic}>{exp.company_name}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      {exp.description_task &&
                      exp.description_task
                        .split(",")
                        .map((task, idx) => (
                          <Text key={idx} style={s.text}>
                            • {task.trim()}
                          </Text>
                        ))}
                    </View>
                  </View>
                )
              )) : null}
            </View>

            {/* Education */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Pendidikan</Text>
              {dataForm.education && dataForm.education.length > 0 ? (
                dataForm.education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 4 }}>
                    <View style={s.flexRow}>
                      <Text style={{ fontWeight: "bold" }}>{edu.level} {edu.major}</Text>
                      <View style={s.row}>
                        <Icons.Calendar color="#555" />
                        <Text style={s.italic}>{edu.graduation}</Text>
                      </View>
                    </View>
                    <View style={s.row}>
                      <Icons.Building color="#555" />
                      <Text style={s.italic}>{edu.institutions}</Text>
                    </View>
                  </View>
                ))
              ): null}
            </View>

            {/* Skills */}
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View style={[s.section, { flex: 1 }]}>
                <Text style={s.sectionTitle}>Hard Skills</Text>
                <Text style={s.text}>
                  JavaScript, React, Node.js, Python, SQL, Git, Docker, AWS
                </Text>
              </View>
              <View style={[s.section, { flex: 1 }]}>
                <Text style={s.sectionTitle}>Soft Skills</Text>
                <Text style={s.text}>
                  Kepemimpinan, Komunikasi, Manajemen Waktu, Problem Solving
                </Text>
              </View>
            </View>
          </PDFPage>
        </Document>
      );
    }

    
    const handleDownload = async () => {
      const blob = await pdf(<ResumePDF themeColor={themeColor} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <section className="mt-20 flex flex-col space-y-10 w-full h-auto items-center pb-10">
                <h1 className="font-bold text-3xl md:text-4xl">Preview Your Resume</h1>

                <div className="flex flex-wrap justify-center md:justify-between items-center w-2/3 py-2">
                    {/* Left buttons */}
                    <div className="flex space-x-4 items-center">
                        <Link 
                            href={'/build-resume'} 
                            className="inline-flex items-center gap-4 p-2 w-36 justify-center rounded-md text-sm font-semibold"
                            style={{ border: "1px solid #d1d5db", backgroundColor: "#ffffff", color: "#000000" }}
                        >
                            <ArrowLeft className="h-5 w-5" /> Back
                        </Link>

                        <button onClick={handleDownload} className="cursor-pointer inline-flex items-center gap-2 p-2 w-40 justify-center rounded-md text-sm font-semibold text-white bg-violet-500">
                          <Download className="h-5 w-5" />
                          Download PDF
                        </button>
                    </div>

                    {/* Color Picker */}
                    <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 items-center mt-4 md:mt-0">
                        <div className="flex gap-2">
                            {["#8b5cf6", "#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#000000"].map((color) => (
                                <button
                                    key={color}
                                    className="w-6 h-6 rounded-full border-2"
                                    style={{ backgroundColor: color, borderColor: themeColor === color ? "#000000" : "#ffffff" }}
                                    onClick={() => setThemeColor(color)}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setLanguage("id")} className="py-1 px-3 rounded-md border border-black/40 dark:border-white/30 hover:cursor-pointer hover:bg-violet-100">Indonesian</button>
                            <button onClick={() => setLanguage("en")} className="py-1 px-3 rounded-md border border-black/40 dark:border-white/30 hover:cursor-pointer hover:bg-violet-100">English</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resume Preview */}
            <section className="w-full flex justify-center mb-20 py-10">
                <div style={{ border: "1px solid #d1d5db", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                    <div 
                        id="resume-preview"
                        className="w-[794px] min-h-[1123px] p-10 md:p-16 space-y-6 bg-white"
                    >
                        {/* Profile */}
                        <div className="flex flex-col space-y-3 text-black">
                            <h1 className="font-bold text-3xl">{dataForm?.fullname ? dataForm?.fullname : "John Doe"}</h1>
                            <h2 style={{ color: "#4b5563" }}>Frontend Developer</h2>
                            <ul className="flex flex-wrap gap-4">
                                <li className="inline-flex gap-2 items-center text-sm">
                                    <Phone className="w-4 h-4" style={{ color: themeColor }}/> {dataForm.phone ? dataForm.phone : "(123) 456-7890"}
                                </li>
                                <li className="inline-flex gap-2 items-center text-sm">
                                    <Mail className="w-4 h-4" style={{ color: themeColor }}/> {dataForm.email ? dataForm.email : "youremail@example.com"}
                                </li>
                                <li className="inline-flex gap-2 items-center text-sm">
                                    <Locate className="w-4 h-4" style={{ color: themeColor }}/> {dataForm.address ? dataForm.address : "Surabaya, Indonesia"}
                                </li>
                            </ul>
                            <p className="inline-flex gap-2 items-center text-sm">
                                <Linkedin className="w-4 h-4" style={{ color: themeColor }}/> {dataForm.linkedin ? dataForm.linkedin : "johndoe"}
                            </p>
                        </div>

                        <div style={{ border: "1px solid #d1d5db" }}></div>

                        {/* Summary */}
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h1 className="font-bold text-lg mb-2" style={{ color: themeColor }}>{language === "id" ? "Ringkasan Profesional" : "Professional Summary" }</h1>
                                <p className="text-black">
                                  {dataForm.summary ? dataForm.summary : `
                                    Profesional IT berpengalaman 5+ tahun dengan keahlian dalam pengembangan web dan mobile. 
                                    Memiliki track record dalam memimpin tim dan mengembangkan solusi teknologi yang inovatif 
                                    untuk meningkatkan efisiensi bisnis dan pengalaman pengguna.
                                  `}
                                    
                                </p>
                            </div>

                            <div>
                                <h1 className="font-bold text-lg mb-2" style={{ color: themeColor }}>{language === "id" ? "Pengalaman Kerja" : "Work Experience"}</h1>
                                {dataForm.experience && dataForm.experience.length > 0 ? (
                                    <>
                                      {dataForm.experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                          <div className="flex items-center justify-between">
                                              <h2 className="font-bold text-black">{exp.position ? exp.position : "Software Engineer"}</h2>
                                              <span className="inline-flex gap-2 items-center text-sm" style={{ color: "#4b5563" }}>
                                                  <Calendar className="w-4 h-4" style={{ color: "#4b5563" }} /> {exp.period_start ? exp.period_start : "Jan 2020"} - {exp.period_end ? exp.period_end : "Present"}
                                              </span>
                                          </div>
                                          <h3 className="italic text-sm inline-flex gap-1 items-center" style={{ color: "#4b5563" }}>
                                              <Building className="w-3 h-3" style={{ color: "#4b5563" }} /> {exp.company_name ? exp.company_name : "Tech Solutions Inc."}
                                          </h3>
                                          <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-black">
                                              {exp.description_task ? exp.description_task.split(",").map((task, index) => (
                                                <li key={index}>{task.trim()}</li>
                                              )) : (
                                                <>
                                                  <li>Developed web and mobile applications using React and Node.js</li>
                                                  <li>Led a team of 5 developers to deliver projects on time</li>
                                                  <li>Implemented CI/CD pipelines to streamline deployment processes</li>
                                                  <li>Collaborated with cross-functional teams to define project requirements</li>
                                                </>
                                              )}
                                          </ul>
                                        </div>
                                      ))}
                                    </>                                    
                                  ) : <></>}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="flex flex-col space-y-4">
                          {dataForm.education && dataForm.education.length > 0 ? (
                            <>
                              {dataForm.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <h1 className="font-bold text-lg mb-2" style={{ color: themeColor }}>{language === "id" ? "Pendidikan" : "Education"}</h1>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold text-black">{edu.level ? edu.level : "Bachelor's Degree of "}{edu.major ? edu.major : "Computer Science"}</h2>
                                        <span className="inline-flex gap-2 items-center text-sm" style={{ color: "#4b5563" }}>
                                            <Calendar className="w-4 h-4" style={{ color: "#4b5563" }} /> {edu.graduation ? edu.graduation : "2020"}
                                        </span>
                                    </div>
                                    <h3 className="italic text-sm inline-flex gap-1 items-center" style={{ color: "#4b5563" }}>
                                        <Building className="w-3 h-3" style={{ color: "#4b5563" }} /> {edu.institutions ? edu.institutions : "Harvard University"}
                                    </h3>
                                </div>
                              ))}
                            </>
                          ) : <></>}
                        </div>

                        {/* Skills */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h1 className="font-bold text-lg mb-2" style={{ color: themeColor }}>Hard Skills</h1>
                                <p className="text-black">JavaScript, React, Node.js, Python, SQL, Git, Docker, AWS</p>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg mb-2" style={{ color: themeColor }}>Soft Skills</h1>
                                <p className="text-black">Kepemimpinan, Komunikasi, Manajemen Waktu, Problem Solving</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
