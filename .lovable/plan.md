---
name: Landing Page Optimization Plan
description: Implement OG tags, image dimensions, preloading, UTM centralization, and alt text for /modao and /modao-promocao.
type: feature
---
# Plano de Otimização das Landing Pages

## Alterações Técnicas
1.  **SEO & Social Share (Meta Tags)**:
    *   Adicionar `og:image` com a URL absoluta `https://asmaisouvidasdobrasil.com/landing/capa-produto.webp` em `public/landing/modao/index.html` e `public/landing/modao-promocao/index.html`.
    *   Garantir presença de `og:title` e `og:description` consistentes.

2.  **Performance & Layout Stability (CLS)**:
    *   Adicionar atributos `width` e `height` em todas as imagens (Hero, Player, Carrosséis, Bônus, Oferta e Garantia) baseados nas dimensões reais identificadas via `ffprobe`.

3.  **Carregamento Antecipado (Preload)**:
    *   Inserir `<link rel="preload" href="../styles.css" as="style">` e `<link rel="preload" href="../script.js" as="script">` no topo do `<head>`.

4.  **Centralização da Lógica de UTM**:
    *   Mover o script de propagação de parâmetros de URL do final dos HTMLs para uma nova função `propagateUTMs()` dentro de `public/landing/script.js`.
    *   Substituir o bloco de script inline nos HTMLs por uma chamada simples `propagateUTMs();`.

5.  **Acessibilidade & SEO (Alt Text)**:
    *   Preencher descrições significativas em todos os atributos `alt` que estavam vazios ou genéricos, especialmente nos carrosséis de coletâneas e bônus.

## Arquivos Impactados
*   `public/landing/script.js`
*   `public/landing/modao/index.html`
*   `public/landing/modao-promocao/index.html`
