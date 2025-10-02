CREATE DATABASE IF NOT EXISTS ecommerce_pc DEFAULT CHARACTER SET utf8;
USE ecommerce_pc;
CREATE TABLE id_cliente (
    ID INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);
CREATE TABLE categorias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    UNIQUE (nome)
);
CREATE TABLE produtos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT,
    categoria_id INT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (preco),
    FOREIGN KEY (categoria_id) REFERENCES categorias(ID)
);
CREATE TABLE pedido (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Em andamento',
    FOREIGN KEY (cliente_id) REFERENCES id_cliente(ID)
);
CREATE TABLE item_pedido (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (pedido_id) REFERENCES pedido(ID),
    FOREIGN KEY (produto_id) REFERENCES produtos(ID)
);
