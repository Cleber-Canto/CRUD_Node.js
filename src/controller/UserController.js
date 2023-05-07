const User = require("../models/User").default;

module.exports = {
  async createUser(req, res) {
    try {
      const { name, birth, cpf, phone, email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res
          .status(400)
          .json({ message: "Já existe um usuário com este email" });
      }
      const newUser = await User.create({
        name,
        birth,
        cpf,
        phone,
        email,
        password,
      });
      console.log(`Novo usuário criado: ${newUser.name} (${newUser.email})`);
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(`Erro ao criar usuário: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, birth, cpf, phone, email, password } = req.body;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        console.log(`Usuário com id ${id} não encontrado`);
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const updatedUser = await user.update({
        name,
        birth,
        cpf,
        phone,
        email,
        password,
      });
      console.log(
        `Usuário atualizado: ${updatedUser.name} (${updatedUser.email})`
      );
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error(`Erro ao atualizar usuário: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },
  async listUsers(req, res) {
    try {
      const { name, cpf, phone, email } = req.query;
      const where = {};
      if (name) where.name = name;
      if (cpf) where.cpf = cpf;
      if (phone) where.phone = phone;
      if (email) where.email = email;
      const users = await User.findAll({ where });
      if (!users.length) {
        console.log(
          "Não existem usuários cadastrados com os filtros informados"
        );
        return res
          .status(404)
          .json({
            message:
              "Não existem usuários cadastrados com os filtros informados",
          });
      }
      console.log(`Listando usuários: ${JSON.stringify(users)}`);
      res.status(200).json({ users });
    } catch (error) {
      console.error(`Erro ao listar usuários: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      await user.destroy();
      console.log(`Usuário excluído: ${user.name} (${user.email})`);
      res.status(204).send();
    } catch (error) {
      console.error(`Erro ao excluir usuário: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },
};
