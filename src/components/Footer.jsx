
export const Footer = () => {
      const now = new Date(); 
  const year = now.getFullYear()
  return (
    <footer className="bg-cream-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Copyright */}
          <p className="text-purple-600 text-sm font-serif">
            &copy; {year} StickerBloom. Made with <span className="text-pink-500">♥</span> for creativity.
          </p>
        </div>
      </div>
    </footer>
  );
};