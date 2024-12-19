require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors(
  {
    origin : ['http://localhost:5173','https://job-portal-19ea3.web.app','https://job-portal-19ea3.firebaseapp.com'],
    credentials:true
  }
));
app.use(cookieParser())
app.use(express.json());

const verifyToken = (req,res,next)=>{
  const token = req?.cookies?.token
  if (!token) return res.status(401).send({message: "Unauthorized access"})
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err) {
      return res.status(401).send({message: "Unauthorized access"})
    }
      req.user = decoded
      next()
  })  
     
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qo68l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
   
    const jobsCollection = client.db("jobsDB").collection("jobs");
    const jobApplicationCollection = client
      .db("jobsDB")
      .collection("job_application");


  // auth token apis
  app.post("/jwt", async (req,res)=>{
    const user = req.body
    const token =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "30d"})
    res
    .cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({success:true})
  })

  app.post('/logout',(req,res)=>{
    res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({message:"Log out successfully"})
  })

    // jobs related apis
    app.get("/jobs", async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { hr_email: email };
      }
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    app.get("/job-application", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      if (req.user?.email !== email) {
        return res.status(403).send({message: "Forbidden access"})
      }
      const result = await jobApplicationCollection.find(query).toArray();
      for (const application of result) {
        const id = application.job_id;
        const query = { _id: new ObjectId(id) };
        const job = await jobsCollection.findOne(query);
        if (job) {
          application.company_logo = job.company_logo;
          application.company = job.company;
          application.position = job.position;
          application.location = job.location;
          application.job_type = job.job_type;
        }
      }
      res.send(result);
    });

    app.get('/job-applications/jobs/:job_id',async(req,res)=>{
      const jobId = req.params.job_id
      const query = {job_id:jobId}
      const result = await jobApplicationCollection.find(query).toArray()
      res.send(result)
    })
    // job application apis
    app.post("/job-applications", async (req, res) => {
      const applications = req.body;
      const result = await jobApplicationCollection.insertOne(applications);

      // fokira way
      const id = applications.job_id
      const query = {_id : new ObjectId(id)}
      const job = await jobsCollection.findOne(query)
      let count = 0;
      if (job.applicationCount) {
        count = job.applicationCount + 1
      }else{
        count = 1
      }
       
      const updatedDoc = {
        $set : {
          applicationCount : count
        }
      }
      
      const updatedResult = await jobsCollection.updateOne(query,updatedDoc)
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const job = req.body;
      const result = await jobsCollection.insertOne(job);
      res.send(result);
    });

    app.delete("/jobs/:id", async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await jobsCollection.deleteOne(query)
      res.send(result)
    })
    app.delete("/applications/:id", async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await jobApplicationCollection.deleteOne(query)
      res.send(result)
    })

    app.patch('/job-applications/:id',async(req,res)=>{
      const id = req.params.id
      const data = req.body
      const filter = {_id : new ObjectId(id)}
      const options = { upsert: true };
      const updatedData = {
        $set:{
           status:data?.status
        }
      }
      const result = await jobApplicationCollection.updateOne(filter,updatedData,options)
      res.send(result)
    })

    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("job portal server is running");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
