import dados from './rotas.json';

/**
 * Rotas do site.
 *
 * O site trocou endereços por hash (`/#programas`) por caminhos de verdade
 * (`/programas`). O motivo é direto: o Google não trata fragmento como URL
 * separada — com hash, as oito páginas eram uma só aos olhos da busca.
 *
 * A tabela vive em `rotas.json` porque o script de pós-build também precisa
 * dela, e um arquivo TypeScript o Node não lê sem transpilar.
 */

export type PageType =
  | 'home'
  | 'sobre'
  | 'programas'
  | 'metodo'
  | 'como'
  | 'materiais'
  | 'contato'
  | 'privacidade';

export interface Rota {
  id: PageType;
  caminho: string;
  titulo: string;
  descricao: string;
  prioridade: string;
}

export const SITE_URL: string = dados.site;
export const ROTAS = dados.paginas as Rota[];

const POR_ID = new Map(ROTAS.map((r) => [r.id, r]));
const POR_CAMINHO = new Map(ROTAS.map((r) => [r.caminho, r]));

/** Caminho de uma página, para usar em `href`. */
export const caminhoDe = (id: PageType): string => POR_ID.get(id)?.caminho ?? '/';

/** Metadados de uma página. */
export const rotaDe = (id: PageType): Rota => POR_ID.get(id) ?? ROTAS[0];

/**
 * Descobre a página a partir do endereço atual.
 * Aceita também os hashes antigos (`/#programas`), para que links já
 * compartilhados por WhatsApp continuem chegando no lugar certo.
 */
export function paginaDoEndereco(): { pagina: PageType; legado: boolean } {
  if (typeof window === 'undefined') return { pagina: 'home', legado: false };

  const hash = window.location.hash.replace('#', '');
  if (hash && POR_ID.has(hash as PageType)) {
    return { pagina: hash as PageType, legado: true };
  }

  const caminho = window.location.pathname.replace(/\/+$/, '') || '/';
  return { pagina: (POR_CAMINHO.get(caminho)?.id as PageType) ?? 'home', legado: false };
}
