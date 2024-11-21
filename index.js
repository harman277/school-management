const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/school');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', schoolRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/',async(req,res)=>{
    res.send("Server starts running....")
})