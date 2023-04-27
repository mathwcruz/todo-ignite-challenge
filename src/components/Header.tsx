export function Header() {
  return (
    <header className="h-[200px] flex items-center justify-center px-2 bg-gray-700">
      <div className="flex flex-row items-center justify-center gap-3">
        <img src="/logo.svg" alt="Foguete de cor azul com fumaça da cor roxa" />
        <div className="block text-[40px] font-bold">
          <span className="text-blue-400">to</span>
          <span className="text-purple-700">do</span>
        </div>
      </div>
    </header>
  )
}