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
        return { token, user: authUser };
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
    updatePassword: async ({ user }) => {
        try {
            const userInfo = await User.findOne({ mail: user.mail, document: user.document });
            if (!userInfo) {
                throw new Error('Usuario non coincíde');
            }

            userInfo.password = '';
            const salt = await bcryptjs.genSalt(10);
            userInfo.password = await bcryptjs.hash(user.newPassword, salt);

            await User.findOneAndUpdate(
                {
                    mail: user.mail,
                    document: user.document,
                },
                userInfo,
                { new: true },
            );
            return 'Constraseña actualizada';
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async ({ user }) => {
        try {
            const userExists = await User.findById(user._id);

            if (!userExists) {
                throw new Error('El usuario no existe');
            }

            const newUser = await User.findByIdAndUpdate(user._id, user, { new: true });

            return newUser;
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async ({ _id }) => {
        try {
            const userExists = await User.findById(_id);

            if (!userExists) {
                throw new Error('El usuario no existe');
            }

            await User.findByIdAndDelete(_id);

            return 'Usuario Eliminado';
        } catch (error) {
            console.log(error);
        }
    },
};

export default userResolver;
