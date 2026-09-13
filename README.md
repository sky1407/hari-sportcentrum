# Športcentrum HARI - moderný redizajn

Redizajn webu [hari.sk](https://www.hari.sk) (Bánovce nad Bebravou) - reštaurácia, fitness, bowling, tenisová hala,
tenisový kurt a badminton pod jednou strechou. Pôvodný web mal nefunkčný fotogalériu a žiadnu možnosť online
rezervácie, takže vznikol tento nový, responzívny redizajn s reálnym obsahom (adresa, hodiny, ceny) prevzatým
z pôvodnej stránky.

## Čo je nové oproti pôvodnému webu

- **Rezervácia termínu online** - bowling, tenisová hala, tenisový kurt aj badminton majú formulár na výber dátumu
  a voľnej hodiny, s kontrolou, že sa dva termíny na tú istú prevádzku neprekryjú.
- **Anonymné hlásenie závad vo fitku** - formulár pošle hlásenie na `hari@hari.sk` (cez predvyplnený email) a zároveň
  ho uloží do verejnej "diskusie" priamo pod formulárom.
- **Funkčná fotogaléria** - fotky sa dajú kliknutím otvoriť na celú obrazovku (šípky, klávesnica, zatvorenie mimo
  obrázka).
- **Moderný, responzívny dizajn** - tmavý štýl, jedna stránka na sekciu, funguje na mobile aj desktope.

## Technológie

- **Klient:** React 19 + Vite + Tailwind CSS v4 + React Router + lucide-react
- **Server:** Node.js + Express + SQLite (`better-sqlite3`)

## Lokálne spustenie

```bash
# server
cd server
npm install
cp .env.example .env
npm run dev        # http://localhost:5001

# klient (v druhom termináli)
cd client
npm install
npm run dev         # http://localhost:5173, /api sa proxuje na server
```

## Poznámka k emailu pri hlásení závad

Odosielanie emailu funguje cez `mailto:` odkaz (otvorí reportujúcemu jeho vlastný emailový klient s predvyplnenou
správou na `hari@hari.sk`) - nevyžaduje žiadne API kľúče ani nastavovanie. Hlásenie sa zároveň vždy uloží aj do
databázy, takže je viditeľné vo verejnej diskusii bez ohľadu na to, či reportujúci email skutočne odošle.
