import {useState,useRef,useEffect} from 'react'
import {Viewer,HOME,hiddenFor,glbUrl} from './Scene.jsx';import {PARTS,GROUPS} from './data/parts3d.js';import {PARTS_INFO,ELECTRIC_HIDE} from './data/info.js'
const LV=['','Beginner','Intermediate','Advanced']
export default function Panel({bike}){
 const [ex,setEx]=useState(false),[sel,setSel]=useState(null),[auto,setAuto]=useState(false),[glb,setGlb]=useState(null),[learn,setLearn]=useState(null),[lb,setLb]=useState(true),[query,setQuery]=useState(''),ctl=useRef()
 useEffect(()=>{setGlb(null);setSel(null);setEx(false);setLearn(null);glbUrl(bike.id).then(setGlb)},[bike.id])
 const grp=learn&&GROUPS[learn],hidden=grp?PARTS.map(p=>p.id).filter(i=>!grp.includes(i)).concat(hiddenFor(bike)):hiddenFor(bike),key=glb?Object.keys(PARTS_INFO).find(k=>sel?.toLowerCase().includes(k)):sel,info=PARTS_INFO[key]
 const parts=Object.entries(PARTS_INFO).filter(([k,v])=>!hidden.includes(k)&&`${k} ${v[0]} ${v[1]} ${v[2]}`.toLowerCase().includes(query.toLowerCase().trim()))
 const pick=k=>{if(learn===k){setLearn(null);setSel(null);setEx(false);return}setLearn(k);setSel(k);setEx(true);const c=ctl.current;if(c){c.object.position.set(2.8,1.1,3.8);c.target.set(0,.3,0);c.update()}}
 const reset=()=>{setLearn(null);const c=ctl.current;if(!c)return;c.object.position.set(...HOME);c.target.set(0,.7,0);c.update();setSel(null)}
 const zoom=f=>{const c=ctl.current;if(!c)return;c.object.position.sub(c.target).multiplyScalar(f).add(c.target);c.update()}
 const B=({on,t,l})=><button className={`btn o !py-1.5 text-sm ${l?'sel':''}`} onClick={on} aria-pressed={l}>{t}</button>
 return <section className="grid lg:grid-cols-3 gap-4" aria-label="3D viewer">
  <div className="lg:col-span-2 glass relative h-[460px] md:h-[560px] overflow-hidden"><Viewer labels={lb&&(ex||!!learn)} exploded={ex||!!learn} sel={sel} onSelect={setSel} auto={auto} ctl={ctl} hidden={hidden} glb={glb}/>
   <div className="absolute top-3 left-3 text-xs glass px-3 py-1.5">{glb?'✅ Real GLB model':'ℹ️ Generic schematic model — not an exact replica of this bike'}</div>
   <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 justify-center">
    <B on={()=>{setLearn(null);setEx(!ex)}} t={ex?'🧩 Reassemble':'💥 Exploded view'} l={ex&&!learn}/><B on={()=>setAuto(!auto)} t="🔄 Rotate" l={auto}/><B on={()=>zoom(.8)} t="＋ Zoom"/><B on={()=>zoom(1.25)} t="－ Zoom"/><B on={()=>setLb(!lb)} t="🏷️ Labels" l={lb}/><B on={reset} t="⟲ Reset view"/></div></div>
  <aside className="glass p-4 max-h-[560px] overflow-auto">
   <div className="mb-4 pb-4 border-b border-white/10"><div className="font-semibold text-sm mb-2">🔧 Repair learning mode</div><p className="text-xs opacity-70 mb-2">Pick a system to isolate it in an exploded view and read how it works and how to maintain it.</p>
    <div className="flex flex-wrap gap-1.5">{[['engine','Engine'],['brakes','Brakes'],['chain','Chain'],['suspension','Suspension'],['wheels','Wheels']].filter(([k])=>!hiddenFor(bike).includes(k)).map(([k,t])=><button key={k} className={`chip ${learn===k?'on':''}`} aria-pressed={learn===k} onClick={()=>pick(k)}>{t}</button>)}</div>
    {learn&&<p className="text-xs mt-2 opacity-80">General guidance, not model-specific. Always follow your bike's workshop manual. <a className="underline text-a3" href="#/academy">Open step-by-step lessons →</a></p>}</div>
   {info?<div className="mb-4" aria-live="polite"><div className="fh text-xl font-bold text-a3">{info[0]}</div><span className="chip on mt-1 inline-block">{LV[info[6]]}</span>
    <dl className="text-sm space-y-2 mt-3"><div><dt className="font-semibold">Function</dt><dd className="opacity-80">{info[1]}</dd></div><div><dt className="font-semibold">Location</dt><dd className="opacity-80">{info[2]}</dd></div><div><dt className="font-semibold">Common problems</dt><dd className="opacity-80">{info[3]}</dd></div><div><dt className="font-semibold">Tools</dt><dd className="opacity-80">{info[4]}</dd></div><div><dt className="font-semibold">Maintenance</dt><dd className="opacity-80">{info[5]}</dd></div></dl></div>
   :<p className="text-sm opacity-70 mb-4">{sel&&glb?`Selected mesh: ${sel}`:'Click a part on the bike, or choose from the list, to see what it does.'}</p>}
   <div className="flex gap-2 mb-3"><label className="sr-only" htmlFor="part-search">Search components</label><input id="part-search" className="inp flex-1 !py-2" placeholder="Search components…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button className="chip" onClick={()=>setQuery('')} aria-label="Clear component search">Clear</button>}</div>
   <div className="flex items-center justify-between gap-2 mb-2"><span className="text-xs opacity-60">Components ({parts.length})</span>{sel&&<button className="text-xs underline opacity-70 hover:opacity-100" onClick={()=>setSel(null)}>Clear selection</button>}</div>
   <div className="flex flex-wrap gap-1.5" role="list" aria-label="Motorcycle components">{parts.map(([k,v])=><button type="button" key={k} role="listitem" aria-pressed={sel===k||key===k} className={`chip ${sel===k||key===k?'on':''}`} onClick={()=>setSel(sel===k?null:k)}>{v[0]}</button>)}</div>
   {!parts.length&&<p className="text-xs opacity-60 mt-3">No components match “{query}”. Try engine, wheel, chain or brake.</p>}
   {bike.category==='Electric'&&<p className="text-xs opacity-60 mt-3">Electric bike: engine, fuel, clutch, gearbox and exhaust parts are hidden (the generic model uses a combustion layout).</p>}</aside></section>}
