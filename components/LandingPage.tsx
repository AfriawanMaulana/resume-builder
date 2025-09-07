"use client"
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, FileText, Sparkles, Zap, Shield, LayoutGrid, Wand2, Rocket, Star, Quote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Tip: Place this in app/page.tsx or a dedicated route like app/(marketing)/page.tsx
// Assumes you already have a <Navbar />. If not, you can drop this component directly.

const features = [
  {
    icon: <Wand2 className="h-6 w-6" aria-hidden />, 
    title: "AI-Powered Builder",
    desc: "Generate bullet points dan ringkasan profesional dalam hitungan detik.",
  },
  {
    icon: <LayoutGrid className="h-6 w-6" aria-hidden />, 
    title: "Template Modern",
    desc: "Pilih dari koleksi template ATS-friendly yang rapi dan responsif.",
  },
  {
    icon: <Shield className="h-6 w-6" aria-hidden />, 
    title: "Privasi Terjaga",
    desc: "Data kamu aman. Kami tidak menjual atau membagikan resume kamu.",
  },
  {
    icon: <Zap className="h-6 w-6" aria-hidden />, 
    title: "Ekspor Cepat",
    desc: "Download PDF siap kirim dengan satu klik. Tanpa watermark.",
  },
];

const steps = [
  { step: "01", title: "Isi Data", desc: "Masukkan pengalaman, pendidikan, dan skill kamu." },
  { step: "02", title: "Pilih Template", desc: "Sesuaikan warna, layout, dan tipografi." },
  { step: "03", title: "Optimasi AI", desc: "Autotune bullet points & ringkasan profil pakai AI." },
  { step: "04", title: "Ekspor & Apply", desc: "Unduh PDF, buat link publik, dan mulai apply!" },
];

const templates = [
  { name: "Minimalist", tag: "ATS Friendly" },
  { name: "Professional", tag: "Hiring Favorite" },
  { name: "Creative", tag: "Stand Out" },
];

