import {Suspense,useRef,useEffect,useMemo,Component} from 'react'
import {Canvas,useFrame} from '@react-three/fiber'
import {OrbitControls,Sparkles,ContactShadows,useGLTF,Html,Environment,Lightformer} from '@react-three/drei'
import * as THREE from 'three'
import {PARTS} from './data/parts3d.js'
import {ELECTRIC_HIDE} from './data/info.js'
export class Boundary extends Component{state={e:false};static getDerivedStateFromError(){return{e:true}};render(){return this.state.e?this.props.fallback:this.props.children}}
const Geo=({m})=>m.g==='b'?<boxGeometry args={m.a}/>:m.g==='c'?<cylinderGeometry args={m.a}/>:m.g==='t'?<torusGeometry args={m.a}/>:<sphereGeometry args={m.a}/>
function M({m,part,t,sel,hov,setHov,onSelect,labels}){
 const ref=useRef();const ex=m.ex||part.ex
 useFrame(()=>{const k=t.current;ref.current?.position.set(m.p[0]+ex[0]*k,m.p[1]+ex[1]*k,m.p[2]+ex[2]*k)})
 const on=sel===part.id,dim=sel&&!on
 return <mesh ref={ref} name={part.id} rotation={m.r||[0,0,0]} scale={m.s||1} onClick={onSelect&&(e=>{e.stopPropagation();onSelect(on?null:part.id)})}
  onPointerOver={onSelect&&(e=>{e.stopPropagation();setHov(part.id);document.body.style.cursor='pointer'})} onPointerOut={onSelect&&(()=>{setHov(null);document.body.style.cursor=''})}>
  <Geo m={m}/><meshStandardMaterial color={m.c||part.color} metalness={.3} roughness={.45} emissive={on?'#ff7a1a':hov===part.id?'#3b82f6':'#000'} emissiveIntensity={on?.9:.4} transparent={dim||(m.op??part.op??1)<1} opacity={dim?.3:(m.op??part.op??1)}/>
  {labels&&m.lab&&<Html position={[0,m.lo??.12,0]} center distanceFactor={4} zIndexRange={[5,0]} style={{pointerEvents:'none'}}><div style={{font:'600 10px Inter,system-ui,sans-serif',color:'#fff',background:'rgba(8,10,20,.72)',border:'1px solid rgba(255,255,255,.35)',borderRadius:8,padding:'2px 8px',whiteSpace:'nowrap'}}>{m.lab}</div></Html>}</mesh>}
export function Model({exploded,sel,onSelect,hidden=[],hov,setHov,labels}){
 const t=useRef(0);useFrame(()=>{t.current+=((exploded?1:0)-t.current)*.07})
 return <group>{PARTS.filter(p=>!hidden.includes(p.id)).map(p=>p.m.map((m,i)=><M key={p.id+i} m={m} part={p} t={t} sel={sel} hov={hov} setHov={setHov} onSelect={onSelect} labels={labels}/>))}</group>}
function Glb({url,exploded,sel,onSelect}){
 const {scene}=useGLTF(url);const obj=useMemo(()=>scene.clone(true),[scene]);const t=useRef(0),sc=useRef(1)
 useEffect(()=>{const b=new THREE.Box3().setFromObject(obj),c=b.getCenter(new THREE.Vector3());sc.current=3/Math.max(...b.getSize(new THREE.Vector3()).toArray())
  obj.traverse(o=>{if(o.isMesh){o.userData.base=o.position.clone();o.userData.dir=new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3()).sub(c).normalize()
   o.material=o.material.clone()}})},[obj])
 useEffect(()=>{obj.traverse(o=>{if(o.isMesh&&o.material.emissive){o.material.emissive.set(o.name===sel?'#ff7a1a':'#000')}})},[sel,obj])
 useFrame(()=>{t.current+=((exploded?1:0)-t.current)*.07;obj.traverse(o=>{if(o.isMesh&&o.userData.base)o.position.copy(o.userData.base).addScaledVector(o.userData.dir,t.current*.6/sc.current)})})
 return <group scale={sc.current} position={[0,.2,0]}><primitive object={obj} onClick={e=>{e.stopPropagation();onSelect(e.object.name)}}/></group>}
