function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#38340E]/40 px-4 backdrop-blur-sm">
      
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-2xl md:p-8">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#F3E8D8] bg-[#FFF9F2] text-xl text-[#38340E] transition hover:border-[#FFA13D] hover:text-[#E56703]"
          aria-label="Close modal"
        >
           &times;
        </button>

        {/* MODAL CONTENT */}
        {children}
      </div>

    </div>
  );
}

export default Modal;