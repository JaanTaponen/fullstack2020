const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.data.msg
    case 'REMOVE':
      return null
    default:
      return state
  }
}


export const set = (msg, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { msg }
    })
    setTimeout(() => {
      dispatch(remove())
    }, timeout * 1000)
  }
}

export const remove = () => {
  return {
    type: 'REMOVE',
    data: null
  }
}

export default reducer