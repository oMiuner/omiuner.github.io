//Apresenta alert na tela e aguarda por entrada do usuário
let lerFita = () => {
    swal({
        title: "Digite a fita de entrada",
        content: "input",
        closeOnEsc: false,
        closeOnClickOutside: false,
    }).then(fita => {
        if (fita === "") {
            gerarErro("A fita n\u00e3o pode estar vazia!");
            return false;
        }
        executarPrograma(fita);
        return true;
    });
};

//Isso faz com que seja possível dar replace em determinado caractere da fita, devido a imutabilidade do javascript
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};