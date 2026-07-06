# Conexão Catadores

Este documento apresenta a estrutura técnica do projeto e mostra como personalizar as mídias utilizadas no site.

## Visão geral do código

O projeto é uma landing page estática desenvolvida com:

- HTML para organização do conteúdo em seções;
- CSS para identidade visual, layout responsivo e animações visuais;
- JavaScript para interações como menu mobile, efeito de reveal ao rolar e modais.

## Estrutura técnica

### 1. Arquivo principal: index.html

O arquivo index.html contém a estrutura do site, incluindo:

- cabeçalho e navegação;
- hero section com apresentação inicial;
- seções de conteúdo como Quem Somos, Rotina, Impacto, Histórias e Ações;
- elementos de mídia e blocos de informação.

Cada seção é organizada com classes semânticas e componentes reutilizáveis, o que facilita manutenção e futuras alterações.

### 2. Estilização: css/style.css

O arquivo CSS define:

- cores da identidade visual;
- tipografia;
- espaçamentos e layout;
- comportamento visual responsivo para desktop e mobile;
- efeitos como fundos decorativos, cards e estados interativos.

As variáveis no início do arquivo centralizam a paleta e a tipografia, o que torna a personalização mais prática.

### 3. Interações: js/main.js

O JavaScript controla:

- animações ao rolar a página;
- abertura e fechamento do menu mobile;
- destaque do link ativo na navegação;
- abertura de modais e accordion para conteúdo expandido.

## Como alterar as mídias do projeto

A parte mais simples de personalizar é a mídia visual do site. Para isso:

1. Acesse a pasta assets/img.
2. Troque os arquivos por novas imagens com nomes semelhantes ou atualize os caminhos no HTML.
3. Se a imagem for usada em uma seção específica, localize a tag img correspondente em index.html.
4. Se a imagem for usada como fundo decorativo, ajuste o caminho no CSS.

### Exemplos práticos

- Trocar a imagem principal da home:
  - substitua o arquivo catadoresdobrasil1.jpg;
  - ou altere o caminho da tag img correspondente no index.html.

- Trocar o logo do cabeçalho:
  - substitua marcaCC-cabecalho.svg;
  - ou atualize o src da imagem no cabeçalho.

- Trocar imagens de seções específicas:
  - substitua os arquivos quemsao1.jpg, arotinadoscatadores1.jpg e arotinadoscatadores2.jpg;
  - atualize os caminhos nas respectivas tags img do HTML.

## Dica de manutenção

Para manter o projeto organizado:

- use nomes claros para arquivos novos;
- preserve a estrutura das pastas;
- prefira imagens com boa resolução e tamanho otimizado;
- teste o resultado em celular e desktop após alterar qualquer mídia.

## Versão online

A versão publicada do projeto está disponível em:
https://conexao-catadores.netlify.app/
