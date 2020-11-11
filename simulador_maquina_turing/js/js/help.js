let tutorial = [
    "Primeiro, insira os campos no formul\u00e1rio a esquerda.",
    "Depois, clique em 'Editar Programa' para que seja gerada a tabela de transi\u00e7\u00f5es possiveis",
    "Preencha as c\u00e9lulas da tabela onde existem transi\u00e7\u00f5es.",
    "Clique em 'Executar Programa' para abrir a janela solicitando a fita de entrada.",
    "Insira a fita e clique em OK para visualizar o resultado."
];

let help = index => {
    swal({
        title: "Como funciona",
        text: tutorial[index],
        buttons: {
            cancel: "Pular",
            catch: hasNextButton(index),
        },
        closeOnEsc: true,
        closeOnClickOutside: true,
    }).then(escolha => {
        if (escolha == "next") {
            help(index + 1);
        }
    });
}

let hasNextButton = index => {
    if (index == tutorial.length - 1) return { text: "OK", value: "close", };
    return { text: ">", value: "next", };
}