import {useState,useMemo,useEffect,useRef,lazy,Suspense} from 'react'
import gsap from 'gsap'
import {BIKES,useS,fmt} from './store.jsx';import {BikeCard,Img,Tag,go,Boundary} from './ui.jsx'
import {CATS,CAT_NOTE,SPECS,PARTS_INFO,ELECTRIC_HIDE,LESSONS,QUIZ,BADGES} from './data/info.js'
import {ModelCarousel,BikeConfigurator,PerformanceStats,PerformanceGallery} from './Showcase.jsx'
const Hero3D=lazy(()=>import('./Hero.jsx')),Panel=lazy(()=>import('./Panel.jsx'))
const Fallback=({t})=><div className="h-full grid place-items-center text-center p-6 opacity-70 text-sm">{t}</div>
const Viewer3D=({bike})=><Boundary fallback={<div className="glass p-8 text-center">3D isn't available on this device or browser (WebGL is required). The rest of the page works normally.</div>}><Suspense fallback={<div className="glass p-8 text-center">Loading 3D viewer…</div>}><Panel bike={bike}/></Suspense></Boundary>
const BRANDS=[...new Set(BIKES.map(b=>b.brand))].sort()
const FEATURED=['11-','34-','37-','14-','32-','27-'].map(p=>BIKES.find(b=>b.id.startsWith(p))).filter(Boolean),POPULAR=['19-','20-','28-','29-','30-','33-'].map(p=>BIKES.find(b=>b.id.startsWith(p))).filter(Boolean)
const PREMIUM=BIKES.filter(b=>b.price?.usd>1000).sort((a,b)=>(b.price?.usd||0)-(a.price?.usd||0))
const Sec=({t,sub,children,id})=><section id={id} className="max-w-7xl mx-auto px-4 mt-16 scroll-mt-20"><h2 className="fh text-2xl md:text-3xl font-bold">{t}</h2>{sub&&<p className="opacity-70 mt-1">{sub}</p>}<div className="mt-6">{children}</div></section>
const Grid=({list})=><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{list.map(b=><BikeCard key={b.id} b={b}/>)}</div>
const AnatomyFeature=()=> <section id="anatomy" className="max-w-7xl mx-auto px-4 mt-16 scroll-mt-20"><div className="glass overflow-hidden grid lg:grid-cols-[1.12fr_.88fr] items-center"><div className="bg-[#929397] p-4 sm:p-8"><img src="/images/motorcycle-parts-diagram.jpg" alt="Illustrated motorcycle anatomy showing the engine, gas tank, headlamp, fork, wheels, frame, seat, exhaust, rear fender, front fender and drive chain" className="w-full rounded-xl shadow-2xl" loading="lazy"/><p className="text-xs text-black/65 mt-3">Reference illustration · part names are general and not model-specific.</p></div><div className="p-6 sm:p-9"><p className="product-kicker">NEW · BIKE ANATOMY</p><h2 className="fh text-2xl md:text-3xl font-bold mt-3">Understand every moving part</h2><p className="opacity-75 mt-4">Start with the big picture before opening the tools. Use this visual guide to identify the main motorcycle systems, then explore detailed lessons in the Repair Academy.</p><ul className="grid grid-cols-2 gap-x-5 gap-y-2 mt-6 text-sm opacity-85"><li>• Engine &amp; gas tank</li><li>• Fork &amp; headlamp</li><li>• Frame &amp; seat</li><li>• Wheels &amp; fenders</li><li>• Exhaust &amp; drive chain</li><li>• Braking systems</li></ul><a className="btn mt-7" href="#/academy">Explore the parts guide →</a></div></div></section>

export function Home({q}){
 const s=useS(),h=useRef();const [search,setSearch]=useState(''),[brand,setBrand]=useState('All'),[cat,setCat]=useState(q.cat||'All'),[sort,setSort]=useState('default'),[maxCc,setMaxCc]=useState(1400),[from,setFrom]=useState(0),[photo,setPhoto]=useState(false)
 useEffect(()=>{if(q.cat)setCat(q.cat)},[q.cat])
 useEffect(()=>{const c=gsap.context(()=>{gsap.from('.hw',{y:50,opacity:0,stagger:.12,duration:.8,ease:'power3.out'});gsap.from('.hs',{opacity:0,y:20,delay:.6,duration:.8})},h);return()=>c.revert()},[])
 const list=useMemo(()=>{let l=BIKES.filter(b=>(brand==='All'||b.brand===brand)&&(cat==='All'||b.category===cat)&&(b.cc??0)<=maxCc&&b.year>=from&&(!photo||b.imageType==='Photo')&&`${b.brand} ${b.name} ${b.year} ${b.category}`.toLowerCase().includes(search.toLowerCase()))
  const P=b=>b.price?.lkr,n=(f,d)=>(a,b)=>d*((f(a)??-1)-(f(b)??-1))
  const S={priceUp:(a,b)=>(P(a)??1e12)-(P(b)??1e12),priceDown:(a,b)=>(P(b)??-1)-(P(a)??-1),power:n(b=>b.powerHp,-1),cc:n(b=>b.cc,-1),new:n(b=>b.year,-1),old:n(b=>b.year,1),name:(a,b)=>a.name.localeCompare(b.name)}[sort]
  return S?[...l].sort(S):l},[search,brand,cat,sort,maxCc,from,photo])
 return <div className="page">
 <section ref={h} className="product-hero">
  <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid lg:grid-cols-[.82fr_1.18fr] items-center gap-4 min-h-[72vh]">
   <div className="product-copy"><p className="product-kicker hw">BikeVault LK · Urban mobility</p>
    <h1 className="product-title hw mt-5"><span className="block">BMW</span><span className="block text-a1">R 18</span></h1>
    <p className="mt-6 max-w-md text-lg opacity-75">A focused motorcycle showroom inspired by modern product pages. Explore the bike, compare the details, and learn what is behind every ride.</p>
    <div className="mt-8 flex flex-wrap gap-3"><a className="btn" href="#/bike/44-bmw-m-1000-rr">Discover the model</a><a className="btn o" href="#/#collection">View all bikes</a></div>
    <div className="grid grid-cols-3 gap-5 mt-12 max-w-md text-sm"><div className="product-stat"><b className="text-xl">1,802</b><span className="block opacity-60">cc engine</span></div><div className="product-stat"><b className="text-xl">91</b><span className="block opacity-60">hp approx.</span></div><div className="product-stat"><b className="text-xl">2024</b><span className="block opacity-60">model year</span></div></div>
   </div>
   <div className="product-visual h-[360px] md:h-[560px]"><Boundary fallback={<Fallback t="Bike preview unavailable on this device."/>}><Suspense fallback={<Fallback t="Loading bike preview…"/>}><Hero3D/></Suspense></Boundary></div>
  </div>
 </section>
 <ModelCarousel/>
 <section className="feature-band"><div className="max-w-7xl mx-auto px-4 py-7 grid sm:grid-cols-3 gap-7 text-sm"><div className="feature-item"><b>REAL PHOTO PREVIEW</b><span className="block opacity-60 mt-1">See the featured Bullet in a rotating visual.</span></div><div className="feature-item"><b>PARTS &amp; REPAIR</b><span className="block opacity-60 mt-1">Open the interactive learning viewer for every system.</span></div><div className="feature-item"><b>COMPARE YOUR WAY</b><span className="block opacity-60 mt-1">Save favourites and compare up to three bikes.</span></div></div></section>
 <Sec id="premium" t="Premium machines, clearly compared" sub="Browse bikes with an indicative starting price above US$1,000"><div className="premium-rail"><div className="premium-intro"><p className="product-kicker">THE PERFORMANCE GARAGE</p><h2 className="fh text-2xl md:text-4xl font-bold mt-3">Choose your next world</h2><p className="opacity-75 mt-3">From race-bred superbikes to long-distance adventure machines. Filter by category, open a model page, or add up to three bikes to your comparison garage.</p><div className="flex flex-wrap gap-2 mt-6"><a className="btn" href="#/#collection?sort=priceDown">Shop premium bikes</a><a className="btn o" href="#/compare">Open comparison garage</a></div></div><div className="premium-stats"><div><b>{PREMIUM.length}</b><span>priced models</span></div><div><b>{new Set(PREMIUM.map(b=>b.brand)).size}</b><span>brands</span></div><div><b>$42,390</b><span>top listed MSRP</span></div></div></div><div className="mt-6"><Grid list={PREMIUM.slice(0,8)}/></div><p className="text-xs opacity-60 mt-3">Prices are indicative starting prices in USD, converted for browsing. They are not Sri Lankan dealer quotes; use the source link on the detail page to verify current terms.</p></Sec>
 <Sec t="Find your next ride" sub="A curated line-up for Sri Lankan roads"><Grid list={FEATURED}/></Sec>
 <Sec t="Why BikeVault" sub="More than a catalogue — a clearer way to understand motorcycles"><div className="grid md:grid-cols-3 gap-5"><article className="glass p-6"><div className="text-a1 font-black text-3xl">01</div><h3 className="fh text-xl font-bold mt-8">See it clearly</h3><p className="opacity-70 mt-2">Real photos, image labels and an optional 3D parts viewer help you start with confidence.</p></article><article className="glass p-6"><div className="text-a1 font-black text-3xl">02</div><h3 className="fh text-xl font-bold mt-8">Choose with context</h3><p className="opacity-70 mt-2">Compare engine size, power, categories, model years and indicative prices in your preferred currency.</p></article><article className="glass p-6"><div className="text-a1 font-black text-3xl">03</div><h3 className="fh text-xl font-bold mt-8">Learn as you go</h3><p className="opacity-70 mt-2">Use Repair Academy lessons to understand maintenance basics before you touch the tools.</p></article></div></Sec>
 <Sec t="Popular models" sub="Everyday bikes common on Sri Lankan roads"><Grid list={POPULAR}/></Sec>
 {s.recent.length>0&&<Sec t="Recently viewed"><Grid list={s.recent.slice(0,4).map(id=>BIKES.find(b=>b.id===id)).filter(Boolean)}/></Sec>}
 <Sec id="collection" t={`Full collection (${list.length} of ${BIKES.length})`}>
  <div className="glass p-4 grid gap-3">
   <div className="flex flex-wrap gap-2"><input className="inp flex-1 min-w-[200px]" placeholder="Search bikes, brands, years…" aria-label="Search" value={search} onChange={e=>setSearch(e.target.value)}/>
    <select className="inp" aria-label="Brand" value={brand} onChange={e=>setBrand(e.target.value)}><option>All</option>{BRANDS.map(b=><option key={b}>{b}</option>)}</select>
    <select className="inp" aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="default">Sort: Default</option><option value="priceUp">Price: low → high</option><option value="priceDown">Price: high → low</option><option value="power">Power</option><option value="cc">Engine size</option><option value="new">Newest</option><option value="old">Oldest</option><option value="name">Name A–Z</option></select></div>
   <div className="flex flex-wrap gap-2" role="tablist">{['All',...CATS].map(c=><button key={c} role="tab" aria-selected={cat===c} className={`chip ${cat===c?'on':''}`} onClick={()=>setCat(c)}>{c}</button>)}</div>
   <div className="flex flex-wrap gap-5 text-sm items-center"><label>Max engine: {maxCc} cc <input type="range" min="100" max="1400" step="50" value={maxCc} onChange={e=>setMaxCc(+e.target.value)}/></label>
    <label>Year from <select className="inp" value={from} onChange={e=>setFrom(+e.target.value)}>{[0,1950,1970,2000,2023].map(y=><option key={y} value={y}>{y||'Any'}</option>)}</select></label>
    <label className="flex gap-2"><input type="checkbox" checked={photo} onChange={e=>setPhoto(e.target.checked)}/>Real photos only</label>
    <button className="chip" onClick={()=>{setSearch('');setBrand('All');setCat('All');setSort('default');setMaxCc(1400);setFrom(0);setPhoto(false)}}>Reset filters</button></div></div>
  <p className="text-xs opacity-60 mt-3">Prices are shown in {s.currency}. Switch country/currency in the top navigation. Converted values are indicative only; prices show “not verified” until a sourced LKR value is added in src/data/prices.json.</p>
  <div className="mt-5">{list.length?<Grid list={list}/>:<div className="glass p-10 text-center">No bikes match these filters.</div>}</div></Sec></div>}

export function Detail({id}){
 const s=useS(),b=BIKES.find(x=>x.id===id)
 useEffect(()=>{if(b){s.addRecent(b.id);document.title=`${b.year} ${b.brand} ${b.name} in 3D — BikeVault LK`}},[id])
 if(!b)return <Sec t="Bike not found"><a className="btn" href="#/">Back home</a></Sec>
 const rec=BIKES.filter(x=>x.id!==b.id&&(x.category===b.category||x.brand===b.brand)).slice(0,4)
 const val=k=>k==='cc'?(b.cc?`${b.cc} cc`:b.category==='Electric'?'Electric (no cc)':null):k==='powerHp'?(b.powerHp?`≈ ${b.powerHp} hp / PS`:null):b[k]
 return <div className="page max-w-7xl mx-auto px-4 pt-8">
  <a href="#/#collection" className="opacity-70 text-sm">← All bikes</a>
  <div className="flex flex-wrap items-end justify-between gap-3 mt-2 mb-5"><div><div className="text-sm opacity-70">{b.brand} · {b.year} · {b.category}</div><h1 className="fh text-3xl md:text-4xl font-extrabold">{b.name}</h1></div>
   <div className="flex gap-2"><button className="btn o" onClick={()=>s.toggleWish(b.id)}>{s.wish.includes(b.id)?'❤️ In wishlist':'🤍 Wishlist'}</button><button className={`btn o ${s.cmp.includes(b.id)?'sel':''}`} onClick={()=>s.toggleCmp(b.id)}>⇄ Compare</button><a className="btn" href="#/academy">🔧 Repair Academy</a></div></div>
  {b.price?.usd>1000&&<div className="premium-detail glass p-5 mb-6"><div><span className="product-kicker">PREMIUM MODEL</span><h2 className="fh text-xl font-bold mt-2">Starting from ${b.price.usd.toLocaleString('en-US')}</h2><p className="text-sm opacity-70 mt-1">Indicative manufacturer or market MSRP reference. Local taxes, destination fees and dealer pricing may differ.</p></div><div className="flex gap-2"><a className="btn o" href={b.price.sourceUrl} target="_blank" rel="noreferrer">Verify source ↗</a><a className="btn" href="#/compare">Build a shortlist →</a></div></div>}
  <PerformanceStats bike={b}/><BikeConfigurator bike={b}/><PerformanceGallery bike={b}/><div id="parts-viewer" className="scroll-mt-24"><Viewer3D bike={b}/></div>
  <div className="grid lg:grid-cols-2 gap-6 mt-8">
   <div className="glass p-4"><div className="relative"><Img b={b} className="w-full rounded-lg"/><div className="absolute top-2 left-2"><Tag b={b}/></div></div><p className="text-xs opacity-60 mt-2">{b.imageType==='Photo'?'A real photograph.':'Catalogue illustration/artwork — not a real photograph.'}</p></div>
   <div className="glass p-4"><h2 className="fh text-xl font-bold mb-2">Specifications</h2><table className="w-full text-sm"><tbody>
    {SPECS.map(([k,l])=>{const v=val(k);return <tr key={k} className="border-b border-white/10"><th className="text-left font-normal opacity-70 py-2">{l}</th><td className={`py-2 ${v?'font-semibold':'opacity-50'}`}>{v||'Not verified'}</td></tr>})}
    <tr><th className="text-left font-normal opacity-70 py-2">Price in {s.currency}</th><td className="py-2 font-semibold">{fmt(b.price,s.currency)}{b.price&&<div className="text-xs opacity-60">{b.price.usd?`From $${b.price.usd.toLocaleString('en-US')} · `:''}{b.price.estimate?'Indicative · ':''}<a className="underline" href={b.price.sourceUrl} target="_blank" rel="noreferrer">Source</a> · Updated {b.price.updated}</div>}</td></tr></tbody></table>
    <p className="text-xs opacity-60 mt-3">Figures are approximate manufacturer-published values; anything marked “Not verified” has not been confirmed yet — no values are invented. Add data in src/data/.</p></div></div>
  <div className="glass p-4 mt-6"><h2 className="fh text-xl font-bold">About this category: {b.category}</h2><p className="opacity-80 mt-2">{CAT_NOTE[b.category]}</p><p className="text-xs opacity-60 mt-2">General category guidance, not model-specific maintenance data.</p></div>
  <Sec t="Recommended for you"><Grid list={rec}/></Sec></div>}

export function Academy(){
 const s=useS(),[id,setId]=useState(BIKES.find(b=>b.id.startsWith('14-')).id),[lv,setLv]=useState('Beginner'),[open,setOpen]=useState(null),[ticks,setTicks]=useState({})
 const b=BIKES.find(x=>x.id===id),hidden=b.category==='Electric'?ELECTRIC_HIDE:[]
 return <div className="page max-w-7xl mx-auto px-4 pt-8"><h1 className="fh text-3xl font-extrabold">Parts &amp; Repair Academy</h1>
  <div className="glass p-3 mt-3 text-sm border-l-4 border-a3">⚠️ General educational guidance only. These lessons are <b>not verified for any specific model</b> — always follow the factory service manual and torque specs, and use proper safety gear.</div>
  <div className="glass overflow-hidden grid md:grid-cols-[.9fr_1.1fr] items-center mt-6"><div className="bg-[#929397] p-4"><img src="/images/motorcycle-parts-diagram.jpg" alt="Motorcycle parts reference illustration" className="w-full rounded-lg" loading="lazy"/></div><div className="p-5"><h2 className="fh text-xl font-bold">Quick anatomy reference</h2><p className="text-sm opacity-75 mt-2">Use the labeled illustration to orient yourself before selecting a lesson. The labels are general reference points, not model-specific service instructions.</p><a className="btn o mt-4" href="#/academy#parts-guide">Jump to parts guide</a></div></div>
  <label className="block mt-5 text-sm">Choose a bike <select className="inp ml-2" value={id} onChange={e=>setId(e.target.value)}>{BIKES.map(x=><option key={x.id} value={x.id}>{x.year} {x.brand} {x.name}</option>)}</select></label>
  <div className="mt-4"><Viewer3D bike={b}/></div>
  <Sec id="parts-guide" t="Parts guide" sub="Tap a part to read about it"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{Object.entries(PARTS_INFO).filter(([k])=>!hidden.includes(k)).map(([k,v])=><button key={k} onClick={()=>setOpen(open===k?null:k)} className="glass p-4 text-left card" aria-expanded={open===k}><div className="flex justify-between"><b>{v[0]}</b><span className="chip">{['','Beginner','Intermediate','Advanced'][v[6]]}</span></div><p className="text-sm opacity-75 mt-1">{v[1]}</p>
   {open===k&&<ul className="text-xs mt-3 space-y-1 opacity-90"><li><b>Problems:</b> {v[3]}</li><li><b>Tools:</b> {v[4]}</li><li><b>Maintenance:</b> {v[5]}</li></ul>}</button>)}</div></Sec>
  <Sec t="Step-by-step lessons"><div className="flex gap-2 mb-4">{['Beginner','Intermediate','Advanced'].map(l=><button key={l} className={`chip ${lv===l?'on':''}`} onClick={()=>setLv(l)}>{l}</button>)}</div>
   <div className="grid md:grid-cols-2 gap-4">{LESSONS.filter(l=>l.lv===lv).map(l=>{const done=s.prog.lessons.includes(l.id);return <article key={l.id} className="glass p-5"><h3 className="fh font-bold text-lg">{l.t} {done&&'✅'}</h3><div className="text-xs opacity-70 mt-1">⏱ {l.time} · 🧰 {l.tools}</div>
    <div className="my-3 text-sm p-2 rounded bg-orange-500/15 border border-orange-500/40">⚠️ Safety: {l.safety}</div>
    <ol className="space-y-2 text-sm">{l.steps.map((t,i)=><li key={i}><label className="flex gap-2"><input type="checkbox" checked={!!ticks[l.id+i]} onChange={e=>setTicks({...ticks,[l.id+i]:e.target.checked})}/><span>{t}</span></label></li>)}</ol>
    <p className="text-xs opacity-60 mt-3">Assembly: reverse the removal order, replace single-use fasteners and torque to the manual's values.</p>
    <button className="btn mt-3" onClick={()=>{s.doneLesson(l.id);s.setToast('Lesson complete!')}}>Mark complete</button></article>})}
    {!LESSONS.some(l=>l.lv===lv)&&<p className="opacity-70">More {lv.toLowerCase()} lessons are coming — add them in src/data/info.js.</p>}</div></Sec></div>}

export function Compare(){
 const s=useS(),list=s.cmp.map(i=>BIKES.find(b=>b.id===i)).filter(Boolean)
 const val=(b,k)=>k==='cc'?(b.cc?`${b.cc} cc`:'Electric'):k==='powerHp'?(b.powerHp?`≈ ${b.powerHp} hp`:null):b[k]
 return <div className="page max-w-7xl mx-auto px-4 pt-8"><h1 className="fh text-3xl font-extrabold">Compare bikes</h1>
  <select className="inp mt-4" value="" onChange={e=>e.target.value&&s.toggleCmp(e.target.value)} aria-label="Add bike"><option value="">+ Add a bike (max 3)</option>{BIKES.filter(b=>!s.cmp.includes(b.id)).map(b=><option key={b.id} value={b.id}>{b.year} {b.brand} {b.name}</option>)}</select>
  {list.length?<div className="glass p-4 mt-5 overflow-x-auto"><table className="w-full text-sm min-w-[560px]"><thead><tr><th/>{list.map(b=><th key={b.id} className="p-2 text-left"><Img b={b} className="rounded-lg mb-2 w-full max-w-[220px]"/><div className="fh">{b.name}</div><div className="opacity-60 font-normal">{b.brand}</div><button className="chip mt-1" onClick={()=>s.toggleCmp(b.id)}>Remove</button></th>)}</tr></thead><tbody>
   {[['year','Year'],['category','Category'],...SPECS].map(([k,l])=><tr key={k} className="border-t border-white/10"><th className="text-left font-normal opacity-70 p-2">{l}</th>{list.map(b=><td key={b.id} className="p-2">{val(b,k)||<span className="opacity-40">Not verified</span>}</td>)}</tr>)}
   <tr className="border-t border-white/10"><th className="text-left font-normal opacity-70 p-2">Price in {s.currency}</th>{list.map(b=><td key={b.id} className="p-2">{fmt(b.price,s.currency)}</td>)}</tr></tbody></table></div>:<div className="glass p-10 text-center mt-5">Pick up to three bikes to compare. You can also use the ⇄ button on any bike card.</div>}</div>}

export function Wishlist(){const s=useS(),l=s.wish.map(i=>BIKES.find(b=>b.id===i)).filter(Boolean)
 return <div className="page max-w-7xl mx-auto px-4 pt-8"><h1 className="fh text-3xl font-extrabold mb-6">Your wishlist</h1>{l.length?<Grid list={l}/>:<div className="glass p-10 text-center">No favourites yet. Tap the 🤍 on any bike.</div>}</div>}

export function Quiz(){
 const s=useS(),[i,setI]=useState(0),[sc,setSc]=useState(0),[pick,setPick]=useState(null),[end,setEnd]=useState(false)
 const [qq,a,c]=QUIZ[i]||[]
 const next=()=>{const ns=sc+(pick===c?1:0);if(i+1>=QUIZ.length){setSc(ns);setEnd(true);s.setQuiz(ns)}else{setSc(ns);setI(i+1);setPick(null)}}
 return <div className="page max-w-3xl mx-auto px-4 pt-8"><h1 className="fh text-3xl font-extrabold">Quiz &amp; achievements</h1>
  <div className="glass p-6 mt-5">{end?<div className="text-center"><div className="fh text-4xl">{sc}/{QUIZ.length}</div><p className="my-3">{sc>=5?'Master mechanic! 🏆':'Nice effort — review the Academy and try again.'}</p><button className="btn" onClick={()=>{setI(0);setSc(0);setPick(null);setEnd(false)}}>Try again</button></div>
   :<><div className="text-xs opacity-60">Question {i+1} of {QUIZ.length}</div><h2 className="text-xl font-semibold my-3">{qq}</h2><div className="grid gap-2">{a.map((o,k)=><button key={o} disabled={pick!==null} onClick={()=>setPick(k)} className={`btn o justify-start ${pick!==null&&k===c?'!bg-emerald-600':pick===k?'!bg-red-600':''}`}>{o}</button>)}</div>
   {pick!==null&&<button className="btn mt-4" onClick={next}>{i+1>=QUIZ.length?'Finish':'Next'}</button>}</>}</div>
  <h2 className="fh text-xl font-bold mt-8 mb-3">Badges</h2><div className="grid sm:grid-cols-3 gap-3">{BADGES.map(([k,n,d])=><div key={k} className={`glass p-4 text-center ${s.badges[k]?'':'opacity-40 grayscale'}`}><div className="text-3xl">{s.badges[k]?'🏅':'🔒'}</div><b className="text-sm">{n}</b><div className="text-xs opacity-70">{d}</div></div>)}</div></div>}