function Intro({ctl}){const el=useRef(0);useFrame((s,d)=>{el.current+=d;if(el.current<1.8){s.camera.position.lerp(new THREE.Vector3(2.7,1.5,3.3),.05)}})
 useEffect(()=>{},[ctl]);return null}
export const HOME=[2.7,1.5,3.3]
const Env=()=><Environment resolution={128}><Lightformer form="rect" intensity={2.2} position={[0,5,0]} scale={[10,10,1]} rotation-x={Math.PI/2}/><Lightformer form="rect" intensity={2} color="#8b5cf6" position={[-5,1,-1]} scale={[10,3,1]} rotation-y={Math.PI/2}/><Lightformer form="rect" intensity={2} color="#ff9a3c" position={[5,1,2]} scale={[10,3,1]} rotation-y={-Math.PI/2}/></Environment>
export function Viewer({exploded,sel,onSelect,auto,ctl,hidden,glb,labels}){
 const [hov,setHov]=useRefState()
 return <Canvas dpr={[1,1.7]} camera={{position:[7,4,8],fov:40}} shadows={false}>
  <hemisphereLight args={['#aab8ff','#201028',1.1]}/>
  <directionalLight position={[4,6,3]} intensity={2}/><pointLight position={[-4,2,-3]} color="#8b5cf6" intensity={30}/><pointLight position={[4,1,4]} color="#f97316" intensity={18}/>
  <Suspense fallback={null}>{glb?<Glb url={glb} exploded={exploded} sel={sel} onSelect={onSelect}/>:<Model exploded={exploded} sel={sel} onSelect={onSelect} hidden={hidden} hov={hov} setHov={setHov} labels={labels}/>}</Suspense>
  <mesh rotation-x={-Math.PI/2} position-y={-.02}><circleGeometry args={[3.2,64]}/><meshStandardMaterial color="#12142a" metalness={.8} roughness={.35}/></mesh>
  <ContactShadows position={[0,0,0]} opacity={.5} scale={9} blur={2.5}/><Intro/>
  <OrbitControls ref={ctl} target={[0,.7,0]} makeDefault enableDamping autoRotate={auto} autoRotateSpeed={1.2} minDistance={2} maxDistance={9} maxPolarAngle={Math.PI*.52}/></Canvas>}
import {useState} from 'react'
const useRefState=()=>useState(null)
function Spin(){const r=useRef();useFrame((s,d)=>{r.current.rotation.y+=d*.4;r.current.position.y=Math.sin(s.clock.elapsedTime)*.05});return <group ref={r} scale={1.1} position={[0,-.3,0]}><Model/></group>}
export function Hero3D(){return <Canvas dpr={[1,1.5]} camera={{position:[3.4,1.5,4.2],fov:40}}><hemisphereLight args={['#aab8ff','#201028',1.2]}/><directionalLight position={[4,5,3]} intensity={2}/>
 <pointLight position={[-4,2,-2]} color="#8b5cf6" intensity={40}/><pointLight position={[4,0,3]} color="#f97316" intensity={25}/><Spin/><Sparkles count={50} scale={7} size={2.5} speed={.4} color="#6aa6ff"/></Canvas>}
export const hiddenFor=b=>b?.category==='Electric'?ELECTRIC_HIDE:[]
export const glbUrl=async id=>{try{const u=`${import.meta.env.BASE_URL}models/${id}.glb`;const r=await fetch(u,{method:'HEAD'});const c=r.headers.get('content-type')||'';return r.ok&&!c.includes('html')?u:null}catch{return null}}
