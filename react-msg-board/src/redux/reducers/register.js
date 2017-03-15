import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/register'
import initState from 'STORE/initState'

export default createReducer(initState.registerData, ACTION_HANDLERS)
