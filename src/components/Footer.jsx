export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1a1a1a] py-8 px-6 text-center">
      <p className="text-xs text-white">
        © {new Date().getFullYear()} Seu Nome — Feito com React + Vite + Tailwind
      </p>
    </footer>
  )
}