const testimonials = [
  {
    name: "Alya P.", role: "Product Designer",
    quote: "Dalam 30 menit resume-ku kelar dan langsung dipuji HR karena sangat rapi.",
    rating: 5,
  },
  {
    name: "Reza S.", role: "Frontend Developer",
    quote: "Fitur AI-nya beneran bantu ngerapihin bullet points biar impactful.",
    rating: 5,
  },
  {
    name: "Kinan A.", role: "Marketing Specialist",
    quote: "Template-nya modern dan gampang di-custom. Highly recommended!",
    rating: 5,
  },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${n} star rating`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute top-40 -left-10 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 md:pt-28">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200">
              <Sparkles className="h-4 w-4" /> GoApply – Resume Builder
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Bangun Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Profesional</span> dalam Hitungan Menit
            </h1>
            <p className="mt-4 text-base md:text-lg text-black/70 dark:text-white/70">
              Buat resume yang rapi, ATS-friendly, dan siap kirim. Ditenagai AI untuk meracik ringkasan dan bullet points yang kuat.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/build-resume" className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-semibold bg-violet-600 hover:bg-violet-700 shadow">
                <Rocket className="mr-2 h-5 w-5" /> Mulai Bangun Resume
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 ring-black/10 hover:bg-black/5">
                Lihat Fitur
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-black/60 dark:text-white/60">
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> Tanpa watermark</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> Ekspor PDF</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> ATS Friendly</div>
            </div>
          </motion.div>

          {/* Mockup card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/10 backdrop-blur p-5 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="h-48 rounded-xl border border-dashed border-black/10 grid place-content-center text-black/50 dark:text-white/50">
                <FileText className="h-10 w-10 mx-auto mb-2" />
                <span>Preview Template</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {templates.map((t) => (
                  <button key={t.name} className="rounded-lg border border-black/10 dark:bg-white/10 p-3 text-left hover:border-violet-400">
                    <div className="h-16 rounded bg-gradient-to-br from-white dark:from-white/20 dark:to-black/50 to-black/[0.02]" />
                    <p className="mt-2 text-xs font-semibold">{t.name}</p>
                    <p className="text-[11px] text-black/60">{t.tag}</p>
                  </button>
                ))}
              </div>
              <Link href="/build-resume" className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-white font-semibold hover:bg-violet-700">
                Gunakan Template
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-6 md:px-10 mt-12">
        <div className="mx-auto max-w-6xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/10 backdrop-blur px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Enkripsi & Privasi Terjaga</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Ekspor Cepat ke PDF</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Optimasi AI Otomatis</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold">Semua yang Kamu Butuhkan</h2>
          <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">Dari pengisian data hingga ekspor PDF, semuanya dirancang untuk cepat, rapi, dan profesional.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/10 backdrop-blur p-5 hover:shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-700">
                  {f.icon}
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-black/70 dark:text-white/70 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white dark:from-white/10 dark:to-black/50 to-black/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">Cara Kerja</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-2xl bg-white/70 dark:bg-black/50 backdrop-blur p-5 border border-black/10 dark:border-white/10">
                <div className="absolute -top-3 left-5 rounded-full bg-violet-600 text-white text-xs font-semibold px-2 py-1">{s.step}</div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="text-sm text-black/70 dark:text-white/70 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/build-resume" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white font-semibold hover:bg-violet-700">
              <Rocket className="h-5 w-5" /> Coba Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Apa kata mereka</h2>
            <div className="text-sm text-black/60 dark:text-white/60">5.0 dari 500+ pengguna</div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur p-5">
                <Stars n={t.rating} />
                <p className="mt-3 text-black/80 dark:text-white/80">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-300 grid place-content-center text-white">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-black/60 dark:text-white/60">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      {/* <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
            <h3 className="text-lg font-semibold">Free</h3>
            <div className="mt-2 text-3xl font-extrabold">Rp0<span className="text-base font-medium text-black/60">/selamanya</span></div>
            <ul className="mt-4 space-y-2 text-sm text-black/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 1 Template dasar</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Ekspor PDF</li>
              <li className="flex items-center gap-2 text-black/50 line-through"><Check className="h-4 w-4" /> AI Optimizer</li>
            </ul>
            <Link href="/build-resume" className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-black/5">Coba Gratis</Link>
          </div>

        
          <div className="relative rounded-2xl border-2 border-violet-600 bg-white p-6 shadow-lg">
            <div className="absolute -top-3 left-6 rounded-full bg-violet-600 text-white text-xs font-semibold px-2 py-1">Recommended</div>
            <h3 className="text-lg font-semibold">Pro</h3>
            <div className="mt-2 text-3xl font-extrabold">Rp49.000<span className="text-base font-medium text-black/60">/bulan</span></div>
            <ul className="mt-4 space-y-2 text-sm text-black/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Semua Template</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> AI Bullet Optimizer</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Version History</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Link Publik Resume</li>
            </ul>
            <Link href="/build-resume" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-white font-semibold hover:bg-violet-700">Pilih Pro</Link>
          </div>

          
          <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
            <h3 className="text-lg font-semibold">Team</h3>
            <div className="mt-2 text-3xl font-extrabold">Custom</div>
            <ul className="mt-4 space-y-2 text-sm text-black/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Kolaborasi & Komentar</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Admin & Permissions</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4" /> SSO/SCIM (Enterprise)</li>
            </ul>
            <Link href="/contact" className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-black/5">Hubungi Kami</Link>
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
          <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/70 dark:bg-black/50 backdrop-blur p-4">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger>Apakah gratis?</AccordionTrigger>
                  <AccordionContent>
                    Ya, Website ini sepenuhnya gratis untuk digunakan. Kamu bisa membuat, mengedit, dan mengunduh resume tanpa biaya apapun.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-0">
                  <AccordionTrigger>Apa itu ATS-friendly?</AccordionTrigger>
                  <AccordionContent>
                    Template ATS-friendly dirancang agar mudah dibaca oleh sistem pelacakan pelamar (ATS) yang digunakan oleh banyak perusahaan untuk menyaring resume.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-0">
                  <AccordionTrigger>Data saya aman?</AccordionTrigger>
                  <AccordionContent>
                    Ya. Kami mengutamakan privasi dan tidak menjual data pengguna. Semua informasi yang kamu masukkan dienkripsi dan disimpan dengan aman.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-0">
                  <AccordionTrigger>Bisa custom desain?</AccordionTrigger>
                  <AccordionContent>
                    Kamu bisa menyesuaikan layout, warna, dan font dari template yang tersedia agar sesuai dengan preferensi dan kebutuhan kamu.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </div>
        </div>
        
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 pb-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black/60">
          <div>© {new Date().getFullYear()} GoApply. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <Link href="/contact" className="hover:text-black">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
