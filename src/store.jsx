import { createContext, useContext, useEffect, useState } from 'react'
import raw from './data/bikes.json'
import prices from './data/prices.json'
import { formatMoney } from './data/currency.js'
export { CURRENCIES, CURRENCY_KEYS, FX_SNAPSHOT_DATE } from './data/currency.js'
export const BIKES = raw.map(b => ({ ...b, price: prices[b.id] || null }))
export const fmt = (p, currency = 'LKR') => p?.lkr ? formatMoney(p.lkr, currency) : 'Price not verified'
const Ctx = createContext(null)
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d } catch { return d } }
function usePersist(k, d) {
  const [v, s] = useState(() => load(k, d))
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }, [k, v])
  return [v, s]
}
export const useS = () => useContext(Ctx)
export function Provider({ children }) {
  const [wish, setWish] = usePersist('bv_wish', [])
  const [cmp, setCmp] = usePersist('bv_cmp', [])
  const [recent, setRecent] = usePersist('bv_recent', [])
  const [theme, setTheme] = usePersist('bv_theme', 'showroom')
  const [currency, setCurrency] = usePersist('bv_currency', 'LKR')
  const [prog, setProg] = usePersist('bv_prog', { lessons: [], viewed: [], quizBest: 0, quizDone: false, compared: false })
  const [toast, setToast] = useState('')
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2200); return () => clearTimeout(t) }, [toast])
  useEffect(() => { if (cmp.length >= 2 && !prog.compared) setProg(p => ({ ...p, compared: true })) }, [cmp, prog.compared])
  const flip = (arr, set, id, max, msg) => {
    if (arr.includes(id)) return set(arr.filter(x => x !== id))
    if (max && arr.length >= max) return setToast(msg)
    set([...arr, id])
  }
  const badges = {
    explorer: prog.viewed.length >= 5, collector: wish.length >= 3, comparer: prog.compared,
    mechanic: prog.lessons.length >= 1, rookie: prog.quizDone, master: prog.quizBest >= 5
  }
  const value = {
    wish, cmp, recent, theme, setTheme, currency, setCurrency, toast, setToast, prog, badges,
    toggleWish: id => flip(wish, setWish, id),
    toggleCmp: id => flip(cmp, setCmp, id, 3, 'You can compare up to 3 bikes'),
    addRecent: id => { setRecent(r => [id, ...r.filter(x => x !== id)].slice(0, 8)); setProg(p => p.viewed.includes(id) ? p : { ...p, viewed: [...p.viewed, id] }) },
    doneLesson: id => setProg(p => p.lessons.includes(id) ? p : { ...p, lessons: [...p.lessons, id] }),
    setQuiz: s => setProg(p => ({ ...p, quizDone: true, quizBest: Math.max(p.quizBest, s) }))
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
