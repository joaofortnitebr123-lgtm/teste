import type { ReactNode } from 'react'

export function Laptop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-t-[14px] border border-white/15 bg-gradient-to-b from-[#2a3550] to-[#141a2b] p-[2.2%] pb-[2.6%] shadow-[0_40px_80px_-30px_rgb(0_0_0/.9)]">
        <span className="absolute left-1/2 top-[0.9%] h-1 w-1 -translate-x-1/2 rounded-full bg-black/70" />
        <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-black">{children}</div>
      </div>
      <div className="relative mx-[-6%] h-3 rounded-b-[14px] bg-gradient-to-b from-[#3a4562] to-[#1a2034] shadow-[0_20px_30px_-10px_rgb(0_0_0/.8)] sm:h-4">
        <span className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-black/30" />
      </div>
    </div>
  )
}

export function Desktop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="w-full rounded-[16px] border border-white/15 bg-gradient-to-b from-[#232c44] to-[#11172a] p-[1.6%] shadow-[0_40px_80px_-30px_rgb(0_0_0/.9)]">
        <div className="aspect-[16/9.4] overflow-hidden rounded-[6px] bg-black">{children}</div>
      </div>
      <div className="h-10 w-[14%] bg-gradient-to-b from-[#2a3350] to-[#161c2e] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)] sm:h-14" />
      <div className="h-2 w-[30%] rounded-full bg-gradient-to-b from-[#36405e] to-[#1a2034] shadow-[0_12px_20px_-6px_rgb(0_0_0/.8)]" />
    </div>
  )
}

export function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[13%/6.2%] border border-white/20 bg-gradient-to-b from-[#2f3a58] to-[#121829] p-[3.5%] shadow-[0_40px_70px_-25px_rgb(0_0_0/.95)] ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[10.5%/5%] bg-black">
        <span className="absolute left-1/2 top-[1.6%] z-10 h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}
