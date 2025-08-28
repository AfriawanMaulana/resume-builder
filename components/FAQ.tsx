import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";



const Question = () => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    
    const data = [
        {
            id: 1,
            question: "What is a resume builder?",
            answer: "A resume builder is an app or software program anyone can use to quickly and easily make resumes, cover letters and CVs. Many sites, including Resume Now, offer a resume builder service to help you through every resume section, offering tips and guidance along the way."
        },
        {
            id: 2,
            question: "Is the Resume Builder free?",
            answer: "Our Resume Maker is free to use so you can test out our software and see if it’s worth investing a few dollars in. You can upload your resume, choose a template and fill out every section to see what your final product would look like before you commit. But, you will need to sign up for a subscription to get full access, including premium designs, a cover letter builder and unlimited downloads in whichever file format you need."
        },
        {
            id: 3,
            question: "Are your resumes ATS-friendly?",
            answer: "Yes! All of Resume Now’s resume templates are designed to be easy to scan by both humans and applicant tracking systems (ATS)."
        },
        {
            id: 4,
            question: "Is it OK to use an online resume builder?",
            answer: "Absolutely! Resume generators are a way to get help in your job search. Some people hire a resume writer or ask friends and family for help. Others choose to use a resume builder. Hiring managers and recruiters are aware many job seekers use a builder to help them get started, and their only expectation is that the resume will be customized to reflect the job seeker’s experience."
        }
    ]

    const handleToggleButton = ({id}: { id: number }) => {
        if (activeQuestion === id) {
            setActiveQuestion(null);
            return;
        }
        setActiveQuestion(id)
        
    }

    return (
        <div className="space-y-20 px-10">
            <h1 className="font-extrabold text-4xl text-center">Resuma FAQ</h1>
            <ul className="flex flex-col gap-2 items-center w-full">
                {data.map((item) => (
                    <li key={item.id} className="w-full md:w-1/2 items-center space-y-2">
                        <button onClick={handleToggleButton.bind(null, {id: item.id})} className="p-4 cursor-pointer border-b w-full text-start items-center flex justify-between">
                            <b>{item.question}</b>
                            {activeQuestion === item.id ? <span> -</span> : <span> +</span>}
                        </button>
                        <AnimatePresence>
                            {activeQuestion === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 bg-gray-200 rounded-xl"
                              >
                                <p className="text-start">{item.answer}</p>
                              </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Question;