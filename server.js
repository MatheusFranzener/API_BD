const express = require("express");
const cors = require("cors");
const server = express();
const { Sequelize, DataTypes } = require("sequelize");

server.use(cors());
server.use(express.json());

const sequelize = new Sequelize('server', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("Deu certo");
}).catch(err => {
    console.log("Deu erro", err);
});

const user = sequelize.define('users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        createdAt: false,
        updatedAt: false
    }
);

server.post("/user", (req, res) => {
    const { firstName, age } = req.body;
    user.create({ firstName, age }).then(() => {
        res.json({ message: "Success" });
    }).catch(err => {
        res.json({ error: err });
    })
});

server.get("/", (req, res) => {
    res.json({ message: "Ola" });
});

server.listen(3000, async () => {
    await sequelize.sync();
    console.log("Porta 3000 --> Funcionando");
});
