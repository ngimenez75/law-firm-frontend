"use client";

export function WhatsAppButton() {
  const phoneNumber = "5493515550000"; // Código de área de Córdoba (0351)
  const defaultMessage = encodeURIComponent(
    "Hola, me comunico desde la web del Estudio Giordano, Lopez & García Lepez para hacer una consulta sobre mi caso en Córdoba."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Atención rápida por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-200 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Contactar al Estudio Jurídico por WhatsApp"
        title="Contactanos por WhatsApp"
      >
        {/* Logotipo oficial vectorial de WhatsApp (nítido sin descargas externas) */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.904.534 3.738 1.547 5.336L2 22l4.793-1.508a10.007 10.007 0 0 0 5.238 1.539h.005c5.535 0 10.03-4.495 10.03-10.031 0-2.68-1.043-5.199-2.937-7.093A9.96 9.96 0 0 0 12.031 2zm0 18.336h-.004a8.318 8.318 0 0 1-4.238-1.161l-.304-.18-3.15.99.99-3.072-.198-.316A8.307 8.307 0 0 1 3.695 12.03c0-4.596 3.74-8.336 8.336-8.336 2.227 0 4.32.868 5.895 2.443a8.286 8.286 0 0 1 2.44 5.895c0 4.597-3.74 8.336-8.335 8.336zm4.566-6.242c-.25-.125-1.478-.73-1.708-.813-.229-.083-.396-.125-.562.125-.167.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.056-.39-2.012-1.242-.744-.663-1.246-1.482-1.392-1.732-.146-.25-.015-.385.11-.51.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.355-.771-1.855-.203-.487-.41-.421-.563-.429-.146-.008-.313-.01-.48-.01-.167 0-.438.063-.667.313-.229.25-.875.855-.875 2.084 0 1.23.896 2.418 1.021 2.585.125.167 1.764 2.694 4.274 3.777.597.258 1.064.412 1.428.528.6.191 1.147.164 1.579.101.482-.07 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.167-.48-.292z" />
        </svg>
      </a>
    </aside>
  );
}
