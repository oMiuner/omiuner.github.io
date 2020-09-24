var possiveisEntradas = [];
var possiveisSaidas = [];

var blocoEntradaSelecionada = null;
var blocoSaidaSelecionada = null;

var conexoes = [];

adicionarEntrada = entrada => {
    entrada.addEventListener('click', clicarEntrada, false);
    possiveisEntradas.push(entrada);
};

adicionarSaida = saida => {
    saida.addEventListener('click', clicarSaida, false);
    possiveisSaidas.push(saida);
};

eraClicado = e => e.target.classList.contains('clicado');

clicarEntrada = e => {
    let clicado = eraClicado(e);
    document.querySelectorAll('.entrada.clicado').forEach(el => el.classList.remove('clicado'));
    blocoEntradaSelecionada = null;

    if (!clicado) {
        blocoEntradaSelecionada = e.target.parentNode.parentNode;
        e.target.classList.add('clicado');
    }

    verificarConexao();
};

clicarSaida = e => {
    let clicado = eraClicado(e);
    document.querySelectorAll('.saida.clicado').forEach(el => el.classList.remove('clicado'));
    blocoSaidaSelecionada = null;

    if (!clicado) {
        blocoSaidaSelecionada = e.target.parentNode;
        e.target.classList.add('clicado');
    }

    verificarConexao();
};

verificarConexao = () => {
    if (blocoEntradaSelecionada !== null && blocoSaidaSelecionada !== null) {
        if (blocoEntradaSelecionada === blocoSaidaSelecionada) {
            let entradaSelecionada = blocoSaidaSelecionada.firstChild.querySelector('.clicado');
            let saidaSelecionada = blocoSaidaSelecionada.lastChild;

            entradaSelecionada.classList.add('erro');
            saidaSelecionada.classList.add('erro');
            setTimeout(() => {
                entradaSelecionada.classList.remove('erro');
                saidaSelecionada.classList.remove('erro');
                entradaSelecionada.classList.remove('clicado');
                saidaSelecionada.classList.remove('clicado');
                blocoEntradaSelecionada = null;
                blocoSaidaSelecionada = null;
            }, 1000);

        }
        else {
            let entradaSelecionada = blocoEntradaSelecionada.firstChild.querySelector('.clicado');
            let saidaSelecionada = blocoSaidaSelecionada.lastChild;

            criaConexao(entradaSelecionada, saidaSelecionada);
            conexoes.push({ entrada: entradaSelecionada, saida: saidaSelecionada });

            limpaSelecionados();
        }
    }
}

limpaSelecionados = () => {
    blocoEntradaSelecionada = null;
    blocoSaidaSelecionada = null;
    document.querySelectorAll('.entrada.clicado').forEach(el => el.classList.remove('clicado'));
    document.querySelectorAll('.saida.clicado').forEach(el => el.classList.remove('clicado'));
};

criaConexao = (entrada, saida) => {
    let startX = getOffset(entrada).left + 3;
    let startY = getOffset(entrada).top + 3;
    let endX = getOffset(saida).left + 3;
    let endY = getOffset(saida).top + 3;

    document.body.appendChild(createLine(startX, startY, endX, endY));
};

atualizarConexoes = frameRate => {
    setInterval(() => {
        document.querySelectorAll('.linha').forEach(el => el.classList.remove('linha'));
        conexoes.forEach(el => {
            criaConexao(el.entrada, el.saida);
        });
    }, frameRate);
    
};

getOffset = el => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
};

createLineElement = (x, y, length, angle) => {
    let line = document.createElement('div');
    line.classList.add('linha');
    let styles = 'width: ' + length + 'px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);
    return line;
};

createLine = (x1, y1, x2, y2) => {
    let a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    let sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    let x = sx - c / 2,
        y = sy;

    let alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
};

