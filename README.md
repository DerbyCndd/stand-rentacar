# AutoFerasa · Stand & Rent a Car

Site de um stand automóvel com serviço de aluguer de viaturas, feito com **Next.js 16** (App Router, TypeScript) e exportado como site estático para o **GitHub Pages**.

> O stand fica em Braga e os preços estão em euros. Os restantes textos e a frota de aluguer ainda são **dados de exemplo**: substitua-os pelos reais no painel.

## O que tem

**Site público**
- Início com pesquisa rápida (comprar / alugar), destaques, passos do aluguer e visita ao stand
- `/comprar`: listagem com filtros (marca, carroçaria, combustível, caixa, preço), ordenação e simulador de financiamento
- `/comprar/veiculo?id=…`: ficha da viatura, equipamento, marcação de visita, financiamento e sugestões
- `/alugar`: frota por categoria e datas; `/alugar/viatura?id=…`: calculadora de aluguer (dias + extras) e reserva por WhatsApp ou formulário
- `/contactos`: formulário, morada, horário e mapa
- Acessível (teclado, foco visível, rótulos, `aria-live`, contraste, `prefers-reduced-motion`) e responsivo (mobile-first)

**Painel de gestão** em `/admin` (palavra-passe de demonstração em `lib/site.ts`)
- Pedidos recebidos pelos formulários (marcar como tratado, apagar)
- CRUD de viaturas à venda e da frota de aluguer (editar, marcar vendido/alugado, apagar com confirmação)

## Como correr

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # gera a pasta out/ (site estático)
```

## Personalizar

| O quê | Onde |
| --- | --- |
| Nome, telefone, WhatsApp, morada, horário, palavra-passe do painel | `lib/site.ts` |
| Viaturas e frota de exemplo, extras de aluguer | `lib/data.ts` |
| Cores, tipografia, espaçamentos | variáveis no topo de `app/globals.css` |
| Ilustrações das viaturas | `components/CarArt.tsx` |

Depois de editar o WhatsApp em `lib/site.ts`, todos os botões passam a usar o seu número.

## Publicar no GitHub Pages

```bash
npm run deploy
```

Compila o site e envia a pasta `out` para o ramo `gh-pages`. Em *Settings → Pages* a origem deve ser o ramo `gh-pages` (raiz). O endereço fica `https://<utilizador>.github.io/<repositório>/`.

## Importante: limites desta versão

O GitHub Pages só serve ficheiros estáticos, **não tem servidor nem base de dados**. Por isso:

- As alterações feitas no painel e os pedidos dos formulários ficam guardados **no navegador de quem os fez** (`localStorage`). Um visitante não vê o que o administrador alterou noutro computador.
- A palavra-passe do painel está no código, portanto **não protege nada**. É só para demonstração.
- Nada é enviado por e-mail. O contacto real passa pelo botão de WhatsApp.

### Caminho para produção

1. **Base de dados**: p. ex. Supabase (Postgres) com tabelas `vehicles`, `rentals` e `leads`.
2. **Ligar o site**: reescreva `lib/store.ts` para ler e gravar na API. As páginas não precisam de mudar, porque só usam `useVehicles`, `useRentals` e `useLeads`.
3. **Autenticação a sério** no `/admin` (Supabase Auth ou similar) e regras de acesso na base de dados.
4. **Alojamento com servidor** (Vercel, por exemplo): remova `output: "export"` de `next.config.ts` e passe as fichas de viatura para rotas dinâmicas (`/comprar/[id]`) para melhor SEO.
5. Imagens reais das viaturas (as ilustrações atuais são vetoriais, sem fotos de terceiros).

## Estrutura

```
app/            páginas (App Router) e estilos globais
components/     Header, Footer, cartões, formulários, simuladores
lib/            dados, tipos, formatação e armazenamento
scripts/        deploy.mjs
```
