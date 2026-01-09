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

