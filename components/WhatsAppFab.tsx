import { wa } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a className="fab" href={wa("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer" aria-label="Falar por WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.100-.6.800-.8 1-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.300 3 3 0 0 0-.9 2.200 5.300 5.300 0 0 0 1.100 2.800 12 12 0 0 0 4.600 4.100c1.700.7 2.400.8 3.200.6a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
