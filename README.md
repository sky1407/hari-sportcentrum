# Športcentrum HARI - moderný redizajn

Redizajn webu [hari.sk](https://www.hari.sk) (Bánovce nad Bebravou) - reštaurácia, fitness, bowling, tenisová hala,
tenisový kurt a badminton pod jednou strechou. Pôvodný web mal nefunkčnú fotogalériu a žiadnu možnosť online
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

Jeden Vercel projekt (`client/`) obsahuje aj frontend aj backend:

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + React Router + lucide-react
- **Backend:** Vercel serverless funkcie (`client/api/`), Node.js
- **Databáza:** [Turso](https://turso.tech) (SQLite kompatibilná, cez `@libsql/client`)

## Lokálne spustenie

```bash
cd client
npm install
cp .env.local.example .env.local   # doplň TURSO_DATABASE_URL a TURSO_AUTH_TOKEN
vercel dev                          # spustí frontend aj /api funkcie spolu, http://localhost:3000
```

`vercel dev` je potrebné práve preto, že appka beží ako Vercel serverless funkcie (`client/api/*.js`) - samotné
`npm run dev` (Vite) by spustilo len frontend bez backendu.

## Poznámka k emailu pri hlásení závad

Odosielanie emailu funguje cez `mailto:` odkaz (otvorí reportujúcemu jeho vlastný emailový klient s predvyplnenou
správou na `hari@hari.sk`) - nevyžaduje žiadne API kľúče ani nastavovanie. Hlásenie sa zároveň vždy uloží aj do
databázy, takže je viditeľné vo verejnej diskusii bez ohľadu na to, či reportujúci email skutočne odošle.
