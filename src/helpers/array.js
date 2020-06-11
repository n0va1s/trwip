function getSlice (model, query) {
  if (query.initial !== undefined && query.number !== undefined && query.orderBy !== undefined) {
    var field = ''
    var value = ''
    if (query.field !== undefined) {
      field = query.field
    }
    if (query.value !== undefined) {
      value = query.value
    }
    const order = query.orderBy
    var filter = {}
    if (field !== '') {
      if (field === 'maxValue') {
        filter = function (doc) { return doc(field).lt(value) }
      } else {
        filter = function (doc) { return doc(field).match(value) }
      }
    }
    return model.orderBy(order).filter(filter)
  } else {
    return model.orderBy('')
  }
}

export { getSlice }
