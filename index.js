const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
const PORT = process.env.PORT || 3001;
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const JWT_SECRET_KEY=secretKey;

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
 
mongoose.connect("mongodb+srv://krishnatripathy2001:Krishna25@curd.s8xsq8c.mongodb.net/curd", { useNewUrlParser: true, useUnifiedTopology: true })

const tokenBlacklist = [];

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }
  const token = authHeader.split(' ')[1]; // Extract the token part
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ message: 'Unauthorized - Token revoked' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
const isAdmin = (req, res, next) => {
    console.log('-- ', req.user)
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  };
  app.post('/patients', validateToken, async (req, res) => {
    try {
      const { name, age, gender } = req.body;
      console.log('usr --- ',req.user)
  
      // Find the logged-in user
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newPatient = new Patient({
        userId: user._id,
        name,
        age,
        gender,
        // Add more fields as needed
      });
  
      // Save the patient record to the database
      await newPatient.save();
  
      res.status(201).json({ message: 'Patient record created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get patient records for the logged-in user
  app.get('/patients', validateToken, async (req, res) => {
    console.log('user info ', req.user._id)
    console.log('user info ', req.user)
    try {
      // Find the logged-in user
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find patient records for the user
      const patients = await Patient.find({ userId: user._id });
  
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Signup route
  app.post('/signup', async (req, res) => {
    try {
      const { username, password, name, age, gender, role } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, password: hashedPassword, role });
  
  
  
      if (role === 'admin') {
        // Admins are not associated with patients in this example
        await newUser.save();
        res.status(201).json({ message: 'Admin created successfully' });
      } else {
        // Create a new patient record for the user
        const newPatient = new Patient({
          userId: newUser._id,
          name,
          age,
          gender,
          // Add more fields as needed
        });
        await newUser.save();
         // Save the user to the database
        // Save the patient record to the database
        await newPatient.save();
  
        res.status(201).json({ message: 'User and patient created successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // Login route
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database
      const user = await User.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ username: user.username,_id:user._id, role: user.role }, JWT_SECRET_KEY);
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/logout', validateToken, (req, res) => {
    const token = req.headers.authorization;
  
    // Add the token to the blacklist
    tokenBlacklist.push(token);
  
    res.json({ message: 'Logout successful' });
  });
  
  app.get('/patients/all', validateToken, isAdmin, async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get('/',(req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

app.put('/updateUser/:id',(req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email})   
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deleteUser/:id',(req,res) =>  {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    console.log("Received data:", req.body);

    UserModel.create(req.body)
        .then(users => {
            console.log("User created successfully:", users);
            res.json(users);
        })
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});


app.listen(3001,() =>{
    console.log("Server is Running");
})