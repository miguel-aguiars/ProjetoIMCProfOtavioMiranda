// Capturar evento do submit do formulário 
const form = document.querySelector('#form'); // capturar o formulário

form.addEventListener('submit', function (e) { //e = event //escutador do evento submit
    e.preventDefault(); //n permite que o formulário seja enviado
    // console.log('Evento prevenido');
    // setResult('Olá mundo')
    const inputWeight = e.target.querySelector('#weight') //seleciona de dentro do elemento
    const inputHeight = e.target.querySelector('#height') // inputs capturados
    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);

    if (!weight) { // if diferente do peso
        setResult('Peso inválido', false); // seta tag false para atribuir uma classe diferente
        return
    }

    if (!height) {
        setResult('Altura inválida', false);
        return
    }

    const imc = getIMC(weight, height); //função específica para cálculo do IMC
    const tierIMC = getTierImc(imc); //função específica para pegar tier do IMC

    const msg = `Seu IMC é ${imc} ${tierIMC}`;

    setResult(msg, true); // setado como true 
});

function getTierImc(imc) {
    const tier = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2',
        'Obesidade grau 3'
    ];

    if (imc >= 39.9) return tier[5]; //condição de trás pra frente
    if (imc >= 34.9) return tier[4]; // return n permite executar as próximas linhas de condicionais
    if (imc >= 29.9) return tier[3];
    if (imc >= 24.9) return tier[2];
    if (imc >= 18.5) return tier[1];
    if (imc < 18.5) return tier[0];
}

function getIMC(weight, height) { //função que faz o calculo do IMC
    const imc = (weight / height ** 2);
    return imc.toFixed(2);
}

function criaP() { 
    const p = document.createElement('p'); //cria elemento
    // p.classList.add('paragrafo-resultado'); //adcionou uma classe ao paragrafo
    return p;
}

function setResult(msg, isValid) { // recebe mensagem e checa se o resultado é válido 
    const result = document.querySelector('#result')
    result.innerHTML = ''; //limpa a div
    // result.appendChild(p); //inseriu a variável p na div

    const p = criaP(); // cria paragrafo

    if (isValid) {
    p.classList.add('paragrafo-resultado') // se validado adciona fundo verde
    } else {
        p.classList.add('bad') // se não fundo vermelho
    }
    p.innerHTML = msg; // seta mensagem no paragrafo 
    result.appendChild(p); // depois adiciona o paragrafo na div 
}