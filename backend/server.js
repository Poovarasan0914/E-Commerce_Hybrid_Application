const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/passportAutomationSystem";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db('passportAutomationSystem');

    app.post('/registeradmin', async (req, res) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const collection = db.collection('admins');

      try {
        const result = await collection.insertOne({ username, email, password });
        console.log('Admin registration successful:', result);
        res.status(200).json({ message: 'Admin registration successful' });
      } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/registeruser', async (req, res) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const collection = db.collection('users');

      try {
        const result = await collection.insertOne({ username, email, password });
        console.log('User registration successful:', result);
        res.status(200).json({ message: 'User registration successful' });
      } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/login', async (req, res) => {
      const { role, username, password } = req.body;

      if (!role || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const collection = db.collection(role === 'admin' ? 'admins' : 'users');

      try {
        const user = await collection.findOne({ username, password });
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ success: true, message: 'Login successful' });
      } catch (err) {
        console.error('Error finding document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/apply', async (req, res) => {
      const { name, dob, address, passportType } = req.body;

      if (!name || !dob || !address || !passportType) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const collection = db.collection('applications');

      try {
        const result = await collection.insertOne({ name, dob, address, passportType, status: 'Pending' });
        console.log('Application submitted:', result);
        res.status(200).json({ success: true, message: 'Application submitted successfully' });
      } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.get('/applications', async (req, res) => {
      const collection = db.collection('applications');

      try {
        const applications = await collection.find({}).toArray();
        console.log('Fetched applications:', applications); // Add logging here
        res.status(200).json({ applications });
      } catch (err) {
        console.error('Error finding documents:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/applications/:id/approve', async (req, res) => {
      const { id } = req.params;
      const collection = db.collection('applications');

      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: 'approved' } }
        );
        console.log('Application approved:', result);
        res.status(200).json({ success: true, message: 'Application approved' });
      } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/applications/:id/reject', async (req, res) => {
      const { id } = req.params;
      const collection = db.collection('applications');

      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: 'rejected' } }
        );
        console.log('Application rejected:', result);
        res.status(200).json({ success: true, message: 'Application rejected' });
      } catch (err) {
        console.error('Error updating document:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // All other GET requests not handled before will return the React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);