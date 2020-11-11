let nodes = [];

let addNode = (key, value) => {
    let jaExiste = false;
    nodes.forEach((node,index) => {
        if (node.key === key) {
            nodes[index].value.push(value);
            jaExiste = true;
            return;
        }
    });
    if (!jaExiste) {
        nodes.push({
            key: key,
            value: [],
        });
        nodes[nodes.length-1].value.push(value);
    }
};

let clearNodes = () => {
    nodes = [];
}

let getNodeTransicao = (estado_atual, caractere) => {
    let retorno;
    nodes.forEach(node => {
        if (node.key == estado_atual) {
            node.value.forEach(transicao => {
                if (transicao[1] == caractere) {
                    retorno = transicao;
                }
            });
        }
    });
    return retorno;
}