const fs = require('fs');
const readline = require('readline');

const DATA_FILE = './produtos.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let produtos = [];

// ========== UTILIDADES DE UX ==========
function mostrarCabecalho(titulo) {
  console.log('\n' + '═'.repeat(60));
  console.log(' ' + titulo.toUpperCase());
  console.log('═'.repeat(60));
}

function mostrarSucesso(mensagem) {
  console.log('\n' + '─'.repeat(60));
  console.log('✓ ' + mensagem);
  console.log('─'.repeat(60));
}

function mostrarErro(mensagem) {
  console.log('\n' + '─'.repeat(60));
  console.log('✗ ERRO: ' + mensagem);
  console.log('─'.repeat(60));
}

function mostrarAviso(mensagem) {
  console.log('\n' + '─'.repeat(60));
  console.log('⚠️  ' + mensagem);
  console.log('─'.repeat(60));
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function limparTexto(texto) {
  if (texto === null || texto === undefined) return '';
  if (typeof texto !== 'string') texto = String(texto);
  
  let resultado = texto
    .trim()
    .replace(/['"`]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s*,\s*/g, ', ');
  
  return resultado;
}

// ========== PERSISTÊNCIA ==========
function carregarProdutos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      if (data.trim()) {
        produtos = JSON.parse(data);
      }
    }
  } catch (error) {
    produtos = [];
  }
}

function salvarProdutos() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2));
  } catch (error) {
    // Silencioso em caso de erro
  }
}

// ========== UTILIDADES ==========
function gerarId() {
  if (produtos.length === 0) return 1;
  
  const ids = produtos.map(p => p.id);
  const maxId = Math.max(...ids);
  
  for (let i = 1; i <= maxId + 1; i++) {
    if (!ids.includes(i)) {
      return i;
    }
  }
  
  return maxId + 1;
}

