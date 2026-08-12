// Preciso de uma nova auditoria no código atual das páginas /modao e /modao-promocao, dessa vez focada em pontos que não travam a página mas prejudicam conversão, velocidade ou alcance. Não corrija nada ainda, apenas liste os achados por categoria, com arquivo/trecho relevante, e classifique como CRÍTICO, MODERADO ou BAIXO.
// 
// 1. PERFORMANCE E CARREGAMENTO
// - Liste todas as imagens da página e verifique se estão em formato otimizado (WebP/AVIF) e com atributos width/height definidos (evita layout shift).
// - Verifique se há imagens carregando sem lazy loading (loading="lazy") fora da dobra inicial (above the fold).
// - Verifique se há scripts bloqueando o carregamento (sem async/defer) que atrasem a renderização inicial.
// - Verifique o peso total de CSS/JS carregado e se há CSS/JS não utilizado nas páginas (código morto).
// 
// 2. RESPONSIVIDADE E MOBILE
// - Verifique se existem elementos com largura fixa em pixels que possam causar overflow horizontal em telas pequenas (< 375px).
// - Verifique se os botões de CTA têm área de toque adequada (mínimo 44x44px) para uso confortável no mobile.
// - Verifique se há textos com tamanho de fonte muito pequeno (abaixo de 14px) em blocos importantes de oferta/preço.
// 
// 3. SEO E METADADOS
// - Verifique se existem tags <title> e <meta description> únicas e descritivas em cada página.
// - Verifique se existem Open Graph tags (og:title, og:description, og:image) configuradas corretamente — importante pro preview do link quando compartilhado.
// - Verifique se há apenas um <h1> por página e se a hierarquia de headings (h1, h2, h3) faz sentido semanticamente.
// - Verifique se as imagens têm atributo alt preenchido.
// 
// 4. LINKS E RECURSOS QUEBRADOS
// - Liste todos os links internos e externos da página (menu, rodapé, botões secundários) e sinalize qualquer um que aponte para URL incompleta, vazia, ou domínio de teste/placeholder.
// - Verifique se há recursos (imagens, fontes, scripts) referenciando caminhos que não existem mais no projeto.
// 
// 5. FORMULÁRIOS E CAMPOS (se houver)
// - Se existir algum formulário (captura de e-mail, WhatsApp, etc.), verifique se tem validação client-side adequada e se o envio tem tratamento de erro visível pro usuário.
// 
// 6. SEGURANÇA BÁSICA
// - Verifique se há chaves de API, tokens ou credenciais expostos no código-fonte do frontend.
// - Verifique se todos os links externos usam https (não http).
// - Verifique se links com target="_blank" têm rel="noopener noreferrer" (igual aplicamos no botão de checkout).
// 
// 7. CONSISTÊNCIA ENTRE AS DUAS PÁGINAS
// - Compare /modao e /modao-promocao e liste qualquer divergência estrutural relevante (uma tem uma correção que a outra não tem, uma está com script desatualizado em relação à outra, etc.) — isso é importante porque historicamente as correções foram aplicadas manualmente em cada página e podem ter ficado dessincronizadas.
// 
// Ao final, monte uma lista priorizada do que vale corrigir primeiro, pensando em impacto sobre conversão (velocidade de carregamento e mobile pesam mais que SEO nesse tipo de página
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coleção Modão Sertanejo Raiz — Redirecionando" },
      { name: "description", content: "Redirecionando para a Coleção Modão Sertanejo Raiz." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RootRedirect,
});

function RootRedirect() {
  useEffect(() => {
    window.location.replace("/modao" + window.location.search + window.location.hash);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        aria-label="Carregando"
        role="status"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "4px solid rgba(65,38,19,.18)",
          borderTopColor: "#412613",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
