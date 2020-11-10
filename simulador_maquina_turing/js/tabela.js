let editarPrograma = () => {
    //Evitando que a página atualize ao clicar no botão
    event.preventDefault();

    //Omitindo campo de resultado que aparecerá após executar programa
    document.getElementById("resultadoPrograma").style.visibility = "hidden";

    //Coletando valores dos inputs
    let alfabeto_entrada = document.getElementById("simbolos-entrada").value;
    let alfabeto_aux = document.getElementById("simbolos-aux").value;
    let estados = document.getElementById("estados").value;
    let estado_inicial = document.getElementById("estado-inicial").value;
    let estados_finais = document.getElementById("estados-finais").value;
    let simbolo_branco = document.getElementById("simbolo-branco").value;
    let simbolo_inicio = document.getElementById("simbolo-inicio").value;

    //Obtendo tabela e quantidade de linhas
    let tabela = document.getElementById("tabela");

    //Se o alfabeto de entrada for vazio, gera erro
    if (alfabeto_entrada.length == 0) {
        gerarErro("Alfabeto de entrada n\u00e3o pode estar vazio!");
    }
    //Se a lista de estados for vazia, gera erro
    else if (estados.length == 0) {
        gerarErro("Lista de estados n\u00e3o pode estar vazia!");
    }
    //Se não houver nenhum estado final, gera erro
    else if (estados_finais.length == 0) {
        gerarErro("\u00c9 necess\u00e1rio ter ao menos um estado final!");
    }
    else {
        let isEstadoValido = false;
        //Separa os estados finais em um array separado por vírgula(,)
        estados_finais = estados_finais.split(",");
        estados_finais.forEach(estado_final => {
            if (estados.includes(estado_final)) {
                isEstadoValido = true;
            }
        });
        if (!isEstadoValido) {
            gerarErro("O estado final deve estar contido na lista de estados poss\u00edveis!");
        }
        //Se não houver nenhum estado inicial, ou for inválido, gera erro
        else if (estado_inicial.length == 0) {
            gerarErro("\u00c9 necess\u00e1rio ter um estado inicial!");
        }
        else {
            let isEstadoValido = estados.includes(estado_inicial);
            if (!isEstadoValido) {
                gerarErro("O estado inicial deve estar contido na lista de estados poss\u00edveis!");
            }
            else {
                //Exibindo botão para executar programaa
                document.getElementById("executarPrograma").style.visibility = "visible";

                //Ajusta alfabeto de entrada para não possuir repetições
                alfabeto_entrada_original = alfabeto_entrada.split(",");
                alfabeto_entrada = [];
                alfabeto_entrada_original.forEach(caractere => {
                    if (!alfabeto_entrada.includes(caractere)) {
                        alfabeto_entrada.push(caractere);
                    }
                });
                //Adiciona alfabeto auxiliar no alfabeto de entrada
                alfabeto_aux = alfabeto_aux.split(",");
                alfabeto_aux.forEach(caractere => {
                    if (!alfabeto_entrada.includes(caractere)) {
                        alfabeto_entrada.push(caractere);
                    }
                });
                //Ajusta estados para não possuir repetições
                estados_original = estados.split(",");
                estados = [];
                estados_original.forEach(estado => {
                    if (!estados.includes(estado)) {
                        estados.push(estado);
                    }
                });

                //Zerando a tabela para criar ela novamente
                tabela.deleteTHead();
                for (let i = 0; i < tabela.rows.length; i++) {
                    tabela.deleteRow(i);
                }

                //Criando header da tabela
                let table_head = tabela.createTHead();
                let header_row = table_head.insertRow(0);
                header_row.insertCell(0).innerHTML;
                header_row.insertCell(1).innerHTML = simbolo_inicio;
                alfabeto_entrada.forEach((elemento, index) => header_row.insertCell(index + 2).innerHTML = elemento);
                header_row.insertCell(alfabeto_entrada.length + 2).innerHTML = simbolo_branco;

                //Criando Tríade de elementos para transição
                let div_estados = criar_div_estados(estados);
                let div_alfabeto = criar_div_alfabeto(alfabeto_entrada, simbolo_inicio, simbolo_branco);
                let div_movimentacao = criar_div_movimentacao();
                let triade = div_estados.outerHTML + div_alfabeto.outerHTML + div_movimentacao.outerHTML;

                //Criando linhas da tabela
                let count = 1;
                estados.forEach(estado => {
                    let input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.classList.add("transicao");

                    let nova_linha = tabela.insertRow(count++);
                    nova_linha.insertCell(0).innerHTML = estado;
                    nova_linha.insertCell(1).innerHTML = triade;
                    alfabeto_entrada.forEach((_, index) => {
                        nova_linha.insertCell(index + 1).innerHTML = triade;
                    });
                    nova_linha.insertCell(alfabeto_entrada.length).innerHTML = triade;
                });
            }
        }
    }
}

