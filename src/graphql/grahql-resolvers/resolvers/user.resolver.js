import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../../../model/user/User';

const userResolver = {
  users: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  },
  login: async ({ user }) => {
    const authUser = await User.findOne({ mail: user.mail });
    if (!authUser) {
      throw new Error('No existe el usuario');
    }

    const isPasswordEqual = await bcryptjs.compare(user.password, authUser.password);

    if (!isPasswordEqual) {
      throw new Error('Contraseña no conicide');
    }

    const token = jwt.sign(
      {
        name: authUser.name,
        mail: authUser.mail,
        document: authUser.document,
        _id: authUser._id,
      },
      process.env.SECRET,
      { expiresIn: '1h' },
    );
    return { token };
  },
  createUser: async ({ user }) => {
    try {
      const userExists = await User.findOne({ mail: user.mail });

      if (userExists) {
        throw new Error('El usuario ya existe');
      }

      const newUser = new User(user);

      const salt = await bcryptjs.genSalt(10);

      newUser.password = await bcryptjs.hash(newUser.password, salt);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  },
};

export default userResolver;
