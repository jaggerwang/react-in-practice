const initialState = {
  version: process.env.version,
}

export default (state = initialState, action = {}) => {
  const { type } = action

  switch (type) {
    default:
      return state
  }
}