//Criação do div que contem o primeiro select - estados
let criar_div_estados = estados => {
    let div_estados = document.createElement("div");
    div_estados.id = "div_estados";
    let select_estados = document.createElement("select");
    select_estados.classList.add("form-control");
    //Adicionando opção vazia
    let option_empty = document.createElement("option");
    option_empty.text = " ";
    option_empty.value = 0;
    select_estados.add(option_empty);
    //Adicionando opções dos estados
    estados.forEach((estado, index) => {
        let option = document.createElement("option");
        option.text = estado;
        option.value = index + 1;
        select_estados.add(option);
    });
    div_estados.appendChild(select_estados);
    return div_estados;
};

//Criação do div que contem o segundo select - alfabeto
let criar_div_alfabeto = (alfabeto_entrada, simbolo_inicio, simbolo_branco) => {
    let div_alfabeto = document.createElement("div");
    div_alfabeto.id = "div_alfabeto";
    let select_alfabeto = document.createElement("select");
    select_alfabeto.classList.add("form-control");
    //Adicionando opção vazia
    let option_empty = document.createElement("option");
    option_empty.text = " ";
    option_empty.value = 0;
    select_alfabeto.add(option_empty);
    //Adicionando opção do símbolo de início
    let option_inicio = document.createElement("option");
    option_inicio.text = simbolo_inicio;
    option_inicio.value = 1;
    select_alfabeto.add(option_inicio);
    //Adicionando opções do alfabeto de entrada
    alfabeto_entrada.forEach((alfabeto, index) => {
        let option = document.createElement("option");
        option.text = alfabeto;
        option.value = index + 2;
        select_alfabeto.add(option);
    });
    //Adicionando opção do símbolo branco
    let option_branco = document.createElement("option");
    option_branco.text = simbolo_branco;
    option_branco.value = alfabeto_entrada.length + 2;
    select_alfabeto.add(option_branco);

    div_alfabeto.appendChild(select_alfabeto);
    return div_alfabeto;
};

//Criação do div que contem o terceiro select - movimentação
let criar_div_movimentacao = () => {
    let div_movimentacao = document.createElement("div");
    div_movimentacao.id = "div_movimentacao";
    let select_movimentacao = document.createElement("select");
    select_movimentacao.classList.add("form-control");
    //Adicionando opção vazia
    let option_empty = document.createElement("option");
    option_empty.text = " ";
    option_empty.value = 0;
    select_movimentacao.add(option_empty);
    //Adicionando opções E(esquerda) e D(direita)
    let optionE = document.createElement("option");
    optionE.text = "D";
    optionE.value = 1;
    select_movimentacao.add(optionE);
    let optionD = document.createElement("option");
    optionD.text = "E";
    optionD.value = 2;
    select_movimentacao.add(optionD);
    div_movimentacao.appendChild(select_movimentacao);
    return div_movimentacao;
}