import NavbarContent from "./NavbarContent";
const Navbar = async () => {
  return (
    <>
      <header className=" shadow-xs bg-white/80 backdrop-blur-md fixed w-full">
        <div className="px-5 py-3 font-work-sans max-w-7xl mx-auto">
          <NavbarContent />
        </div>
      </header>
    </>
  );
};

export default Navbar;
