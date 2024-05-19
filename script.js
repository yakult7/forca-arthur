const palavras = ["dna", "cromossomos", "genes", "replicacao", "transcricao", "genoma", "rna", "nucleotideos", "hereditariedade", "genetica", "molecula", "proteina", "celula", "diferenca", "funcao"];
const especificacoes = {
  dna: "O DNA, ou Ácido Desoxirribonucleico, é uma molécula presente em todos os seres vivos e é essencial para a transmissão de informações genéticas de uma geração para outra. Ele contém as instruções necessárias para o desenvolvimento, funcionamento, crescimento e reprodução dos organismos. Em termos simples, o DNA é como um manual de instruções que determina todas as características e funções de um organismo, desde sua estrutura física até seus processos metabólicos e comportamentais.",
  rna: "O RNA é como um mensageiro que transporta as instruções do DNA para outras partes da célula. Ele atua como um intermediário entre o DNA e as proteínas, que são as moléculas responsáveis por realizar diversas funções no organismo. Por exemplo, o RNA mensageiro leva as instruções do DNA para a fabricação de proteínas nas células.",
  celula: " As células são as unidades básicas da vida. Elas são como pequenas fábricas que realizam todas as funções necessárias para manter um organismo vivo e funcionando. Por exemplo, as células do corpo humano podem ser comparadas a tijolos que juntos formam um prédio. Existem muitos tipos diferentes de células em nosso corpo, cada uma com funções específicas, como células nervosas, células musculares e células da pele.",
  diferenca: "O DNA e o RNA são os dois tipos de ácidos nucleicos encontrados nos seres vivos. Apesar de ambos serem constituídos por subunidades de nucleotídeos ligados por ligações fosfodiéster, eles apresentam algumas diferenças básicas. O DNA apresenta desoxirribose como açúcar, já o RNA apresenta uma ribose. As bases nitrogenadas presentes no DNA são citosina, guanina, adenina e timina. No RNA, são encontradas a citosina, guanina, adenina e uracila.",
  funcao: "A função do DNA é armazenar e transmitir as informações genéticas.",
  molecula: "Uma molécula é um conjunto de átomos ligados entre si. No caso do DNA, ele é uma molécula longa e em forma de dupla hélice, que carrega informações genéticas.",
  genetica: "Refere-se ao estudo dos genes, hereditariedade e variação de características entre os organismos. A genética explora como as informações contidas no DNA são transmitidas de geração em geração.",
  hereditariedade: "É o processo pelo qual características genéticas são transmitidas dos pais para os filhos. Por exemplo, a cor dos olhos ou a estatura podem ser herdadas dos pais através do DNA.",
  nucleotideos: "São os blocos de construção do DNA, compostos por uma base nitrogenada (adenina, timina, citosina ou guanina), um açúcar (desoxirribose) e um grupo fosfato.",
  genoma: "O genoma é o conjunto completo de material genético de um organismo. Ele contém todas as informações necessárias para o desenvolvimento e funcionamento de um organismo.",
  transcricao: "É o processo pelo qual a informação genética contida no DNA é copiada para uma molécula de RNA mensageiro (mRNA). O mRNA serve como um molde para a síntese de proteínas.",
  replicacao: "É o processo de duplicação do DNA, que ocorre antes da divisão celular. Durante a replicação, as duas cadeias de DNA se separam e cada uma serve como molde para a síntese de uma nova cadeia complementar.",
  genes: "São segmentos específicos do DNA que contêm instruções para a síntese de proteínas ou para a regulação de processos celulares. Cada gene codifica uma característica ou função específica.",
  cromossomos: "Estruturas compostas por DNA e proteínas, localizadas no núcleo das células. Os cromossomos contêm os genes e são responsáveis pela organização e transmissão das informações genéticas.",
};

let palavraAtual;
let palavraEscondida = [];
let tentativasRestantes;
let letrasAdivinhadas;
let acertos;
let letrasErradas = [];
let palavrasUsadas = [];

const palavraElement = document.getElementById("palavra");
const numeroLetrasElement = document.getElementById("numero-letras");
const tentativasElement = document.getElementById("tentativas");
const mensagemElement = document.getElementById("mensagem");
const palpiteElement = document.getElementById("palpite");
const adivinharButton = document.getElementById("adivinhar");
const letrasErradasElement = document.getElementById("letras-erradas");

function iniciarJogo() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  if (palavrasUsadas.length === palavras.length) {
    palavrasUsadas = [];
  }

  do {
    palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];
  } while (palavrasUsadas.includes(palavraAtual));

  palavrasUsadas.push(palavraAtual);

  palavraEscondida = "_".repeat(palavraAtual.length);
  tentativasRestantes = 15;
  letrasAdivinhadas = [];
  acertos = 0;
  letrasErradas = [];
  atualizarElementos();
}

function atualizarElementos() {
  palavraElement.textContent = palavraEscondida.split("").join(" ");
  const letrasFaltando = palavraEscondida.split("_").length - 1;
  numeroLetrasElement.textContent = `Letras Restantes: ${letrasFaltando}`;
  tentativasElement.textContent = `Tentativas Restantes: ${tentativasRestantes}`;
  letrasErradasElement.textContent = `Letras Erradas: ${letrasErradas.join(', ')}`;
  palpiteElement.value = "";
}

function adivinhar() {
  const palpite = palpiteElement.value.toLowerCase();
  if (palpite.length === 1 && !letrasAdivinhadas.includes(palpite)) {
    if (palavraAtual.includes(palpite)) {
      for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === palpite) {
          palavraEscondida = palavraEscondida.substring(0, i) + palpite + palavraEscondida.substring(i + 1);
          acertos++;
        }
      }
    } else {
      letrasErradas.push(palpite);
      tentativasRestantes--; 
    }
    letrasAdivinhadas.push(palpite);
  }

  if (palavraEscondida === palavraAtual) {
    mensagemElement.textContent = `Parabéns! Você adivinhou a palavra: ${palavraAtual}. ${especificacoes[palavraAtual]}`;
    document.getElementById("fim").style.display = "block";
    esconderElementosDeAdivinhacao();
  } else if (tentativasRestantes === 0) {
    mensagemElement.textContent = `Fim de Jogo! A palavra era: ${palavraAtual}. ${especificacoes[palavraAtual]}`;
    document.getElementById("fim").style.display = "block";
    esconderElementosDeAdivinhacao();
  } else {
    atualizarElementos();
  }
}

function esconderElementosDeAdivinhacao() {
  palpiteElement.style.display = "none";
  adivinharButton.style.display = "none";
  tentativasElement.style.display = "none";
}

function reiniciarJogo() {
  document.getElementById("jogo").style.display = "none";
  document.getElementById("fim").style.display = "none";
  document.getElementById("inicio").style.display = "block";
  mensagemElement.textContent = "";
  palpiteElement.style.display = "block";
  adivinharButton.style.display = "block";
  tentativasElement.style.display = "block";
  letrasErradasElement.style.display = "block";
  letrasErradasElement.textContent = "";
}

document.getElementById("inicio").style.display = "block";
document.getElementById("jogo").style.display = "none";
document.getElementById("fim").style.display = "none";
