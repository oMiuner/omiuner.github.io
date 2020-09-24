var botoesMenu = document.querySelectorAll('.icone');

botoesMenu.forEach(botao => botao.addEventListener('click', botaoClicado, false));

function botaoClicado(e) {
    e.target.parentElement.classList.forEach(classe => {
        if (classe !== 'icone') {
            switch (classe) {
                case 'deletar':
                    limparTela();
                    break;
                case 'play':
                    executar();
                    break;
                case 'variavel':
                    criarVariavel();
                    break;
            }
        }
    });
}

limparTela = () => document.querySelector(".operador").innerHTML = '';
executar = () => alert('Ainda nao implementado.');
criarVariavel = () => {
    let variavel = document.querySelector("#variavel");

    if (variavel.value) {
        let elemento = document.createElement('div');
        elemento.classList.add('operador-logico');

        let node = document.createElement("div");
        node.classList.add('operador-item');
        node.classList.add('variavel');

        node.innerText = variavel.value[0].toUpperCase();

        let saida = document.createElement("div");
        saida.classList.add('saida');
        adicionarSaida(saida);

        elemento.appendChild(node);
        elemento.appendChild(saida);

        document.querySelector('.operador').appendChild(elemento);
        atualizaElementos();
    }
    else {
        alert('Variavel deve possuir uma letra.');
    }
};

atualizarTamanho = frameRate => {
    setInterval(() => {
        let h = window.innerHeight;
        let hMenu = (h * 0.08) + 'px';
        let hMain = (h * 0.92) + 'px';
        document.querySelector('.operador').style.height = hMain;
        document.querySelector('.lista-operadores').style.height = hMain;
        document.querySelector('.menu').style.height = hMenu;
    }, frameRate);
}