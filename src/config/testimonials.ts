/**
 * AVALIAÇÕES
 * ----------
 * Os itens com `demo: true` são EXEMPLOS ILUSTRATIVOS de layout — não são
 * avaliações reais. Substitua-os por depoimentos autênticos de clientes
 * (com autorização) e defina `demo: false`.
 *
 * `photo` é opcional: informe o caminho de uma imagem em /public (ex.: '/clientes/ana.webp').
 * Sem foto, o site exibe as iniciais do nome.
 */

export type Testimonial = {
  name: string
  role: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  photo?: string
  demo: boolean
}

export const testimonials: Testimonial[] = [
  {
    name: 'Nome do cliente',
    role: 'Cargo · Empresa',
    text: 'Exemplo de depoimento: aqui o cliente descreve como foi a experiência de trabalhar com a Kael.Web e o que mudou na presença digital da empresa.',
    rating: 5,
    demo: true,
  },
  {
    name: 'Nome do cliente',
    role: 'Cargo · Empresa',
    text: 'Exemplo de depoimento: espaço reservado para um relato real sobre atendimento, prazos e qualidade do site entregue.',
    rating: 5,
    demo: true,
  },
  {
    name: 'Nome do cliente',
    role: 'Cargo · Empresa',
    text: 'Exemplo de depoimento: este card será substituído por uma avaliação autêntica assim que ela for recebida e autorizada.',
    rating: 5,
    demo: true,
  },
]
