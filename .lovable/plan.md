# Plano de Otimização de Performance e Bandwidth

Otimização técnica da landing page focada em reduzir o consumo de recursos (créditos/bandwidth) sem alterar o design ou funcionalidade.

## Mudanças Técnicas

### 1. Otimização de Imagens
- Converter todos os arquivos `.jpg` restantes em `public/landing/covers/`, `public/landing/paredao/` e `public/landing/sertao.jpg` para `.webp`.
- Comprimir imagens `.webp` que estão acima de 200KB (`bonus1.webp`, `capa-produto.webp`, `mockup.webp`) usando qualidade 80 para reduzir o peso sem perda visual perceptível.
- Atualizar referências no `index.html` e `styles.css`.

### 2. Otimização de Recursos (HTML/JS/CSS)
- Alterar o carregamento do áudio em `index.html` de `preload="metadata"` para `preload="none"`.
- Adicionar `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` no head para acelerar o carregamento de fontes.
- Minificar `styles.css` e `script.js` (remover comentários e espaços).

### 3. Sincronização
- Garantir que todas as mudanças em `public/landing/` sejam espelhadas na pasta `landing/` na raiz.
- Regerar o `landing.zip` com os arquivos otimizados.

## Detalhes Técnicos
- **Ferramentas:** Python (Pillow) para processamento de imagens, `sed` para substituições em texto.
- **Economia Estimada:** Redução de ~1.5MB na carga inicial e economia recorrente de bandwidth em cada visita.
