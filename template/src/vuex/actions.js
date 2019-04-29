import {
    FETCH_ITEMS,
} from './mutation-types'
const fetchItems = ({ commit }) => {
    const list = []
    commit(FETCH_ITEMS, list)
}
export default {
    fetchItems
}
