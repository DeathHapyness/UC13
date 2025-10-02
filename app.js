const express =require(`express`);

const app = express();

const mysql = require('mysql2')
app.get("/", function(req, res){
    res.write("Bom dia... o sol ja raioi la na fazendinha");
    res.end();
});

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port: 3306,
    database: 'ecommerce_pc'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('erro ao conectar ao banco de dados', erro);
        return;
    }
    console.log('conexao com o banco de dados estabelecida com sucesso')
});


app.listen(8080);
