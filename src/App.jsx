import {useEffect,useState} from 'react'
import {Navbar,Footer} from './ui.jsx';import {useS} from './store.jsx';import {Home,Detail,Academy,Compare,Wishlist,Quiz} from './pages.jsx'
const parse=()=>{const [m,anchor]=(location.hash.slice(1)||'/').split('#');const [path,qs]=m.split('?');return{path:path||'/',q:Object.fromEntries(new URLSearchParams(qs||'')),anchor}}
export default function App(){
 const [r,setR]=useState(parse),s=useS(),[ld,setLd]=useState(true)
 useEffect(()=>{const f=()=>setR(parse());addEventListener('hashchange',f);const t=setTimeout(()=>setLd(false),700);return()=>{removeEventListener('hashchange',f);clearTimeout(t)}},[])
 useEffect(()=>{const t=setTimeout(()=>{if(r.anchor)document.getElementById(r.anchor)?.scrollIntoView({behavior:'smooth'});else scrollTo(0,0)},60);if(!r.path.startsWith('/bike'))document.title='BikeVault LK — Explore Bikes. Discover Parts. Master Repairs.';return()=>clearTimeout(t)},[r])
 const p=r.path;let v
 if(p.startsWith('/bike/'))v=<Detail id={p.slice(6)}/>;else if(p==='/academy')v=<Academy/>;else if(p==='/compare')v=<Compare/>;else if(p==='/wishlist')v=<Wishlist/>;else if(p==='/quiz')v=<Quiz/>;else v=<Home q={r.q}/>
 return <><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
  {ld&&<div className="loader" aria-label="Loading"><div className="wheel"/></div>}<Navbar/><main id="main" key={p+(r.q.cat||'')}>{v}</main><Footer/>
  {s.cmp.length>0&&p!=='/compare'&&<a href="#/compare" className="btn fixed bottom-4 right-4 z-40 shadow-xl">Compare ({s.cmp.length}/3) →</a>}
  {s.toast&&<div role="status" className="fixed bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 z-50">{s.toast}</div>}</>}
