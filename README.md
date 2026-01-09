AgilStore é uma aplicação CLI (Command Line Interface) desenvolvida em Node.js para gestão completa de inventário. O sistema permite gerenciar produtos, controle de estoque, buscas avançadas e geração de relatórios, tudo diretamente pelo terminal com uma interface intuitiva e amigável.

https://img.shields.io/badge/Node.js-16.x+-green
https://img.shields.io/badge/JavaScript-ES6+-yellow
https://img.shields.io/badge/Interface-CLI-blue
https://img.shields.io/badge/Status-Produ%C3%A7%C3%A3o-success

✨ Funcionalidades Principais
📦 Gestão de Produtos
✅ Cadastro completo - Nome, categoria, quantidade e preço

✅ Listagem inteligente - Filtros e ordenações avançadas

✅ Busca avançada - Por ID, nome ou categoria

✅ Atualização flexível - Edite apenas o que precisa

✅ Exclusão segura - Com confirmação obrigatória

📊 Relatórios e Estatísticas
Total de produtos cadastrados

Valor total em estoque

Distribuição por categorias

Alertas de estoque baixo (< 5 unidades)

Produtos em falta (estoque zero)

Destaques (produto mais caro/mais barato)

🛡️ Recursos Técnicos
Persistência local via arquivo JSON

Validação robusta de todas as entradas

Interface amigável com feedback visual

Formatação profissional de valores monetários

Limpeza automática de dados de entrada

Encerramento seguro com salvamento automático

🛠️ Tecnologias Utilizadas
Tecnologia	Finalidade
Node.js	Ambiente de execução JavaScript
JavaScript ES6+	Lógica da aplicação
fs (File System)	Persistência de dados em arquivos
readline	Leitura de entrada do usuário
Intl.NumberFormat	Formatação de moeda (pt-BR)
Console.table	Exibição estruturada de dados
Nota: O projeto não utiliza dependências externas - apenas módulos nativos do Node.js.

📁 Estrutura do Projeto
text
agilstore/
│
├── produtos.js              # Código principal da aplicação
├── produtos.json           # Banco de dados (criado automaticamente)
├── README.md              # Esta documentação
│
└── (opcional)
    ├── package.json       # Configuração do projeto
    └── .gitignore        # Ignorar arquivos temporários
🚀 Como Executar o Projeto
Pré-requisitos
Node.js versão 16 ou superior

Terminal/console compatível

50 MB de espaço livre em disco

Passo a Passo
Clone o repositório:

bash
git clone <url-do-repositorio>
Acesse a pasta do projeto:

bash
cd agilstore
Execute a aplicação:

bash
node produtos.js
Use o sistema:

Siga as instruções no terminal

Escolha opções digitando números

Pressione ENTER para confirmar

Execução Rápida
bash
# Em uma linha:
git clone <url> && cd agilstore && node produtos.js
🎮 Guia de Uso
Menu Principal
text
════════════════════════════════════════════════════════
          SISTEMA DE GESTÃO DE INVENTÁRIO
════════════════════════════════════════════════════════

  1. Adicionar produto
  2. Listar produtos
  3. Buscar produto
  4. Atualizar produto
  5. Excluir produto
  6. Estatísticas do estoque

  0. Sair
════════════════════════════════════════════════════════
Exemplos de Uso
1. Adicionar Produto
text
Nome do produto: Smartphone XYZ
Categoria: Eletrônicos
Quantidade em estoque: 25
Preço unitário R$: 1299.90
2. Listar Produtos
text
Como deseja listar?
1. Listar todos
2. Filtrar por categoria
3. Ordenar por nome (A-Z)
4. Ordenar por quantidade
5. Ordenar por preço
3. Buscar Produto
text
Busque por:
• ID (ex: 1, 2, 3)
• Parte do nome (ex: "fone")
• Parte da categoria (ex: "eletrônicos")
