import {
    FETCH_ITEMS
} from './mutation-types'

const mutations = {
    [FETCH_ITEMS] (state, list) {
        state.items = list
    }
}

export default mutations
