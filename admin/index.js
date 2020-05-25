const AdminBro = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')
AdminBro.registerAdapter(AdminBroMongoose)
const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const UserModel = mongoose.model('user', {
//     lastName: { type: String, required: true },
//     firstName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     address: { type: String, required: true },
//     nickName: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     paymentInfo: {
//         cardNumber: { type: String },
//         expirationDate: { type: String},
//         cardName: { type: String },
//     },
//     liked: [{type: Schema.Types.ObjectId, ref: 'product'}],
//     bids: [{type: Schema.Types.ObjectId, ref: 'product'}],
//     sales: [{type: Schema.Types.ObjectId, ref: 'product'}],
//     created_at: { type: Date, default: new Date() }
// },'user')

// const ProductModel = mongoose.model('product', {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     deadLine: { type: Date, default: new Date(+new Date() + 10 * 24 * 60 * 60 * 1000) }, //date de fin d'enchere par défault = date de création + 7 ou 10j
//     created_at: { type: Date, default: Date.now() },
//     description: { type: String, required: true },
//     images: [{ type: String }],
//     addedBy: { type: String },
//     bidder: { type: Schema.Types.ObjectId, ref: 'user' },
//     likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }]
// },'product')
// const User = require("../back/user/user.model");
// const Product = require("../back/product/product.model");
// const menu = {
//     user: { name: 'Utilisateurs', icon: 'icon-mongodb' },
//     product: { name: 'Encheres', icon: 'icon-postgres' },
//     customized: { name: 'Customized Resources', icon: 'fas fa-marker' }
//   }
  
// const user = require('./ressources/user')
// const product = require('./ressources/product')


// module.exports = {
//     // databases: [mongoose],
//     resources: [
//         { resource: User, options: { parent: menu.user, ...user }},
//         { resource: Product, options: { parent: menu.product, ...product } },

//       ],
//     version: {
//       admin: true,
//       app : '1.0'
//     },
//     branding: {
//       logo: 'https://hub.ynov.com/medias/editor/oneshot-images/21357707045c24e38ec359c.png',
//       companyName: 'REAL TIME APP | Enchères',
//       softwareBrothers: false,
//     },
//     // dashboard: {
//     //     handler: async () => {
    
//     //     },
//     //     component: AdminBro.bundle('./components/dashboard.jsx')
//     //   },
//     dashboard: {
//         handler: async (request, response, data) => {
//           const categories = await CategoryModel.find({}).limit(5)
//           return {
//             usersCount: await User.countDocuments(),
//             pagesCount: await Product.countDocuments(),
//             categories: await Promise.all(categories.map(async c => {
//               const comments = await CommentModel.countDocuments({ category: c._id })
//               return {
//                 title: c.title,
//                 comments,
//                 _id: c._id,
//               }
//             }))
//           }
//         },
//         component: AdminBro.bundle('./components/dashboard'),
//       },
//       rootPath: '/admin',    
//   }
  
  