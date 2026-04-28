export default function Footer() {
  return (
    <footer className=" text-xs w-full border-t border-[#1a1a1a] px-6 text-center">
      <p className=" text-white">
        © {new Date().getFullYear()} Felipe Cabral de Aquino — Feito com React + Vite + Tailwind
      </p>
    </footer>
  )
}
