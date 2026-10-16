import {useEffect,useState} from 'react'

const base=import.meta.env.BASE_URL
const colours=['red','yellow','blue','black','white']
export default function Hero3D(){
 const [paused,setPaused]=useState(false)
 useEffect(()=>{colours.forEach(c=>{const i=new Image();i.src=`${base}images/bike-${c}.png`})},[])
 return <div className="hero-bike-stage hero-bike-stage-cutout" aria-label="BMW R 18 motorcycle preview">
  <div className="hero-orbit-ring hero-ring-one" aria-hidden="true"/><div className="hero-orbit-ring hero-ring-two" aria-hidden="true"/>
  <div className={`hero-bike-spin ${paused?'is-paused':''}`}><div className="hero-bike-glow"/><img src={`${base}images/bike-blue.png`} alt="BMW R 18 in Deep Blue" className="hero-bike-photo hero-bike-cutout"/></div>
  <div className="hero-bike-caption glass"><span className="hero-live-dot"/><span><b>BMW R 18</b><small>Deep Blue · chrome details · showroom preview</small></span><button className="chip" onClick={()=>setPaused(p=>!p)} aria-pressed={paused}>{paused?'Play':'Pause'}</button></div>
 </div>
}
