document.addEventListener('DOMContentLoaded', (event) => {

    var inScreen = false;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        handleDrop(e);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        return false;
    }

    function handleDragEnter(e) {
        e.target.classList.forEach(classe => {
            if (classe === "operador") {
                inScreen = true;
                this.classList.add('over');
            }
        });
    }

    function handleDragLeave(e) {
        e.target.classList.forEach(classe => {
            if (classe === "operador") {
                this.classList.remove('over');
                setTimeout(() => {
                    inScreen = false;
                }, 200);
            }
        });
    }

    function handleDrop(e) {
        if (inScreen) {
            e.target.classList.forEach(classe => {
                if (classe !== 'sprite' && classe !== 'selecionavel') {
                    let elemento = document.createElement('div');
                    elemento.classList.add('operador-logico');

                    let node = document.createElement("div");
                    node.classList.add('operador-item');
                    node.classList.add(classe);

                    let entradas = document.createElement("div");
                    entradas.classList.add('entradas');

                    let entrada = document.createElement("div");
                    entrada.classList.add('entrada');
                    entradas.appendChild(entrada);
                    adicionarEntrada(entrada);

                    if (classe === 'buf' || classe === 'not') {
                        node.classList.add('uma-entrada');
                    }
                    else {
                        node.classList.add('duas-entradas');
                        let entrada = document.createElement("div");
                        entrada.classList.add('entrada');
                        entradas.appendChild(entrada);
                        adicionarEntrada(entrada);
                    }

                    let saida = document.createElement("div");
                    saida.classList.add('saida');
                    adicionarSaida(saida);

                    elemento.appendChild(entradas);
                    elemento.appendChild(node);
                    elemento.appendChild(saida);

                    document.querySelector('.operador').appendChild(elemento);
                    atualizaElementos();
                }
            });
            
        }

        return false;
    }

    let items = document.querySelectorAll('.selecionavel');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });

    document.querySelector('.operador').addEventListener('dragenter', handleDragEnter, false);
    document.querySelector('.operador').addEventListener('dragleave', handleDragLeave, false);
});