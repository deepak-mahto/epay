function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {currentYear} ePay.</p>
        </div>
      </footer>
    </>
  );
}
export default Footer;
