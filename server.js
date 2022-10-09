const dotenv = require('dotenv')
const path = require('path');
const express = require('express');
const bird_router = require('./routers/bird_router');
const image_router = require('./routers/image_router');
const mongoose = require('mongoose');

/* load .env */
dotenv.config();

/* create Express app */
const app = express();

/* setup Express middleware */
// Pug for SSR (static site rendering)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// TODO: middleware for parsing POST body
// TODO: middleware for uploading files

/* host static resources (.css, .js, ...) */
app.use('/images/', image_router);
app.use('/', express.static(path.resolve(__dirname, 'public/')));

/* redirect root route `/` to `/birds/` */
app.get('/', (req, res) => {
    res.redirect('/birds/');
});

app.use('/birds/', bird_router);

app.use('*', (req, res) => {
    res.status(404);
    res.render('404');
})

// connect to a database
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const cluster_id = process.env.CLUSTER_ID;
const db_name = process.env.DB_NAME
const db_url = `mongodb+srv://${user}:${pass}@cluster0.${cluster_id}.mongodb.net/${db_name}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(db_url, options).then(() => {
    console.log("connected to database!");
}).catch((e) => {
    console.error(e, 'could not connect to database.')
})

/* start the server */
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
});
