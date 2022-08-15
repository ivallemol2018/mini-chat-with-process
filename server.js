const express = require('express')
const session = require('express-session')
const passport = require('./middlewares/passport-local')
const requireLogin = require('./middlewares/requireLogin');
const MongoStore = require('connect-mongo')


const fetch = require('node-fetch')
const http = require('http')
const keys = require('./config/keys');
const args = require('./config/args')
const { Server } = require('socket.io')


const apiProduct = require('./routes/productRoutes')
const apiMessage = require('./routes/messageRoutes')
const apiUtil    = require('./routes/utilRoutes')  

const app = express()
const server = http.createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || args.PORT

app.use(session({
  store: new MongoStore({
      mongoUrl: keys.dbManagment,
      ttl: 60
  }),
  secret: 'dumbledure',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('./views'))

app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/productos',apiProduct)
app.use('/mensajes',apiMessage)
app.use('/api',apiUtil)


app.get('/info',(request,response)=>{
  const info={
    'pid': process.pid,
    'version': process.version,
    'memoryUsage': process.memoryUsage(),
    'platform': process.platform,
    'execPath': process.execPath,
    'cwd': process.cwd(),
    'argv' : process.argv.slice(2)
  }
  response.send({info})
})

app.get('/',requireLogin,(request,response)=>{
  const { username } = request.session
  response.render('index',{username})
})

app.get('/signup',(request,response)=>{
  response.render('signup',{ signup_errors: request.session.messages || []})
})

app.post(
  '/signup',
  passport.authenticate('signup',{ failureRedirect: '/signup', failureMessage: true}),
  (request,response)=>{
    const {username} = request.body

    request.session.username = username

    response.render('index',{username})
})

app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/', failureMessage: true}),
  (request,response)=>{
    const {username} = request.body

    request.session.username = username

    response.render('index',{username})
})

app.post('/logout',(request,response)=>{
  const { username } = request.session
  request.session.destroy(()=>{
    response.render('logout',{username})
  })
})

app.post('/store',requireLogin,(request,response)=>{
  fetch(`${keys.redirectDomain}/productos`,{method: 'post', body: JSON.stringify(request.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => response.render('index',{isSaved:'saved'}))
})

app.post('/communication',requireLogin,(request,response)=>{
  fetch(`${keys.redirectDomain}/mensajes`,{method: 'post', body: JSON.stringify(request.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => response.render('index'))
})

io.on('connection',socket=>{
  socket.on('loadProducts', (newMessage)=>{
    io.sockets.emit('loadProductClient','messages')
  })

  socket.on('loadProductsRandom', (newMessage)=>{
    io.sockets.emit('loadProductClientRandom','messages')
  })  

  socket.on('loadMessages', (newMessage)=>{
    io.sockets.emit('loadMessageClient','messages')
  })  

})

server.listen(PORT,()=>{
  console.log(`Server http on ${PORT}...`)
})

server.on('error',error=> console.log('Error on server',error))