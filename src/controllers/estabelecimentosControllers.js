const { response } = require("express");
const models = require("../models/estabelecimentos.json");

const getAll =(require, response) =>{
    
    const {pagamento, bairro, delivery} = require.query 
   
    let filtrados = models 
    

    if (pagamento){
        filtrados =filtrados.filter(estabelecimento =>{
            return estabelecimento.pagamento.includes(pagamento)
           
        })
    }
    

    if (bairro){
        filtrados =filtrados.filter(estabelecimento =>{
            return estabelecimento.bairro == bairro
        })
    }
    
    if(delivery){
        filtrados = filtrados.filter(estabelecimento =>{
            return estabelecimento.delivery == (delivery == "true" ? true:false)
        })
    }
    response.status(200).send(filtrados)
}

const getId = (require, response) => {
     const idSolicitado = require.params.id

     const found = models.find(estabelecimento => estabelecimento.id == idSolicitado)
     
     if(found == undefined){
         response.status(404).send({message: "Estabelecimeto não encontrado"})
     }
     response.status(200).send(found)
}
const cadastrar =(request, response)=>{
    let body = request.body

    let novoEstabelecimento = {
        id:(models.length)+1,
        likes: body.likes,
        nome: body.nome,
        Plot:body.Plot,
        categoria: body.categoria,
        numero: body.numero,
        bairro: body.bairro,
        cidade:body.cidade,
        telefone:body.telefone,
        pagamento:body.pagamento,
        delivery:body.delivery
    }

    models.push(novoEstabelecimento)

    response.status(201).json(
        [
            {
                "mensagem":"Cadastro feito com com sucesso.",
                novoEstabelecimento
            },
        ]
    )
}


const like = (require, response) =>{
    const id = require.params.id

    const found = models.find(estabelecimento => estabelecimento.id == id)
    if(found == undefined){
        response.status(404).send({message: "Estabelecimento não encontrado"})
    }
    found.likes += 1
    response.status(200).send(found)
}
const deslike = (require, response) =>{
    const id = require.params.id
    const found = models.find(estabelecimento => estabelecimento.id == id)
    if(found == undefined){
        response.status(404).send({message: "Estabelecimento não encontrado"})
    }
    found.deslikes += 1
    response.status(200).send(found)
}

module.exports = {
    getAll,
    getId,
    cadastrar,
    like,
    deslike
}