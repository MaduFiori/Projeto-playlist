const express = require('express');
const res = require('express/lib/response');

const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const urldb = "mongodb+srv://maria:026844@cluster0.psupn.mongodb.net/bancodedados?retryWrites=true&w=majority";
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology:true});

/* -------------------------------------------------------------------------------------------------------------- */

const tabela = mongoose.Schema({
    email:{type: String, require},
    cantor:{type: String, require},
    musica:{type:String, require}
});

const pessoa = mongoose.model("tbsugestaos",tabela);

const default_route = "/api/tbsugestaos";

app.get(`${default_route}/listar`,(req,res)=>{
    pessoa.find().then((dados)=>{
       
        res.status(200).send({output:dados});
        })

        .catch((erro)=> res.status(500)
        .send({output:`Erro interno ao acessar a consulta -> ${erro}`}));
});

app.post(`${default_route}/cadastrar`,(req,res)=>{
    const novo = new pessoa(req.body);
    novo.save().then((dados)=>{
        res.status(201).send({output:`Cadastro realizado`,playload:dados})
    }).catch((erro)=>console.error(`Erro ao tentar cadastrar ${erro}`));

});


app.put(`${default_route}/atualizar/:id`,(req,res)=>{

    pessoa.findByIdAndUpdate(req.params.id,req.body,
        {new:true},(erro,dados)=>{
        if(erro){
            return res.status(500).
            send({output:`Os dados não foram atualizados -> ${erro}`});
    }
        res.status(200).send({output:"Dados atualizados"})
    })
});


app.delete(`${default_route}/apagar/:id`,(req,res)=>{
    pessoa.findByIdAndDelete(req.params.id, (erro,dados)=> {
        if(erro){
            return res
            .status(500)
            .send({output:`Erro ao tentar apagar -> ${erro}`});
        }
        res.status(204).send({output:"apagou"});
    });

});

app.listen(4600,
    ()=>console.log("servidor on-line em http://localhost:4600"));
