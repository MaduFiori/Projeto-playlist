function cadastro(){
    const email = document.getElementById("email")
    const musica = document.getElementById("musica")
    const cantor = document.getElementById("cantor")

    fetch("http://localhost:4600/api/tbsugestaos/cadastrar",{
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            musica: musica.value,
            cantor: cantor.value
        })
    })

    .then((resultado) => resultado.json())
    .then((dados)=> {
        alert(`${dados.output}`)
        email.value = "";
        musica.value = "";
        cantor.value = "";
    })

    .catch((err) => console.error(err));
}