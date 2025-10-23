-- Criar o banco de dados (se não existir) com charset UTF-8
CREATE DATABASE IF NOT EXISTS ecommerce_pc DEFAULT CHARACTER SET utf8mb4;
USE ecommerce_pc;

-- Tabela de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Tabela de categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    UNIQUE (nome)
);

-- Tabela de produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT,
    categoria_id INT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Em andamento',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabela de itens do pedido
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

create table usuarios(
    id int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) DEFAULT 'comum',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir categorias
INSERT INTO categorias (nome, descricao) VALUES
('Processadores', 'CPUs para desktop'),
('Memória RAM', 'Módulos de memória para PC'),
('Placas de Vídeo', 'GPUs para jogos e renderização'),
('Armazenamento', 'Dispositivos como SSDs e HDs'),
('Placa-Mãe', 'Motherboards compatíveis com CPUs e periféricos');

-- Inserir produtos
INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id) VALUES 
('Intel Core i5-10400', '6 núcleos - 12 threads 2.9GHz', 899.90, 10, 1),
('AMD Ryzen 5 5600X', '6 núcleos - 12 threads 4.6GHz', 1099.99, 20, 1),
('Memória DDR4 8GB 2666MHz - Kingston Fury Beast', 'Módulo DDR4 para desktops', 189.90, 20, 2),
('Memória DDR4 16GB 3200MHz - Corsair Vengeance LPX', 'Alta performance para jogos e tarefas pesadas', 349.50, 15, 2),
('NVIDIA GeForce GTX 1660 6GB GDDR5', 'GPU para jogos de médio desempenho', 1450.00, 5, 3);

-- Verificar os produtos inseridos
SELECT * FROM categorias;

INSERT INTO clientes(nome,email,senha,endereco) VALUES
('Claudio DJango', 'ClaudioDaBola@proton.me','ClaudioBolas','R. Cel. Diogo,1199 - Vila Monumento, Sao Paulo - SP');

INSERT INTO usuarios (nome, email, senha, tipo) values 
('Administrador', 'admin@email.com', '$2b$10$vcShCSwNHImUdm0/x2xk3e9qBh1DYR4vY.MUvGoX92e6N/ZYnBBNe', 'admin');
