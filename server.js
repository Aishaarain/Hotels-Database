import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js'; 
import personRoutes from './routes/person.route.js';
import menuRoutes from './routes/menu.route.js';

const app = express();
app.use(bodyParser.json()); 
 app.use('/person',personRoutes)
 app.use('/menu',menuRoutes)

app.get('/',(req,res)=>{
  res.send('welcome to our restaurant')
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})