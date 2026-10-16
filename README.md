# BikeVault LK
React + Vite + Tailwind + React Three Fiber/Drei + GSAP. All 43 motorcycles and images come from your Word catalogue.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/ (works from any folder; hash routing)
```
Requires Node 18+.

## Data (nothing is invented)
- `src/data/bikes.json` – 43 bikes (name, brand, year, category, image, Photo/Illustration label, cc, approx. hp, engine layout). Regenerate with `python3 scripts/build_data.py <docx>`.
- Specs not yet verified (torque, weight, top speed, brakes, etc.) are shown as **Not verified**. Add them to a bike in `bikes.json` using the keys in `SPECS` (`src/data/info.js`).
- **Prices**: no Sri Lankan price could be verified, so every bike shows "Price not verified". Add real ones in `src/data/prices.json`:
  `{"19-bajaj-pulsar-ns200":{"lkr":850000,"source":"Dealer name / URL","updated":"2026-10-14","estimate":false}}`
  Prices then display as "Rs. 850,000" with source/date, and price sorting works.
- Images marked **Real photo** vs **Illustration** follow your document.

## 3D
No GLB files were available, so a generic schematic bike (named parts: engine, piston, cylinder, crankshaft, clutch, gearbox, chain, sprockets, brakes, wheels, suspension, battery, electrical, fuel, exhaust, frame) is shown, clearly labelled as not model-specific. To use a real model, drop `public/models/<bike-id>.glb` (id = `id` in bikes.json); it is detected automatically, with click-to-select and exploded view by mesh.

## Interactive parts visualization
The motorcycle detail page (`#/bike/<bike-id>`) keeps the existing 3D viewer and adds an accessible searchable component list. Select a part in the model or list to highlight it and read its function, location, common problems, tools and maintenance notes. The viewer supports exploded/reassembled mode, rotation, zoom, orbit pan, labels and reset. The supplied `public/images/motorcycle-parts-diagram.jpg` is a labeled visual reference; it is not presented as a model-specific technical drawing.

### Add another motorcycle and its parts
1. Add the motorcycle record to `src/data/bikes.json` with a unique `id`, name, brand, year, category and image filename.
2. Put its image in `public/images/bikes/` and set `imageType` accurately (`Photo` or `Illustration`).
3. For a real interactive model, add `public/models/<id>.glb`; use meaningful mesh names so model selection can map to `src/data/info.js` entries.
4. Add or update general component guidance in `PARTS_INFO` inside `src/data/info.js`. Do not add unverified prices or model specifications; use `src/data/prices.json` only for sourced values.
5. Run `npm install` and `npm run build` before packaging or deploying.

## Visual and price display updates
- The landing hero now uses the supplied real Bullet 350 photo (`public/images/bikes/18.jpeg`) with a rotating perspective preview and pause/play control.
- The home page and Repair Academy include a responsive Motorcycle Anatomy reference feature using `public/images/motorcycle-parts-diagram.jpg`. It links directly to the labeled Parts guide and clearly identifies the illustration as general, not model-specific.
- A premium catalogue rail now groups models with an indicative USD starting price above $1,000. It uses category-led discovery, a cinematic showroom treatment, model-level source links, and shortlist/compare CTAs inspired by BMW Motorrad and Yamaha Sri Lanka product flows.
- The catalog now includes 47 bikes, including BMW M 1000 RR and official Yamaha Sri Lanka image entries for YZF-R15 V4, MT-15 V2 and FZ-S FI. The new images are stored in `public/images/bikes/`.
- `src/data/prices.json` stores indicative USD and converted LKR values with source URLs. They are not Sri Lankan dealer quotes and should be verified before purchase.
- The top navigation includes LKR, USD, EUR, GBP, INR, JPY and AUD display currencies. Conversions use an indicative snapshot in `src/data/currency.js`; they are for browsing only and are not live transaction quotes.
- Theme choices include Modern, Vintage, Midnight, Ocean and Sand. The choice is saved in local storage.

## Repair lessons
Lessons in `src/data/info.js` are general guidance, labelled as not model-specific.

Placeholders to replace: footer contact email and social links (`src/ui.jsx`).

## Reference sources
- BMW Motorrad M 1000 RR and model overview: https://www.bmwmotorcycles.com/en/models/m/m1000rr.html and https://www.bmwmotorcycles.com/en/models/modeloverview.html
- Yamaha Sri Lanka home and product catalogue: https://yamaha.lk/ and https://yamaha.lk/products/
- Honda Powersports motorcycle catalogue and starting prices: https://powersports.honda.com/motorcycle
