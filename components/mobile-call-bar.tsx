import { Mail, Phone } from 'lucide-react';

export function MobileCallBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-slate-700 bg-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <a
        href="tel:+38970264159"
        className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold bg-sky-500 active:bg-sky-600 transition-colors"
      >
        <Phone className="h-4 w-4" />
        070/264-159
      </a>
      <a
        href="mailto:contact@bsekompani.mk"
        className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold bg-slate-700 active:bg-slate-600 transition-colors"
      >
        <Mail className="h-4 w-4" />
        Понуда
      </a>
    </div>
  );
}
