let executarPrograma = fita => {

    //Coletando informações da tela
    let estado_atual = document.getElementById("estado-inicial").value;
    let estados_finais = document.getElementById("estados-finais").value;
    let alfabeto_entrada = document.getElementById("simbolos-entrada").value;
    let simbolo_branco = document.getElementById("simbolo-branco").value;
    let simbolo_inicio = document.getElementById("simbolo-inicio").value;


    //Separando arrays por vírgula(,)
    alfabeto_entrada = alfabeto_entrada.split(",")
    estados_finais = estados_finais.split(",");

    //Concatenando todos os caracteres possíveis dentro da variável valores_possiveis
    let valores_possiveis = alfabeto_entrada;
    valores_possiveis.push(simbolo_branco);
    valores_possiveis.push(simbolo_inicio);

    let deveProsseguir = true;
    //Para cada caractere da fita, verifica se é um caractere válido da lista de valores possíveis
    for (let i = 0; i < fita.length; i++) {
        //Se o caractere não for válido, deve mostrar erro e cancelar operação
        if (!valores_possiveis.includes(fita[i])) {
            gerarErro("A fita possui caracteres n\u00e3o v\u00e1lidos!");
            deveProsseguir = false;
            break;
        }
    }
    //Se não houve nenhum caractere inválido na fita, pode prosseguir
    if (deveProsseguir) {
        //Exibindo o resultado
        document.getElementById("resultadoPrograma").style.visibility = "visible";

        //Coletando referência ao span que mostra o resultado e zerando o texto
        let resultado = document.getElementById("resultadoPrograma").querySelector("span");
        resultado.innerText = "";

        //Coletando referência da tabela e número de linhas dela
        let tabela = document.getElementById("tabela");
        let linhas = tabela.rows;

        //Zerando nodos do grafo
        clearNodes();

        let transicoes = [];
        //Percorrendo linhas da tabela
        for (let i = 1; i < linhas.length; i++) {
            let row = linhas.item(i);
            let cells = row.cells;
            //Percorrendo células de cada linha da tabela
            for (let j = 1; j < cells.length; j++) {
                let cell = cells.item(j);
                let selects = cell.querySelectorAll("select");

                let transicao = [];

                //Percorre os selects para coletar transições criadas
                selects.forEach((select, index) => {
                    let escolha = select.querySelector("option:checked");

                    //Se for o segundo elemento, adiciona o caractere de origem no array
                    if (index === 1) {
                        transicao.push(linhas.item(0).cells.item(j).innerHTML);
                    }

                    //Armazena opções selecionadas temporariamente
                    if (escolha.value !== "0") {
                        transicao.push(escolha.innerHTML);
                    }
                    //Se houverem 3 opções selecionadas na célula, pode adicionar na lista de transições
                    if (transicao.length === 4) {
                        addNode(cells.item(0).innerHTML, transicao);
                        transicoes.push(transicao);
                    }
                    //Se não houverem 3 opções selecionadas e já estiver na última verificação, exibe alert de erro
                    else if (transicao.length !== 1 && index === 2) {
                        gerarErro("\u00c9 necess\u00e1rio preencher os tr\u00eas campos ao mesmo tempo para que uma c\u00e9lula seja reconhecida!");
                    }
                });

            }
        }

        //Ajustando fita para ter o caractere de início
        fita = simbolo_inicio + fita;
        fita += simbolo_branco;

        //Exibindo fita incial
        resultado.innerText += "Fita inicial: " + fita;
        resultado.innerHTML += "<br />";

        //1=Direita, -1=Esquerda -> representa sentido da fita
        let direcao = 1;

        //Contador que representa etapa sendo realizada, mostrada no resultado
        let etapa = 1;

        //Vira true quando o estado_atual for um dos estados finais
        let breakCondition = false;

        //Percorrendo fita
        for (let i = 0; !breakCondition; i += direcao) {

            //Procura a transição desejada no grafo
            let transicao = getNodeTransicao(estado_atual, fita[i]);

            //Adiciona simbolo branco no final da fita caso esteja trabalhando no último caractere dela
            if (fita.length == i) {
                fita += simbolo_branco;
            }

            //Verifica se o estado_atual é um dos estados finais
            if (estados_finais.some(estado => estado === estado_atual)) {
                breakCondition = true;
            }

            //Somente continua se o estado_atual não estiver na lista de estados finais
            if (!breakCondition) {
                //Se encontrar a transição, segue o fluxo
                if (transicao) {
                    //Alterando caractere da fita
                    if (fita[i] == simbolo_branco) {
                        fita += simbolo_branco;
                    }
                    fita = fita.replaceAt(i, transicao[2]);

                    //Ajustando sentido da fita
                    direcao = transicao[3] == "D" ? 1 : -1;
                    resultado.innerText += etapa++ + ": " + estado_atual + "(" + transicao + ")";
                    resultado.innerHTML += "&nbsp;";
                    for (let j = 0; j < fita.length; j++) {
                        if (j == i) {
                            resultado.innerText += "(";
                            resultado.innerText += fita[j];
                            resultado.innerText += ")";
                        }
                        else {
                            resultado.innerText += fita[j];
                        }
                    }
                    resultado.innerHTML += "<br />";

                    //Altera estado_atual para próximo estado, de acordo com a transição
                    estado_atual = transicao[0];
                }
                //Se não encontrar, houve erro na edição do programa, exibir alerta bonitinho
                else {
                    gerarErro("Encontrado erro inesperado! Por favor, revise o programa e tente novamente.");
                    break;
                }
            }
        }
    }
};
