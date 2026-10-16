import {useState} from 'react'
import {useS,fmt,CURRENCIES,CURRENCY_KEYS,FX_SNAPSHOT_DATE} from './store.jsx';import {CATS} from './data/info.js'
export const go=h=>{location.hash=h}
const img=f=>`${import.meta.env.BASE_URL}images/bikes/${f}`
export const Img=({b,className=''})=><img src={img(b.image)} alt={`${b.year} ${b.brand} ${b.name} (${b.imageType.toLowerCase()})`} loading="lazy" className={className} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=`${import.meta.env.BASE_URL}images/placeholder.svg`}}/>
export const Tag=({b})=><span className={`text-[11px] px-2 py-0.5 rounded-full ${b.imageType==='Photo'?'bg-emerald-600':'bg-black/60'} text-white`}>{b.imageType==='Photo'?'📷 Real photo':'🎨 Illustration'}</span>
export function BikeCard({b}){const s=useS();const w=s.wish.includes(b.id),c=s.cmp.includes(b.id)
 return <article className="glass card overflow-hidden flex flex-col">
  <div className="relative aspect-[16/10] bg-black/30"><Img b={b} className="w-full h-full object-cover"/>
   <div className="absolute top-2 left-2"><Tag b={b}/></div>
   <button aria-label="Toggle wishlist" aria-pressed={w} onClick={()=>s.toggleWish(b.id)} className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 text-lg">{w?'❤️':'🤍'}</button></div>
  <div className="p-4 flex-1 flex flex-col gap-2"><div className="text-xs opacity-70">{b.brand} · {b.year} · {b.category}</div>
   <h3 className="fh text-lg font-bold leading-tight">{b.name}</h3>
   <dl className="grid grid-cols-3 gap-2 text-xs text-center">{[['Engine',b.cc?`${b.cc} cc`:b.category==='Electric'?'Electric':'—'],['Power',b.powerHp?`≈${b.powerHp} hp`:'—'],['Top speed','—']].map(([k,v])=><div key={k} className="rounded-lg bg-white/5 py-1.5"><dt className="opacity-60">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
   <div className={`text-sm font-semibold ${b.price?.lkr?'text-a3':'opacity-60'}`} title={b.price?`${b.price.source||''} ${b.price.updated||''}`:'Add a verified price in src/data/prices.json'}>{fmt(b.price,s.currency)}{b.price?.estimate&&' (estimate)'}</div>
   <div className="mt-auto flex gap-2 pt-2"><button className="btn flex-1 justify-center" onClick={()=>go('/bike/'+b.id)}>Explore in 3D</button>
    <button className={`btn o ${c?'sel':''}`} aria-pressed={c} title="Compare" onClick={()=>s.toggleCmp(b.id)}>⇄</button></div></div></article>}
export function Navbar(){const s=useS();const [o,setO]=useState(false)
 const L=[['/','Home'],['/#premium','Premium'],['/#collection','Collection'],['/academy','Repair Academy'],['/compare',`Compare (${s.cmp.length})`],['/wishlist',`Wishlist (${s.wish.length})`],['/quiz','Quiz']]
 return <header className="sticky top-0 z-40 glass !rounded-none backdrop-blur-xl"><nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main">
  <a href="#/" className="fh font-extrabold text-xl">🏍️ Bike<span className="text-a3">Vault</span> LK</a>
  <div className={`${o?'flex':'hidden'} md:flex absolute md:static top-16 left-0 right-0 flex-col md:flex-row gap-1 md:gap-2 items-stretch md:items-center p-4 md:p-0 glass md:!bg-transparent md:!border-0`}>
   {L.map(([h,t])=><a key={h} href={'#'+h} onClick={()=>setO(false)} className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm">{t}</a>)}
   <select className="inp !py-1.5 !px-2 text-xs" value={s.currency} onChange={e=>s.setCurrency(e.target.value)} aria-label="Display currency">{CURRENCY_KEYS.map(k=><option key={k} value={k}>{CURRENCIES[k].symbol} {k}</option>)}</select>
   <select className="inp !py-1.5 !px-2 text-xs" value={s.theme} onChange={e=>s.setTheme(e.target.value)} aria-label="Colour theme"><option value="showroom">◻ Showroom</option><option value="modern">⚡ Modern</option><option value="vintage">📻 Vintage</option><option value="midnight">🌌 Midnight</option><option value="ocean">🌊 Ocean</option><option value="sand">🏜️ Sand</option></select></div>
  <button className="md:hidden btn o" aria-label="Menu" aria-expanded={o} onClick={()=>setO(!o)}>☰</button></nav></header>}
export function Footer(){const A=({h,t})=><li><a className="opacity-70 hover:opacity-100" href={'#'+h}>{t}</a></li>
 return <footer className="mt-20 border-t border-white/10 bg-black/30"><div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
  <div><div className="fh font-bold text-lg">BikeVault LK</div><p className="opacity-70 mt-2">Explore bikes, discover parts, master repairs.</p></div>
  <div><h4 className="font-semibold mb-2">Navigate</h4><ul className="space-y-1"><A h="/" t="Home"/><A h="/#collection" t="Collection"/><A h="/compare" t="Compare"/><A h="/wishlist" t="Wishlist"/></ul></div>
  <div><h4 className="font-semibold mb-2">Categories</h4><ul className="space-y-1 columns-2">{CATS.map(c=><A key={c} h={`/?cat=${c}#collection`} t={c}/>)}</ul></div>
  <div><h4 className="font-semibold mb-2">Learn &amp; connect</h4><ul className="space-y-1"><A h="/academy" t="Repair Academy"/><A h="/quiz" t="Quizzes &amp; badges"/><li><a className="opacity-70 hover:opacity-100" href="mailto:hello@bikevault.lk">Contact</a></li><li className="flex gap-3 pt-1"><a href="https://facebook.com" aria-label="Facebook" rel="noopener">Facebook</a><a href="https://instagram.com" aria-label="Instagram" rel="noopener">Instagram</a><a href="https://youtube.com" aria-label="YouTube" rel="noopener">YouTube</a></li></ul></div></div>
  <div className="text-center py-5 border-t border-white/10 text-sm opacity-80">Indicative FX snapshot {FX_SNAPSHOT_DATE}; verify dealer prices and live rates before purchase. · Website designed and developed by Sajith.</div></footer>}
import {Component} from 'react'
export class Boundary extends Component{state={e:false};static getDerivedStateFromError(){return{e:true}};render(){return this.state.e?this.props.fallback:this.props.children}}
