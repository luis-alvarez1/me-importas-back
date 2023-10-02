import Pendiente from '../../../model/pendientes/Pendiente';

const pendienteResolver = {
    pendientesByUser: async (args) => {
        const { user } = args;
        try {
            const pendientes = await Pendiente.find({ user: user._id }).populate('user').exec();
            return pendientes;
        } catch (error) {
            console.log(error);
        }
    },
    createPendiente: async (args) => {
        const { pendiente } = args;
        try {
            const newPendiente = await Pendiente.create(pendiente);
            return await newPendiente.populate('user').execPopulate();
        } catch (error) {
            console.log(error);
        }
    },
    updatePendiente: async (args) => {
        const { pendiente } = args;
        try {
            const pendienteExists = await Pendiente.findById(pendiente._id).populate('user').exec();
            if (!pendienteExists) {
                throw new Error('Pendiente no exite');
            }

            if (pendienteExists.user._id + '' !== pendiente.user) {
                throw new Error('No se puede actualizar. Solo el creador puede hacerlo');
            }

            const updatedPendiente = await Pendiente.findByIdAndUpdate(pendiente._id, {
                descripcion: pendiente.descripcion ?? pendienteExists.descripcion,
                state: pendiente.state ?? pendienteExists.state,
            })
                .populate('user')
                .exec();
            return updatedPendiente;
        } catch (error) {
            console.log(error);
        }
    },
    deletePendiente: async (args) => {
        const { _id, user } = args;

        try {
            const pendienteExists = await Pendiente.findById(_id).populate('user').exec();
            if (!pendienteExists) {
                throw new Error('Pendiente no exite');
            }
            if (pendienteExists.user._id + '' !== user) {
                throw new Error('No se puede actualizar. Solo el creador puede hacerlo');
            }
            await Pendiente.findByIdAndDelete(_id);
            return 'Pendiente Eliminado';
        } catch (error) {
            console.log(error);
        }
    },
};

export default pendienteResolver;
