# AgilStore – Sistema de Gestão de Inventário (CLI)

AgilStore é uma aplicação **CLI (Command Line Interface)** desenvolvida em **Node.js** para gestão simples de inventário.  
O sistema permite cadastrar, listar, buscar, atualizar e excluir produtos, além de exibir **estatísticas do estoque**, tudo diretamente pelo terminal, com foco em **experiência do usuário**, clareza e organização.

O projeto foi desenvolvido com fins **didáticos e avaliativos**, priorizando código legível, fluxo intuitivo e facilidade de execução local.

---

## Funcionalidades

- Cadastro de produtos (nome, categoria, quantidade e preço)
- Listagem de produtos:
  - Todos
  - Filtragem por categoria
  - Ordenação por nome, quantidade ou preço
- Busca de produtos por:
  - ID
  - Nome
  - Categoria
- Atualização de produtos existentes
- Exclusão de produtos com confirmação
- Estatísticas do inventário:
  - Total de produtos
  - Itens em estoque
  - Valor total do estoque
  - Produtos com estoque baixo ou zerado
  - Produto mais caro e mais barato
- Persistência de dados local via arquivo JSON
- Interface amigável no terminal (mensagens claras, tabelas e feedback visual)

---

## Tecnologias Utilizadas

- **Node.js**
- **JavaScript (ES6+)**
- **Módulos nativos do Node.js**:
  - `fs` (File System)
  - `readline`
- **console.table** para exibição estruturada de dados no terminal
- **Intl.NumberFormat** para formatação de moeda (pt-BR)

> Não há dependências externas nem bibliotecas de terceiros.

---

## Estrutura do Projeto


O arquivo `produtos.json` funciona como um banco de dados simples em formato JSON, utilizado apenas para fins didáticos.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (versão 16 ou superior recomendada)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>

Acesse a pasta do projeto:

cd agilstore


Execute a aplicação:

node index.js


O menu principal será exibido no terminal.
Basta escolher as opções digitando os números correspondentes.

Observações Importantes

O projeto não utiliza banco de dados externo.

Todos os dados são salvos localmente no arquivo produtos.json.

O arquivo já acompanha o repositório para permitir execução imediata, sem necessidade de configuração adicional.

O foco do projeto está na lógica, organização do código e UX aplicada ao terminal, e não em deploy ou ambiente de produção.

Objetivo do Projeto

Demonstrar:

Capacidade de estruturar uma aplicação funcional

Boas práticas de organização de código

Validação de dados e tratamento de erros

Atenção à experiência do usuário mesmo em aplicações de terminal

Clareza na comunicação e documentação

Desenvolvido como projeto de estudo e avaliação técnica.
