# AgilStore — Sistema de Gestão de Inventário (CLI)

AgilStore é uma aplicação de **linha de comando (CLI)** desenvolvida em **Node.js** para gerenciamento de inventário.  
O sistema permite cadastrar, listar, buscar, atualizar, excluir produtos e visualizar estatísticas do estoque, com foco em **clareza, usabilidade e experiência no terminal**.

O projeto foi desenvolvido como parte de um **desafio técnico**, priorizando organização de código, validações, persistência de dados e UX aplicada ao terminal.

---

## Funcionalidades

- Cadastro de produtos
- Listagem com:
  - filtros por categoria  
  - ordenação por nome, quantidade ou preço
- Busca por ID, nome ou categoria
- Atualização parcial de produtos (sem sobrescrever dados não alterados)
- Exclusão com confirmação
- Estatísticas de inventário:
  - total de produtos
  - valor total em estoque
  - produtos com estoque baixo
  - categorias
- Persistência de dados em arquivo JSON
- Interface amigável no terminal (mensagens claras, feedback visual e navegação simples)

---

## Tecnologias Utilizadas

- **Node.js**
- **JavaScript**
- Módulos nativos:
  - `fs` (File System)
  - `readline`
- Armazenamento local em arquivo `.json`
- Execução via terminal (CLI)

> O projeto **não utiliza bibliotecas externas**, garantindo fácil execução em qualquer ambiente com Node.js instalado.

---

## Como executar o projeto localmente

### 1. Pré-requisitos

- Node.js versão 16 ou superior  
  https://nodejs.org

---

### 2. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/agilstore.git

````
Entre na pasta do projeto
```bash
cd agilstore
```

3. Executar a aplicação

```bash 
node index.js
```

O sistema será iniciado diretamente no terminal.

---

## Persistência de Dados

Os dados são armazenados no arquivo produtos.json

Caso o arquivo não exista, ele é criado automaticamente

Todas as operações salvam os dados imediatamente

---

### Autoria

Desenvolvido por Patricia Assaf
Projeto criado como parte do desafio técnico para a Acelerado Ágil
