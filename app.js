
const express =require(`express`);

const { engine } = require('express-handlebars')

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('static',express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

const session = require('express-session');
const bcrypt = require('bcrypt');

const mysql = require('mysql2')


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


app.get("/", (req, res) => {
    let sql = 'SELECT * FROM produtos ';
    conexao.query(sql, function (erro, produtos_qs){
        if (erro){
            console.error('Erro ao consultar produtos:', erro);
            res.status(500).send('Erro ao consultar produtos');
            return;
        }
        res.render('index', {produtos: produtos_qs});
    });
}
);

app.get("/clientes", (req, res) => {
    let sql = 'SELECT * FROM clientes ';
    conexao.query(sql, function (erro, clientes_qs){
        if (erro){
            console.error('Erro ao consultar produtos:', erro);
            res.status(500).send('Erro ao consultar produtos');
            return;
        }
        res.render('clientes', {clientes: clientes_qs});
    });
}
);

// Rota para exibir o formulário de adição de produto
app.get("/produtos/add", (req, res) => {
    let sql = 'SELECT * FROM categorias'; 
    conexao.query(sql, function (erro, categorias_qs) {
        if (erro) {
            console.error('Erro ao consultar categorias:', erro);
            res.status(500).send('Erro ao consultar categorias');
            return;
        }

        res.render('produtos', { categorias: categorias_qs }); 
    });
});

// Rota para salvar o produto no banco
app.post('/produtos/add', (req, res) => {
    const { nome, descricao, preco, estoque, categoria_id } = req.body;

    const sql = `
        INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexao.query(sql, [nome, descricao, preco, estoque, categoria_id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir produto:', erro);
            return res.status(500).send('Erro ao adicionar produto.');
        }

        res.redirect('/');
    });
});

// Rota para salvar o produto no banco
app.post('/categorias/add', (req, res) => {
    const { nome, descricao} = req.body;

    const sql = `
        INSERT INTO categorias (nome, descricao)
        VALUES (?, ?)
    `;

    conexao.query(sql, [nome, descricao], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir categoria:', erro);
            return res.status(500).send('Erro ao adicionar categoria.');
        }

        res.redirect('/');
    });
});

app.get('/produtos/:id', (req, res)=> {
    const id = req.params.id;
    const sql = `
    select produtos.*, 
        categorias.nome as categoria_nome 
    from produtos 
    join categorias on produtos.categoria_id = categorias.id 
    where produtos.id = ?
    `; 
    conexao.query(sql, [id], function (erro, produtos_qs){
        if (erro){
            console.error('Erro ao consultar produto:', erro);
            res.status(500).send('Erro ao consultar produto');
            return; 
        }
        if (produtos_qs.length === 0){
            return res.status(404).send('Produtos nao encontrado');
        }
    })
})

app.get("/categorias/add", (req, res) => { 
        res.render('categorias_forms'); 
    });

app.get('/categorias', (req, res) => {
    let sql = 'SELECT * FROM categorias';
    conexao.query(sql, function(erro, categorias_qs) {
        if (erro) {
            console.error('Erro ao consultar produto:', erro);
            res.status(500).send('Erro ao consultar produto');
            return; 
        }
        res.render('tabelas', { categorias: categorias_qs });
    });
});


app.get("/cadastrar", (req, res) => {
    conexao.query(sql, function (erro, clientes_qs) {
        res.render('cadastro_clientes', { categorias: clientes_qs }); 
    });
});

app.post('/clientes/cadastrar', (req, res) => {
    const { nome, email, senha, endereco } = req.body;

    bcrypt.hash(senha, 10, (erro, hash) => {
        if (erro) {
            console.error('Erro interno criptografar s senha.', erro);
            return res.status(500).send('Interno no servidot');
        }

        const sqlUsuario = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
        conexao.query(sqlUsuario, [nome, email, hash, 'comum'], (erro, resultado) => {
            if (erro) {
                console.error('Erro ao inserir usuario:', erro);
                return res.status(500).send('Erro ao construir usuario.');
            }

        const usuario_id = resultado.insertId;
        const sqlCliente = 'INSERT INTO clientes (nome, endereco, usuario_id) VALUES (?, ?, ?)';
        conexao.query(sqlCliente, [nome, endereco, usuario_id], (erro2) => {
            if (erro2) {
                console.error('Erro ao inserir cliente:', erro2);
                return res.status(500).send('Erro ao cadastrar cliente');
            }

            res.redirect('/login');
            });
        });
    });
});

app.use(session({
    secret: 'chave-secreta-ultra-segura',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 360000}
}));

app.listen(8080);
