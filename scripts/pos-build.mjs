/**
 * Pós-build: transforma o pacote de página única em um conjunto de URLs reais.
 *
 * O Vite entrega um único `dist/index.html`. Um host estático só devolve esse
 * arquivo para `/` — qualquer outro caminho dá 404 antes do JavaScript rodar.
 * Este script escreve uma casca HTML por rota, cada uma com o próprio título,
 * descrição, canônica e og:url. O conteúdo continua vindo do React; o que muda
 * é que cada endereço passa a existir de verdade, com os metadados certos para
 * a busca e para a prévia de link no WhatsApp.
 *
 * Gera também sitemap.xml, robots.txt e o 404 de fallback.
 *
 * Roda sozinho no `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');

const { site, paginas } = JSON.parse(
  readFileSync(join(raiz, 'src/lib/rotas.json'), 'utf8'),
);
const base = site.replace(/\/+$/, '');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('pos-build: dist/index.html não existe. Rode o vite build antes.');
  process.exit(1);
}

const molde = readFileSync(join(dist, 'index.html'), 'utf8');

const escapar = (t) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Troca o conteúdo de uma meta/link já existente, sem duplicar tags. */
function trocarAtributo(html, seletor, atributo, valor) {
  const re = new RegExp(`(<[^>]*${seletor}[^>]*\\s${atributo}=")[^"]*(")`, 'i');
  return re.test(html) ? html.replace(re, `$1${escapar(valor)}$2`) : html;
}

function montarPagina(rota) {
  const url = base + rota.caminho;
  let html = molde;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapar(rota.titulo)}</title>`);
  html = trocarAtributo(html, 'name="description"', 'content', rota.descricao);
  html = trocarAtributo(html, 'property="og:title"', 'content', rota.titulo);
  html = trocarAtributo(html, 'property="og:description"', 'content', rota.descricao);
  html = trocarAtributo(html, 'name="twitter:title"', 'content', rota.titulo);
  html = trocarAtributo(html, 'name="twitter:description"', 'content', rota.descricao);
  html = trocarAtributo(html, 'rel="canonical"', 'href', url);

  // Prévia de link em WhatsApp e LinkedIn quer URL absoluta de imagem
  html = trocarAtributo(html, 'property="og:image"', 'content', `${base}/assets/img/og-speakgo.png`);
  html = trocarAtributo(html, 'name="twitter:image"', 'content', `${base}/assets/img/og-speakgo.png`);

  // og:url não existe no molde; entra logo depois de og:type
  if (/property="og:url"/i.test(html)) {
    html = trocarAtributo(html, 'property="og:url"', 'content', url);
  } else {
    html = html.replace(
      /(<meta property="og:type"[^>]*>)/i,
      `$1\n    <meta property="og:url" content="${escapar(url)}" />`,
    );
  }

  return html;
}

let escritas = 0;
for (const rota of paginas) {
  const html = montarPagina(rota);
  if (rota.caminho === '/') {
    writeFileSync(join(dist, 'index.html'), html);
  } else {
    const pasta = join(dist, rota.caminho);
    mkdirSync(pasta, { recursive: true });
    writeFileSync(join(pasta, 'index.html'), html);
  }
  escritas++;
}

// Fallback para host que não faz reescrita própria (GitHub Pages, por exemplo)
writeFileSync(join(dist, '404.html'), readFileSync(join(dist, 'index.html')));

const hoje = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas
  .map(
    (r) => `  <url>
    <loc>${base}${r.caminho}</loc>
    <lastmod>${hoje}</lastmod>
    <priority>${r.prioridade}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`,
);

console.log(
  `pos-build: ${escritas} páginas, sitemap com ${paginas.length} URLs, robots.txt e 404.html — base ${base}`,
);
