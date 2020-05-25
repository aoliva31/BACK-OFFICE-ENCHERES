// ==========  server.js ==============
// Requirements
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const bcrypt = require('bcrypt')
const AdminBroOptions = require('./admin')
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// We have to tell AdminBro that we will manage mongoose resources with it

// express server definition
const app = express()
app.use(bodyParser.json())
// Resources definitions
//USER MODEL
const Schema = mongoose.Schema;
const User = mongoose.model('user', {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    nickName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    paymentInfo: {
        cardNumber: { type: String },
        expirationDate: { type: String},
        cardName: { type: String },
    },
    liked: [{type: Schema.Types.ObjectId, ref: 'product'}],
    bids: [{type: Schema.Types.ObjectId, ref: 'product'}],
    sales: [{type: Schema.Types.ObjectId, ref: 'product'}],
    created_at: { type: Date, default: new Date() },
    role: { type: String, enum: ['admin', 'restricted'] },
},'user')

//PRODUCT MODEL
const Product = mongoose.model('product', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    deadLine: { type: Date, default: new Date(+new Date() + 10 * 24 * 60 * 60 * 1000) }, //date de fin d'enchere par défault = date de création + 7 ou 10j
    created_at: { type: Date, default: Date.now() },
    description: { type: String, required: true },
    images: [{ type: String }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'user'},
    bidder: { type: Schema.Types.ObjectId, ref: 'user' },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},'product')


// Routes definitions
app.get('/', (req, res) => res.send('Hello World!'))
// Route which returns last 100 users from the database
app.get('/users', async (req, res) => {
  const users = await User.find({}).limit(10)
  console.log(users);
  res.send(users)
})
// Route which creates new user
app.post('/users', async (req, res) => {
  const user = await new User(req.body.user).save()
  res.send(user)
})

const menu = {
  user: { name: 'Utilisateurs', icon: 'fa fa-user' },
  product: { name: 'Encheres', icon: 'icon-postgres' },
  customized: { name: 'Customized Resources', icon: 'fas fa-marker' }
}
const user = require('./admin/ressources/user')
const product = require('./admin/ressources/product')

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    { resource: User, options: { parent: menu.user, ...user }, },
    { resource: Product, options: { parent: menu.product, ...product } },
  ],
  rootPath: '/admin',
  version: {
    admin: true,
    app : '1.0'
  },
  branding: {
    logo: 'https://hub.ynov.com/medias/editor/oneshot-images/21357707045c24e38ec359c.png',
    companyName: 'REAL TIME APP | Enchères',
    softwareBrothers: false,
  },
  dashboard: {
    handler: async () => {},
    component: AdminBro.bundle('./admin/components/dashboard.jsx')
  },
})

// //EXPORT NEW ARBO
// const adminBro = new AdminBro(AdminBroOptions)

// Build and use a router which will handle all AdminBro routes
// const router = AdminBroExpressjs.buildRouter(adminBro)
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
   // console.log(email);
    const user = await User.findOne({ email })
    //console.log(user);
    if (user) {
      const matched = await bcrypt.compare(password, user.password)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'mdp-echeres-ynov-secret',
})

app.use(adminBro.options.rootPath, router)
// Running the server
const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/tpencheres', { useNewUrlParser: true })
  await app.listen(8080, () => console.log(`BACK-OFFICE ENCHERE ON 8080!`))
}
run()