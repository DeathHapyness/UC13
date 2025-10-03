
const express =require(`express`);

const { engine } = require('express-handlebars')

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
const mysql = require('mysql2')
app.get("/", (req, res) => {
    res.render('index');
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
