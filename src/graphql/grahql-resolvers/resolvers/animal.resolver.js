import Animal from '../../../model/animal/Animal';

const animalResolver = {
  animals: async ({ filter }) => {
    return await Animal.find(filter);
  },
  createAnimal: async ({ animal }) => {
    if (!animal) {
      throw new Error('Fields Required!!');
    }
    try {
      const newAnimal = new Animal(animal);
      return await newAnimal.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateAnimal: async ({ animal }) => {
    if (!animal._id) {
      throw new Error('ID IS REQUIRED TO UPDATE');
    }

    const currentAnimal = await Animal.findOne({
      _id: animal._id,
    });

    if (!currentAnimal) {
      throw new Error("ANIMAL DOESN'T EXIST");
    }

    try {
      return await Animal.findOneAndUpdate(
        { _id: animal._id },
        animal,
        { new: true },
      );
    } catch (error) {
      console.log(error);
    }
  },

  deleteAnimal: async ({ animal }) => {
    if (!animal) {
      throw new Error('ID REQUIRED');
    }

    const currentAnimal = await Animal.findOne({
      _id: animal._id,
    });

    if (!currentAnimal) {
      throw new Error("ANIMAL DOESN'T EXIST");
    }

    try {
      await Animal.findOneAndRemove(
        { _id: animal._id },
        animal,
      );

      return `ANIMAL WITH ID ${animal._id} REMOVED`;
    } catch (error) {
      console.log(error);
    }
  },
};

export default animalResolver;
