let resultadoConversao = document.getElementById('res');
let inputBinary = document.getElementById('binary');

function binToDec() {
  let base = 2;
  let binaryNumber = inputBinary.value.split("").reverse();
  let res = 0;
  
  if(inputBinary.value == "") {
    addMsg("Por favor digite um número", "alert2");
  }

  for (let i = 0; i < binaryNumber.length; i++) {
    var result = Math.pow(base, i) * binaryNumber[i];
    var resultTotal = res += result;
  }

  resultadoConversao.innerHTML = resultTotal;

  limparInput();
};

document.getElementById('acao').addEventListener('click', function(e) {
  e.preventDefault();
  binToDec();
});

function limparInput() {
  inputBinary.value = "";
  inputBinary.focus();
};

function addMsg(mensagem, tipo) {
  const id = (new Date()).getTime();
  const div = document.createElement('div');
  div.id = id;
  div.setAttribute("class", `alert ${tipo}`);
  div.innerHTML = `<div>${mensagem}</div>`;
  document.getElementById('avisos').appendChild(div);

  setTimeout(()=> {
    const div = document.getElementById(id);
    if(div!=null) {div.style.height = "0px"}
  }, 2000)

  setTimeout(()=> {
    const div = document.getElementById(id);
    if(div!=null) {div.remove()}
  }, 3000)

  setTimeout(()=> {
    const div = document.getElementById(id);
    if(div!=null) {div.style.height = "80px"}
  }, 10)
}

function limitarCaracteres(event) {
  let valor = event.target.value;
  if (event.target.value.length >= 9) {
    addMsg("⚠️ Alerta!<br /> excedeu o número de caracteres!", "alert2")
    inputBinary.value = valor.substring(0,8);
  }
}
inputBinary.addEventListener('keydown',limitarCaracteres);

inputBinary.addEventListener('keyup', (event) => {
  let teclaPressionada = event.keyCode;

  limitarCaracteres(event);

  if(teclaPressionada >= 50 && teclaPressionada <= 59) {
    addMsg("⚠️ Erro!<br /> Número inválido!", "alert1")
    document.getElementById('binary').value = "";
  }

  if(teclaPressionada == 13) {
    binToDec();
  }
});

inputBinary.addEventListener('focus', function() {
  this.dataset.placeholder = this.placeholder;
  this.placeholder = "";
});
inputBinary.addEventListener('blur', function() {
  this.placeholder = this.dataset.placeholder;
})