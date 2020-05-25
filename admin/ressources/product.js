const { sort, timestamps } = require('./sort')
const canModifyProducts = ({ currentAdmin, record }) => {
  return currentAdmin && (
    currentAdmin.role === 'admin'
    || currentAdmin._id === record.param('addedBy')
  )
}
module.exports = {
  name: 'Encheres',
  sort: sort,
  properties: {
    ...timestamps,
    description: {
      type: 'richtext'
    },
    addedBy:  { isVisible: { edit: true, show: true, list: true, filter: true } },
    _id: {
      isVisible: false,
    },
    price: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
  },
  actions: {
    edit: { isAccessible: canModifyProducts },
    delete: { isAccessible: canModifyProducts },
    new: {
      before: async (request, { currentAdmin }) => {
        request.payload.record = {
          ...request.payload.record,
          addedBy: currentAdmin.nickName,
        }
        return request
      },
    }
  },
}
