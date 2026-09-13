import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-10 text-white/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3">
        <div>
          <div className="text-lg font-black text-white">HARI Športcentrum</div>
          <p className="mt-2 text-sm">Reštaurácia · Fitness · Bowling · Tenis · Badminton</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-amber-500" /> Svätoplukova 1548, 957 04 Bánovce nad Bebravou
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-amber-500" /> 038 / 760 74 44
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-amber-500" /> hari@hari.sk
          </p>
        </div>
        <div className="text-sm">
          <p>IČO: 33 406 791 · DIČ: 1020433238</p>
          <p className="mt-4 text-xs text-white/40">© {new Date().getFullYear()} Športcentrum HARI. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}
