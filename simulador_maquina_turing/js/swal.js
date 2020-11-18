let gerarErro = texto => {
    swal({
        title: texto,
        icon: "error",
    });
};

let gerarAlerta = texto => {
    swal({
        title: texto,
        icon: "info",
    });
}