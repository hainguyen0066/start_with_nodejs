const express = require('express');
const { engine } = require ('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const methodOverride = require('method-override');
// khoi dong app

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


//nhap khau router
const posts = require('./routers/posts');

// khoi dong express middleware
app.use(express.json());
// khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// khoi dong methodoverride
app.use(methodOverride('_method'))
// ket noi
connectDB();
// một số router cơ bản có thể đưa vào file riêng trong thư mục


// mang router post vao su dung
app.get('/', (req, res) => res.render('index'))

app.get('/about', (req, res) => res.render('about'))

app.use('/posts', posts)

const PORT = 5000;

app.listen(PORT, () => console.log(`Sever khoi dong port ${PORT}`));
