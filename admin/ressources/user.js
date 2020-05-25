const AdminBro = require('admin-bro')
const { sort, timestamps } = require('./sort')
// RBAC functions
const canModifyUsers = ({ currentAdmin, record }) => {
  return currentAdmin && (
    currentAdmin.role === 'admin'
    || currentAdmin._id === record.param('_id')
  )
}

module.exports = {
  name: 'Utilisateurs',
  sort,
  properties: {
    ...timestamps,
  },
  properties: {
    email: {
      isVisible: { list: false, filter: true, show: true, edit: true },
    },
    _id: {
      isVisible: { list: false, filter: true, show: false, edit: false },
    },
    password: {
      type: 'string',
      isVisible: false,
    },
    firstName: {
      isTitle: true,
    },
    lastName: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
    'paymentInfo.cardNumber': { 
      isVisible: false,
    },
    'paymentInfo.expirationDate': { 
      isVisible: false,
    },
    'paymentInfo.cardName': { 
      isVisible: false,
    },
    'role': { 
      isVisible: false,
    },
  },
  actions: {
    detailedStats: {
      actionType: 'resource',
      icon: 'fas fa-signal',
      label: 'Resource statistics',
      component: AdminBro.require('../components/detailed-stats'),
      handler: async (request, response, data) => {
        return {true: 'ueas'}
      },
  },
  edit: { isAccessible: canModifyUsers },
  delete: { isAccessible: canModifyUsers },
  new: {
    before: async (request, { currentAdmin }) => {
      request.payload.record = {
        ...request.payload.record,
        ownerId: currentAdmin._id,
      }
      return request
    },
  }
}
}

// 'user-ninja'