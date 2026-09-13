import { MapPin, Phone, Mail, User } from 'lucide-react';

const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Svätoplukova 1548, 957 04 Bánovce nad Bebravou')}`;

export default function Kontakt() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-black text-white sm:text-4xl">Kontakt</h1>
      <p className="mt-2 text-white/60">Radi vás privítame v našom športcentre.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href={MAPS_HREF} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/40">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold text-white">Adresa</div>
            <div className="text-sm text-white/60">Svätoplukova 1548, 957 04 Bánovce nad Bebravou</div>
            <div className="mt-1 text-xs font-medium text-amber-400">Otvoriť v Google Maps →</div>
          </div>
        </a>

        <a href="tel:0038760744" className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/40">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold text-white">Informácie a objednávky</div>
            <div className="text-sm text-white/60">038 / 760 74 44</div>
          </div>
        </a>

        <a href="mailto:hari@hari.sk" className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/40">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold text-white">Email</div>
            <div className="text-sm text-white/60">hari@hari.sk</div>
          </div>
        </a>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
          <User className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold text-white">Majiteľ</div>
            <div className="text-sm text-white/60">Richard Hanák · 0905 269 866</div>
            <div className="mt-1 text-sm text-white/60">Spoločenské akcie: Bianka Podlucká · 0915 450 996</div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/50">
        IČO: 33 406 791 · DIČ: 1020433238 · IČ DPH: SK1020433238 · ÚO reg. číslo: 301-1828
      </div>
    </div>
  );
}
