export default function zip(state = 10000, action) {
  switch (action.type) {

  case 'UPDATE_ZIP':
    return state = action.code;
  default:
    return state;
  }
}