function perguntar(pergunta) {
  return new Promise(resolve => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

function limparDadosParaTabela(produtosLista) {
  return produtosLista.map(produto => {
    const produtoLimpo = {
      'ID': produto.id,
      'Produto': limparTexto(produto.nome),
      'Categoria': limparTexto(produto.categoria),
      'Estoque': produto.quantidade,
      'Preço': formatarMoeda(produto.preco)
    };
    
    // Truncar textos longos para caber na tabela
    if (produtoLimpo.Produto.length > 30) {
      produtoLimpo.Produto = produtoLimpo.Produto.substring(0, 27) + '...';
    }
    
    if (produtoLimpo.Categoria.length > 20) {
      produtoLimpo.Categoria = produtoLimpo.Categoria.substring(0, 17) + '...';
    }
    
    return produtoLimpo;
  });
}

// ========== VALIDAÇÕES ==========
function validarNome(nome) {
  const nomeLimpo = limparTexto(nome);
  if (!nomeLimpo || nomeLimpo.length < 2) {
    return 'Nome deve ter pelo menos 2 caracteres';
  }
  if (nomeLimpo.length > 100) {
    return 'Nome muito longo (máx. 100 caracteres)';
  }
  return null;
}

function validarCategoria(categoria) {
  const categoriaLimpa = limparTexto(categoria);
  if (!categoriaLimpa || categoriaLimpa.length < 2) {
    return 'Categoria deve ter pelo menos 2 caracteres';
  }
  if (categoriaLimpa.length > 50) {
    return 'Categoria muito longa (máx. 50 caracteres)';
  }
  return null;
}

function validarQuantidade(quantidade) {
  const qtd = parseInt(quantidade);
  if (isNaN(qtd)) {
    return 'Quantidade deve ser um número';
  }
  if (qtd < 0) {
    return 'Quantidade não pode ser negativa';
  }
  if (qtd > 1000000) {
    return 'Quantidade muito alta (máx. 1.000.000)';
  }
  if (!Number.isInteger(qtd)) {
    return 'Quantidade deve ser um número inteiro';
  }
  return null;
}

function validarPreco(preco) {
  const valor = parseFloat(preco);
  if (isNaN(valor)) {
    return 'Preço deve ser um número';
  }
  if (valor <= 0) {
    return 'Preço deve ser maior que zero';
  }
  if (valor > 1000000) {
    return 'Preço muito alto (máx. R$ 1.000.000)';
  }
  return null;
}

function validarProdutoCompleto(nome, categoria, quantidade, preco) {
  const erros = [];
  
  const erroNome = validarNome(nome);
  if (erroNome) erros.push(erroNome);
  
  const erroCategoria = validarCategoria(categoria);
  if (erroCategoria) erros.push(erroCategoria);
  
  const erroQuantidade = validarQuantidade(quantidade);
  if (erroQuantidade) erros.push(erroQuantidade);
  
  const erroPreco = validarPreco(preco);
  if (erroPreco) erros.push(erroPreco);
  
  return erros;
}

// ========== FUNCIONALIDADES ==========
async function adicionarProduto() {
  mostrarCabecalho('adicionar novo produto');
  console.log('Digite os dados do novo produto:');
  console.log('(Digite 0 em qualquer campo para cancelar)\n');
  
  const nome = limparTexto(await perguntar('Nome do produto: '));
  if (nome === '0') {
    console.log('\nOperação cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const categoria = limparTexto(await perguntar('Categoria: '));
  if (categoria === '0') {
    console.log('\nOperação cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const quantidadeStr = await perguntar('Quantidade em estoque (ex: 10): ');
  if (quantidadeStr === '0') {
    console.log('\nOperação cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const precoStr = await perguntar('Preço unitário R$ (ex: 29.90): ');
  if (precoStr === '0') {
    console.log('\nOperação cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  // Validações
  const erros = validarProdutoCompleto(nome, categoria, quantidadeStr, precoStr);
  
  if (erros.length > 0) {
    mostrarErro('Corrija os seguintes erros:');
    erros.forEach(erro => console.log(`  • ${erro}`));
    console.log('\nTente novamente.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const quantidade = parseInt(quantidadeStr, 10);
  const preco = parseFloat(precoStr);
  
  const produto = {
    id: gerarId(),
    nome,
    categoria,
    quantidade,
    preco
  };
  
  produtos.push(produto);
  salvarProdutos();
  
  mostrarSucesso('PRODUTO ADICIONADO COM SUCESSO!');
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.nome}`);
  console.log(`Categoria: ${produto.categoria}`);
  console.log(`Estoque: ${produto.quantidade} unidades`);
  console.log(`Preço: ${formatarMoeda(produto.preco)}`);
  console.log(`Valor total em estoque: ${formatarMoeda(produto.preco * produto.quantidade)}`);
  
  await perguntar('\nPressione ENTER para continuar...');
}

async function listarProdutos() {
  if (produtos.length === 0) {
    mostrarAviso('Nenhum produto cadastrado.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarCabecalho('listar produtos');
  console.log(`
Como deseja listar?
1. Listar todos
2. Filtrar por categoria
3. Ordenar por nome (A-Z)
4. Ordenar por quantidade (menor para maior)
5. Ordenar por preço (menor para maior)
0. Voltar ao menu
`);
  
  const opcao = await perguntar('Escolha uma opção (0-5): ');
  
  if (opcao === '0') {
    return;
  }
  
  let lista = [...produtos];
  
  switch (opcao) {
    case '1':
      // Listar todos (sem alterações)
      break;
      
    case '2':
      const categoriaFiltro = limparTexto(await perguntar('Digite a categoria para filtrar: '));
      if (!categoriaFiltro || categoriaFiltro === '0') {
        console.log('\nFiltro cancelado.');
        await perguntar('\nPressione ENTER para continuar...');
        return;
      }
      lista = lista.filter(p => 
        p.categoria.toLowerCase().includes(categoriaFiltro.toLowerCase())
      );
      if (lista.length === 0) {
        mostrarAviso(`Nenhum produto encontrado na categoria "${categoriaFiltro}".`);
        await perguntar('\nPressione ENTER para continuar...');
        return;
      }
      break;
      
    case '3':
      lista.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
      
    case '4':
      lista.sort((a, b) => a.quantidade - b.quantidade);
      break;
      
    case '5':
      lista.sort((a, b) => a.preco - b.preco);
      break;
      
    default:
      mostrarErro('Opção inválida.');
      await perguntar('\nPressione ENTER para continuar...');
      return;
  }
  
  // Preparar dados para exibição
  const dadosFormatados = limparDadosParaTabela(lista);
  
  console.log('\n' + '─'.repeat(80));
  console.table(dadosFormatados);
  console.log('─'.repeat(80));
  console.log(`Total de produtos: ${lista.length}`);
  
  // Estatísticas rápidas
  const totalEstoque = lista.reduce((sum, p) => sum + p.quantidade, 0);
  const valorTotal = lista.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);
  console.log(`Itens em estoque: ${totalEstoque}`);
  console.log(`Valor total em estoque: ${formatarMoeda(valorTotal)}`);
  
  await perguntar('\nPressione ENTER para continuar...');
}

async function buscarProduto() {
  if (produtos.length === 0) {
    mostrarAviso('Nenhum produto cadastrado para buscar.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarCabecalho('buscar produto');
  console.log('Busque por:');
  console.log('• ID (ex: 1, 2, 3)');
  console.log('• Parte do nome (ex: "fone")');
  console.log('• Parte da categoria (ex: "eletrônicos")');
  console.log('\n(Digite 0 para voltar ao menu)\n');
  
  const termo = limparTexto(await perguntar('Digite o termo de busca: '));
  
  if (termo === '0') {
    return;
  }
  
  if (!termo) {
    mostrarErro('Termo de busca não informado.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  // Verificar se é uma busca por ID
  const idBusca = Number(termo);
  const buscaPorId = !isNaN(idBusca);
  
  const resultado = produtos.filter(p => {
    if (buscaPorId) {
      // Se busca por ID, retorna APENAS se o ID for exatamente igual
      return p.id === idBusca;
    } else {
      // Se busca por nome ou categoria, faz busca parcial
      const buscaPorNome = p.nome.toLowerCase().includes(termo.toLowerCase());
      const buscaPorCategoria = p.categoria.toLowerCase().includes(termo.toLowerCase());
      return buscaPorNome || buscaPorCategoria;
    }
  });
  
  if (resultado.length === 0) {
    mostrarAviso(`Nenhum produto encontrado para "${termo}".`);
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarSucesso(`${resultado.length} produto(s) encontrado(s):`);
  
  resultado.forEach((produto, index) => {
    console.log('\n' + '─'.repeat(40));
    console.log(`${index + 1}. ${limparTexto(produto.nome).toUpperCase()}`);
    console.log('─'.repeat(40));
    console.log(`   ID: ${produto.id}`);
    console.log(`   Categoria: ${limparTexto(produto.categoria)}`);
    console.log(`   Estoque: ${produto.quantidade} unidades`);
    console.log(`   Preço: ${formatarMoeda(produto.preco)}`);
    console.log(`   Valor total: ${formatarMoeda(produto.preco * produto.quantidade)}`);
  });
  console.log('─'.repeat(40));
  
  await perguntar('\nPressione ENTER para continuar...');
}

async function atualizarProduto() {
  if (produtos.length === 0) {
    mostrarAviso('Nenhum produto cadastrado para atualizar.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarCabecalho('atualizar produto');
  console.log('(Digite 0 para voltar ao menu)\n');
  
  const idStr = await perguntar('ID do produto a atualizar: ');
  if (idStr === '0') {
    return;
  }
  
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) {
    mostrarErro('ID inválido. Digite um número.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const produtoIndex = produtos.findIndex(p => p.id === id);
  
  if (produtoIndex === -1) {
    mostrarErro(`Produto com ID ${id} não encontrado.`);
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const produto = produtos[produtoIndex];
  
  console.log('\n' + '─'.repeat(60));
  console.log(`EDITANDO: ${produto.nome} (ID: ${produto.id})`);
  console.log('─'.repeat(60));
  console.log('\nDeixe em branco para manter o valor atual.');
  console.log('Digite 0 para cancelar a edição.\n');
  
  const novoNome = limparTexto(await perguntar(`Nome [${produto.nome}]: `));
  if (novoNome === '0') {
    console.log('\nEdição cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const novaCategoria = limparTexto(await perguntar(`Categoria [${produto.categoria}]: `));
  if (novaCategoria === '0') {
    console.log('\nEdição cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const novaQuantidadeStr = await perguntar(`Quantidade [${produto.quantidade}]: `);
  if (novaQuantidadeStr === '0') {
    console.log('\nEdição cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const novoPrecoStr = await perguntar(`Preço [${formatarMoeda(produto.preco)}]: `);
  if (novoPrecoStr === '0') {
    console.log('\nEdição cancelada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  // Preparar dados para validação
  const nomeFinal = novoNome !== '' ? novoNome : produto.nome;
  const categoriaFinal = novaCategoria !== '' ? novaCategoria : produto.categoria;
  const quantidadeFinal = novaQuantidadeStr !== '' ? novaQuantidadeStr : produto.quantidade.toString();
  const precoFinal = novoPrecoStr !== '' ? novoPrecoStr : produto.preco.toString();
  
  // Validar
  const erros = validarProdutoCompleto(nomeFinal, categoriaFinal, quantidadeFinal, precoFinal);
  
  if (erros.length > 0) {
    mostrarErro('Corrija os seguintes erros:');
    erros.forEach(erro => console.log(`  • ${erro}`));
    console.log('\nTente novamente.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  // Atualizar apenas se houver alterações
  let alteracoes = [];
  
  if (novoNome !== '' && novoNome !== produto.nome) {
    const nomeAntigo = produto.nome;
    produtos[produtoIndex].nome = limparTexto(nomeFinal);
    alteracoes.push(`Nome: "${nomeAntigo}" → "${nomeFinal}"`);
  }
  
  if (novaCategoria !== '' && novaCategoria !== produto.categoria) {
    const categoriaAntiga = produto.categoria;
    produtos[produtoIndex].categoria = limparTexto(categoriaFinal);
    alteracoes.push(`Categoria: "${categoriaAntiga}" → "${categoriaFinal}"`);
  }
  
  if (novaQuantidadeStr !== '' && parseInt(novaQuantidadeStr, 10) !== produto.quantidade) {
    const quantidadeAntiga = produto.quantidade;
    produtos[produtoIndex].quantidade = parseInt(quantidadeFinal, 10);
    alteracoes.push(`Quantidade: ${quantidadeAntiga} → ${quantidadeFinal}`);
  }
  
  if (novoPrecoStr !== '' && parseFloat(novoPrecoStr) !== produto.preco) {
    const precoAntigo = produto.preco;
    produtos[produtoIndex].preco = parseFloat(precoFinal);
    alteracoes.push(`Preço: ${formatarMoeda(precoAntigo)} → ${formatarMoeda(parseFloat(precoFinal))}`);
  }
  
  if (alteracoes.length === 0) {
    mostrarAviso('Nenhuma alteração foi realizada.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  salvarProdutos();
  
  mostrarSucesso('PRODUTO ATUALIZADO COM SUCESSO!');
  console.log(`ID: ${produto.id} | ${limparTexto(produtos[produtoIndex].nome)}`);
  console.log('\nAlterações realizadas:');
  alteracoes.forEach(alteracao => console.log(`  • ${alteracao}`));
  
  await perguntar('\nPressione ENTER para continuar...');
}

async function excluirProduto() {
  if (produtos.length === 0) {
    mostrarAviso('Nenhum produto cadastrado para excluir.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarCabecalho('excluir produto');
  console.log('ATENÇÃO: Esta operação não pode ser desfeita!\n');
  console.log('(Digite 0 para voltar ao menu)\n');
  
  const idStr = await perguntar('ID do produto a excluir: ');
  if (idStr === '0') {
    return;
  }
  
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) {
    mostrarErro('ID inválido. Digite um número.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const produtoIndex = produtos.findIndex(p => p.id === id);
  
  if (produtoIndex === -1) {
    mostrarErro(`Produto com ID ${id} não encontrado.`);
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  const produto = produtos[produtoIndex];
  
  console.log('\n' + '═'.repeat(60));
  console.log('CONFIRMAÇÃO DE EXCLUSÃO');
  console.log('═'.repeat(60));
  console.log(`Produto: ${limparTexto(produto.nome)}`);
  console.log(`ID: ${produto.id}`);
  console.log(`Categoria: ${limparTexto(produto.categoria)}`);
  console.log(`Estoque: ${produto.quantidade} unidades`);
  console.log(`Preço: ${formatarMoeda(produto.preco)}`);
  console.log(`Valor em estoque: ${formatarMoeda(produto.preco * produto.quantidade)}`);
  console.log('═'.repeat(60));
  
  const confirmacao = await perguntar('\nTem certeza que deseja excluir este produto? (s/n): ');
  
  if (confirmacao.toLowerCase() === 's' || confirmacao.toLowerCase() === 'sim') {
    const produtoExcluido = produtos.splice(produtoIndex, 1)[0];
    salvarProdutos();
    
    mostrarSucesso('PRODUTO EXCLUÍDO PERMANENTEMENTE!');
    console.log(`Produto: ${limparTexto(produtoExcluido.nome)}`);
    console.log(`ID ${produtoExcluido.id} removido do sistema.`);
  } else {
    mostrarAviso('Operação cancelada. Produto não foi excluído.');
  }
  
  await perguntar('\nPressione ENTER para continuar...');
}

async function mostrarEstatisticas() {
  if (produtos.length === 0) {
    mostrarAviso('Nenhum produto cadastrado para gerar estatísticas.');
    await perguntar('\nPressione ENTER para continuar...');
    return;
  }
  
  mostrarCabecalho('estatísticas da agilstore');
  
  // Cálculos básicos
  const totalProdutos = produtos.length;
  const totalEstoque = produtos.reduce((sum, p) => sum + p.quantidade, 0);
  const valorTotal = produtos.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);
  const valorMedio = totalEstoque > 0 ? valorTotal / totalEstoque : 0;
  
  // Categorias
  const categorias = [...new Set(produtos.map(p => limparTexto(p.categoria)))];
  const produtosPorCategoria = {};
  categorias.forEach(cat => {
    produtosPorCategoria[cat] = produtos.filter(p => limparTexto(p.categoria) === cat).length;
  });
  
  // Produtos com estoque baixo
  const estoqueBaixo = produtos.filter(p => p.quantidade < 5);
  const semEstoque = produtos.filter(p => p.quantidade === 0);
  
  // Produto mais caro e mais barato
  const produtoMaisCaro = produtos.reduce((max, p) => p.preco > max.preco ? p : max, produtos[0]);
  const produtoMaisBarato = produtos.reduce((min, p) => p.preco < min.preco ? p : min, produtos[0]);
  
  console.log('\n' + '─'.repeat(60));
  console.log('RESUMO GERAL');
  console.log('─'.repeat(60));
  console.log(`• Total de produtos: ${totalProdutos}`);
  console.log(`• Itens em estoque: ${totalEstoque} unidades`);
  console.log(`• Valor total em estoque: ${formatarMoeda(valorTotal)}`);
  console.log(`• Valor médio por item: ${formatarMoeda(valorMedio)}`);
  
  console.log('\n' + '─'.repeat(60));
  console.log(`CATEGORIAS (${categorias.length})`);
  console.log('─'.repeat(60));
  
  Object.entries(produtosPorCategoria).forEach(([categoria, quantidade]) => {
    const porcentagem = ((quantidade / totalProdutos) * 100).toFixed(1);
    console.log(`• ${categoria}: ${quantidade} produtos (${porcentagem}%)`);
  });
  
  console.log('\n' + '─'.repeat(60));
  console.log('ALERTAS DE ESTOQUE');
  console.log('─'.repeat(60));
  console.log(`• Produtos com estoque baixo (< 5 unidades): ${estoqueBaixo.length}`);
  console.log(`• Produtos sem estoque: ${semEstoque.length}`);
  
  console.log('\n' + '─'.repeat(60));
  console.log('DESTAQUES');
  console.log('─'.repeat(60));
  console.log(`• Produto mais caro: ${limparTexto(produtoMaisCaro.nome)} (${formatarMoeda(produtoMaisCaro.preco)})`);
  console.log(`• Produto mais barato: ${limparTexto(produtoMaisBarato.nome)} (${formatarMoeda(produtoMaisBarato.preco)})`);
  
  if (estoqueBaixo.length > 0) {
    console.log('\n' + '─'.repeat(60));
    console.log('PRODUTOS COM ESTOQUE BAIXO (< 5 UNIDADES)');
    console.log('─'.repeat(60));
    const listaFormatada = limparDadosParaTabela(estoqueBaixo);
    console.table(listaFormatada);
  }
  
  await perguntar('\nPressione ENTER para continuar...');
}

// ========== MENU PRINCIPAL ==========
async function exibirMenu() {
  console.log('\n'.repeat(2));
  console.log('═'.repeat(60));
  console.log('          SISTEMA DE GESTÃO DE INVENTÁRIO');
  console.log('═'.repeat(60));
  console.log(`
  1. Adicionar produto
  2. Listar produtos
  3. Buscar produto
  4. Atualizar produto
  5. Excluir produto
  6. Estatísticas do estoque
  
  0. Sair
  `);
  console.log('═'.repeat(60));
}

async function menuPrincipal() {
  while (true) {
    await exibirMenu();
    const opcao = await perguntar('\nEscolha uma opção (0-6): ');
    
    switch (opcao) {
      case '1':
        await adicionarProduto();
        break;
      case '2':
        await listarProdutos();
        break;
      case '3':
        await buscarProduto();
        break;
      case '4':
        await atualizarProduto();
        break;
      case '5':
        await excluirProduto();
        break;
      case '6':
        await mostrarEstatisticas();
        break;
      case '0':
        console.log('\n' + '═'.repeat(60));
        console.log('          OBRIGADO POR USAR O SISTEMA!');
        console.log('═'.repeat(60));
        rl.close();
        return;
      default:
        mostrarErro('Opção inválida. Digite um número de 0 a 6.');
        await perguntar('\nPressione ENTER para continuar...');
    }
  }
}

// ========== INICIALIZAÇÃO ==========
function inicializar() {
  console.clear();
  console.log('\n'.repeat(2));
  
  carregarProdutos();
  
  // Tratamento para encerramento elegante
  rl.on('close', () => {
    salvarProdutos();
    process.exit(0);
  });
  
  // Capturar CTRL+C
  process.on('SIGINT', () => {
    console.log('\n\nSalvando dados...');
    salvarProdutos();
    console.log('Sistema encerrado.');
    rl.close();
    process.exit(0);
  });
  
  menuPrincipal();
}

// Iniciar a aplicação
inicializar();