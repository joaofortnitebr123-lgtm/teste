/**
 * ============================================================
 *  DADOS DA EMPRESA — edite aqui para publicar os contatos reais
 * ============================================================
 *
 *  Todos os botões e links do site leem estas informações.
 *  Enquanto um campo estiver vazio, o site exibe o canal como
 *  "em breve" e nenhum dado falso é mostrado ao visitante.
 */

type SiteConfig = {
  name: string
  tagline: string
  contact: { whatsapp: string; instagram: string; email: string }
  whatsappMessage: string
}

export const site: SiteConfig = {
  name: 'Kael.Web',
  tagline: 'Presença digital com design, estratégia e cuidado em cada detalhe.',

  contact: {
    /** Somente números, com DDI + DDD. Ex.: '5511999999999' */
    whatsapp: '',
    /** Usuário do Instagram sem @. Ex.: 'kael.web' */
    instagram: '',
    /** E-mail comercial. Ex.: 'contato@seudominio.com.br' */
    email: '',
  },

  /** Mensagem inicial enviada ao abrir o WhatsApp */
  whatsappMessage:
    'Olá, Kael.Web! Gostaria de solicitar um orçamento para o site da minha empresa.',
}

export const nav = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'processo', label: 'Processo' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'contato', label: 'Contato' },
] as const

export function whatsappUrl(message: string = site.whatsappMessage): string | null {
  const n = site.contact.whatsapp.replace(/\D/g, '')
  if (!n) return null
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`
}

export function instagramUrl(): string | null {
  const u = site.contact.instagram.replace(/^@/, '').trim()
  return u ? `https://instagram.com/${u}` : null
}

export function emailUrl(subject = 'Orçamento — site profissional', body = ''): string | null {
  const e = site.contact.email.trim()
  if (!e) return null
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20')
  return `mailto:${e}?${q}`
}

export function formatPhone(raw: string): string {
  const n = raw.replace(/\D/g, '')
  const m = n.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `+${m[1]} (${m[2]}) ${m[3]}-${m[4]}` : raw
}
