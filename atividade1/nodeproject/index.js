const express = require("express")
const app = express()

app.set("view engine","ejs")

app.get("/", function(requisicao, resposta){
    resposta.render("exercicio1", {
        title: "Exercício 1",
        body: "",
        scripts: ""
    })
})
app.get("/exercicio2", function(requisicao, resposta){
    resposta.render("exercicio2", {
        title: "Exercício 2",
        body: "",
        scripts: ""
    })
})
app.get("/exercicio3", function(requisicao, resposta){
    resposta.render("exercicio3", {
        title: "Exercício 3",
        body: "",
        scripts: ""
    })
})
app.get("/exercicio4", function(requisicao, resposta){
    resposta.render("exercicio4", {
        title: "Exercício 4",
        body: "",
        scripts: ""
    })
})
app.get("/exercicio5", function(requisicao, resposta){
    resposta.render("exercicio5", {
        title: "Exercício 5",
        body: "",
        scripts: ""
    })
})

app.listen(3000, function(erro){
    if(erro){
        console.log ("Ocorreu um erro!")
    } else {
        console.log ("Servidor iniciado com sucesso! (http://127.0.0.1:3000)")
    }
})