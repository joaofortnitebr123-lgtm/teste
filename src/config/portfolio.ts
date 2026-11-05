/**
 * PROJETOS DEMONSTRATIVOS
 * -----------------------
 * Todos os itens abaixo são conceitos criados apenas para ilustrar o estilo
 * de trabalho da Kael.Web. NÃO são clientes reais.
 *
 * Para adicionar um trabalho verdadeiro, inclua um item com `demo: false`
 * e preencha `url` com o endereço publicado do site.
 */

export type DemoKind = 'architecture' | 'health' | 'food' | 'consulting'
export type Device = 'laptop' | 'desktop' | 'phone'

export type Project = {
  slug: string
  name: string
  category: string
  description: string
  kind: DemoKind
  devices: Device[]
  demo: boolean
  url?: string
  highlights: string[]
  palette: { bg: string; surface: string; text: string; muted: string; accent: string; accent2: string }
}

export const projects: Project[] = [
  {
    slug: 'atelier-norte',
    name: 'Atelier Norte',
    category: 'Site institucional · Arquitetura',
    description:
      'Conceito de site institucional para um estúdio de arquitetura, com galeria de projetos em destaque, tipografia elegante e navegação minimalista.',
    kind: 'architecture',
    devices: ['laptop', 'phone'],
    demo: true,
    highlights: ['Galeria de projetos', 'Layout editorial', 'Formulário de contato'],
    palette: { bg: '#f3efe8', surface: '#e6dfd3', text: '#1c1a17', muted: '#6f675c', accent: '#1c1a17', accent2: '#b08d5b' },
  },
  {
    slug: 'clinica-vitalis',
    name: 'Clínica Vitalis',
    category: 'Landing page · Saúde',
    description:
      'Conceito de landing page para uma clínica, com foco em agendamento, apresentação de especialidades e transmissão de confiança.',
    kind: 'health',
    devices: ['desktop'],
    demo: true,
    highlights: ['Chamada para agendamento', 'Especialidades', 'Perguntas frequentes'],
    palette: { bg: '#f4f8fb', surface: '#ffffff', text: '#0d2a3a', muted: '#5b7384', accent: '#0f9d8a', accent2: '#2b6cb0' },
  },
  {
    slug: 'brasa-co',
    name: 'Brasa & Co.',
    category: 'Site institucional · Gastronomia',
    description:
      'Conceito de site para restaurante com cardápio digital, ambientação visual marcante e acesso rápido a reservas pelo celular.',
    kind: 'food',
    devices: ['phone'],
    demo: true,
    highlights: ['Cardápio digital', 'Mobile first', 'Botão de reserva'],
    palette: { bg: '#140d0a', surface: '#22160f', text: '#f6ebe0', muted: '#b49c87', accent: '#e8792b', accent2: '#f2b263' },
  },
  {
    slug: 'lumen-consultoria',
    name: 'Lumen Consultoria',
    category: 'Redesign · Consultoria',
    description:
      'Conceito de redesign para uma consultoria empresarial: identidade mais moderna, hierarquia clara de serviços e chamadas para ação objetivas.',
    kind: 'consulting',
    devices: ['laptop'],
    demo: true,
    highlights: ['Nova hierarquia visual', 'Página de serviços', 'CTA estratégicos'],
    palette: { bg: '#0b1020', surface: '#141b33', text: '#eef1ff', muted: '#8f99c2', accent: '#8b7bff', accent2: '#45d0c4' },
  },
]
