const mongoose = require('mongoose');
const faker = require('faker');

// Connect to MongoDB (replace 'your_mongodb_uri' with your MongoDB connection URI)
mongoose.connect("mongodb+srv://krishnatripathy2001:Krishna25@curd.s8xsq8c.mongodb.net/curd", { useNewUrlParser: true, useUnifiedTopology: true });

// Define Patient schema (similar to your existing schema)
const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  // Add more fields as needed
});

// Create Patient model
const Patient = mongoose.model('Patient', patientSchema);

// Function to seed random patient data
const seedPatients = async (numPatients) => {
  try {
    // Replace 'user_id' with the actual ObjectId of a user from your User collection
    const userId = '65bdc00018dbc682a09e6719';

    // Generate and insert dummy patient records
    const patients = [];
    for (let i = 0; i < numPatients; i++) {
      const newPatient = {
        userId,
        name: faker.name.findName(),
        age: faker.random.number({ min: 1, max: 100 }),
        gender: faker.random.arrayElement(['Male', 'Female', 'Other']),
        // Add more fields as needed
      };
      patients.push(newPatient);
    }

    await Patient.insertMany(patients);
    console.log(`${numPatients} patient records seeded successfully.`);
  } catch (error) {
    console.error('Error seeding patient data:', error.message);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Specify the number of dummy patients you want to generate
const numPatientsToSeed = 100;

// Seed patient data
seedPatients(numPatientsToSeed);
