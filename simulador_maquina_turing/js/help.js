let tutorial = [
    "Primeiro, insira os campos no formulario a esquerda.",
    "Depois, clique em 'Editar Programa' para que seja gerada a tabela de transicoes possiveis",
    "Preencha as celulas da tabela onde existem transicoes.",
    "Clique em 'Executar Programa' para que o programa seja executado e o resultado apresentado.",
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