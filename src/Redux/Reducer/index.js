import {combineReducers} from 'redux';
import GetData from './GetData'
import DetailData from './DetailData'

const reducers = combineReducers({
    GetData,
    DetailData
})

export default reducers;