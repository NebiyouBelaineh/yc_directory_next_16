import { Suspense } from "react"
import NavbarContent from "./NavbarContent"
const Navbar = async () => {
  return (
    <>
      <Suspense fallback='loading navbar content ...'>
        <header className='px-5 py-3 bg-white shadow-xs font-work-sans'>
          <NavbarContent />
        </header>
      </Suspense>
    </>
  )
}

export default Navbar