# Kael.Web — Site institucional

Site institucional da **Kael.Web**, feito com React, TypeScript, Tailwind CSS v4, Motion (Framer Motion) e Lucide Icons.

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção (gera /dist)
npm run preview  # pré-visualizar o build
```

## Onde editar as informações reais

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, e-mail, mensagem padrão do WhatsApp | `src/config/site.ts` |
| Projetos do portfólio (hoje demonstrativos) | `src/config/portfolio.ts` |
| Avaliações de clientes (hoje exemplos ilustrativos) | `src/config/testimonials.ts` |
| Título, descrição e metatags de SEO | `index.html` |

- Enquanto um contato estiver vazio, o site o mostra como **"Em breve"**. Nada de número, e-mail ou perfil inventado aparece.
- Depois que o WhatsApp for preenchido, todos os botões de orçamento e o formulário abrem o WhatsApp com a mensagem já escrita. Se só houver e-mail, o formulário abre o aplicativo de e-mail.
- Projetos e avaliações com `demo: true` aparecem com o selo **Demonstração/Exemplo**. Para publicar um trabalho ou uma avaliação real, use `demo: false`.

## Estrutura

```
src/
  config/        dados editáveis (contatos, portfólio, avaliações)
  components/    Navbar, Footer, barra de progresso, UI e mockups (demo/)
  sections/      Hero, Sobre, Serviços, Portfólio, Diferenciais, Processo,
                 Avaliações, CTA final, Contato
  hooks/         hooks utilitários
```
