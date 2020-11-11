let salvarPrograma = () => {
    //Coletando valores dos inputs
    let alfabeto_entrada = document.getElementById("simbolos-entrada").value;
    let alfabeto_aux = document.getElementById("simbolos-aux").value;
    let estados = document.getElementById("estados").value;
    let estado_inicial = document.getElementById("estado-inicial").value;
    let estados_finais = document.getElementById("estados-finais").value;
    let simbolo_branco = document.getElementById("simbolo-branco").value;
    let simbolo_inicio = document.getElementById("simbolo-inicio").value;

    //Cria texto para ser salvo
    let texto = alfabeto_entrada + "\r\n" +
        alfabeto_aux + "\r\n" +
        estados + "\r\n" +
        estado_inicial + "\r\n" +
        estados_finais + "\r\n" +
        simbolo_branco + "\r\n" +
        simbolo_inicio + "\r\n---\r\n";

    //Obtendo tabela
    let tabela = document.getElementById("tabela");
    let linhas = tabela.rows;
    //Percorrendo linhas da tabela
    for (let i = 1; i < linhas.length; i++) {
        let row = linhas.item(i);
        let cells = row.cells;
        //Percorrendo células de cada linha da tabela
        for (let j = 1; j < cells.length; j++) {
            let cell = cells.item(j);
            let selects = cell.querySelectorAll("select");
            //Percorre os selects para coletar transições criadas
            selects.forEach((select,index) => {
                let escolha = select.querySelector("option:checked");
                texto += escolha.value;
                //Escreve a vírgula se não for o último elemento da linha
                if (index != 2) {
                    texto += ",";
                }
            });
            //Quebra linha depois de finalizar a célula
            texto += "\r\n";
        }
    }

    //Realiza o download do arquivo
    download("save.txt", texto);
};

let carregarPrograma = event => {
    let linha = 0;
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function () {
        //Texto completo do arquivo
        let text = reader.result;
        //Texto separado em duas partes: 0 = formulário da esquerda; 1 = dados da tabela da direita
        let campos = text.split("\r\n---\r\n");
        //Obtendo dados do formulário
        let form = campos[0].split("\r\n");
        form.forEach(campo => {
            carregarValor(++linha, campo);
        });
        //Clicando no botão Editar Programa para gerar a tabela
        document.getElementById("editarPrograma").click();

        //conjunto_campos = lista de valores das células, separados por quebra de linha
        let conjunto_campos = campos[1].split("\r\n");
        //Contador de elementos percorridos de conjunto_campos
        let count = 0;

        //Obtendo tabela e linhas
        let tabela = document.getElementById("tabela");
        let linhas = tabela.rows;

        //Percorrendo linhas da tabela
        for (let i = 1; i < linhas.length; i++) {
            let row = linhas.item(i);
            let cells = row.cells;
            //Percorrendo células de cada linha da tabela
            for (let j = 1; j < cells.length; j++) {
                //Obtendo conjunto de campos da célula, através da linha *count* do *conjunto_campos*, separada por vírgulas
                let campos_novos = conjunto_campos[count++].split(",");

                //Obtendo a célula e os selects de dentro dela
                let cell = cells.item(j);
                let selects = cell.querySelectorAll("select");

                //Alterando valores dos selects de acordo com os valores em *campos_novos*
                selects.forEach((select, index) => {
                    select.value = campos_novos[index];
                });
            }
        }
    };
    reader.readAsText(input.files[0]);
};

//Método para realizar download do arquivo, recebendo o nome e o conteúdo
let download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

let carregarValor = (numero_linha, texto) => {
    switch (numero_linha) {
        case 1:
            document.getElementById("simbolos-entrada").value = texto;
            break;
        case 2:
            document.getElementById("simbolos-aux").value = texto;
            break;
        case 3:
            document.getElementById("estados").value = texto;
            break;
        case 4:
            document.getElementById("estado-inicial").value = texto;
            break;
        case 5:
            document.getElementById("estados-finais").value = texto;
            break;
        case 6:
            document.getElementById("simbolo-branco").value = texto;
            break;
        case 7:
            document.getElementById("simbolo-inicio").value = texto;
            break;
        default:
            console.log("Coletei todos os parametros");
            break;
    }
};