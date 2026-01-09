AgilStore – Sistema de Gestão de Inventário (CLI)
AgilStore é uma aplicação CLI (Command Line Interface) desenvolvida em Node.js para gestão simples de inventário. O sistema permite cadastrar, listar, buscar, atualizar e excluir produtos, além de exibir estatísticas do estoque, tudo diretamente pelo terminal.

🚀 Como Executar o Projeto Localmente
Pré-requisitos
Node.js instalado (versão 16 ou superior recomendada)

Passo a passo
Clone o repositório:

bash
git clone <url-do-repositorio>
Acesse a pasta do projeto:

bash
cd agilstore
Execute a aplicação:

bash
node produtos.js
O menu principal será exibido no terminal. Basta escolher as opções digitando os números correspondentes.

Execução Rápida
bash
# Em uma linha:
git clone <url-do-repositorio> && cd agilstore && node produtos.js
💻 Tecnologias Utilizadas
Módulos Nativos do Node.js
fs (File System) - Para persistência de dados em arquivo JSON

readline - Para leitura de entrada do usuário

console.table - Para exibição estruturada de dados no terminal

Intl.NumberFormat - Para formatação de moeda (pt-BR)

Linguagem e Ambiente
Node.js - Ambiente de execução JavaScript

JavaScript (ES6+) - Lógica da aplicação

Características Técnicas
✅ Sem dependências externas - Apenas módulos nativos do Node.js

✅ Persistência local - Dados salvos em arquivo produtos.json

✅ Interface CLI amigável - Mensagens claras e feedback visual

✅ Validação de dados - Entradas seguras e consistentes

📁 Estrutura do Projeto
text
agilstore/
├── produtos.js          # Código principal da aplicação
├── produtos.json       # Banco de dados local (criado automaticamente)
└── README.md          # Documentação do projeto
📝 Observações Importantes
O projeto não utiliza banco de dados externo - todos os dados são salvos localmente no arquivo produtos.json

O arquivo produtos.json já acompanha o repositório para permitir execução imediata

Não há necessidade de configuração adicional ou instalação de dependências

Foco em experiência do usuário no terminal e organização do código

🎯 Objetivo do Projeto
Demonstrar capacidade de:

Estruturar uma aplicação funcional em Node.js

Implementar boas práticas de organização de código

Criar validação de dados e tratamento de erros

Desenvolver interface amigável em aplicações CLI

Documentar clara e completamente o projeto

Desenvolvido como projeto de estudo e avaliação técnica.
