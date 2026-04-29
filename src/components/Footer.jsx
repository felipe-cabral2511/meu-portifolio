export default function Footer() {
  return (
    <footer className="text-xs w-full dark:border-[#1a1a1a] border-slate-200 border-t px-6 py-4 text-center">
      <p className="dark:text-white/100 text-slate-400">
        © {new Date().getFullYear()} Felipe Cabral de Aquino — Feito com React + Vite + Tailwind
      </p>
    </footer>
  )
}
