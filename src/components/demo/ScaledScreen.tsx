import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  baseWidth: number
  children: ReactNode
  className?: string
  /** Se true, o conteúdo rola suavemente até o fim quando o grupo `proj` recebe hover. */
  hoverScroll?: boolean
  /** Se true, exibe a altura total (para uso em área com rolagem). */
  fullHeight?: boolean
}

/** Renderiza conteúdo de largura fixa reduzido proporcionalmente à largura do container. */
export function ScaledScreen({ baseWidth, children, className = '', hoverScroll, fullHeight }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [dist, setDist] = useState(0)
  const [contentH, setContentH] = useState(0)

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const update = () => {
      const s = o.clientWidth / baseWidth
      setScale(s)
      setContentH(i.scrollHeight * s)
      setDist(Math.max(0, i.scrollHeight * s - o.clientHeight))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [baseWidth])

  return (
    <div
      ref={outer}
      className={`relative overflow-hidden ${className}`}
      style={fullHeight ? { height: contentH || undefined } : undefined}
    >
      <div
        className={`absolute left-0 top-0 ${hoverScroll ? 'transition-transform duration-[4500ms] ease-in-out group-hover/proj:[transform:translateY(calc(var(--dist)*-1))] motion-reduce:transition-none' : ''}`}
        style={{ ['--dist' as string]: `${dist}px` }}
      >
        <div
          ref={inner}
          aria-hidden="true"
          style={{
            width: baseWidth,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            opacity: scale ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
