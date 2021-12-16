const List = require('../models/list.model')
const Item = require('../models/item.model')

const getLists = async (userId) => {
    const lists = await List.findAll({ where: { userId }, include: Item})
    return lists
}

const createLists = async (query) => {
    try {
        const list = await List.create(query)
        return list
    } catch (error) {
        return error
    }
}

const showList = async (id, userId) => {
    try {
        const list = await List.findOne({ where: { id, userId }, include: Item})
        return list
    } catch (error) {
        return error
    }
}

const createItems = async (query, id, userId) => {
    try {
        const list = await List.findOne({ where: { id, userId } })
        console.log(list);
        if (list) {
            for(var i = 0; i < query.length; i++) {
                query[i].listId = id
                await Item.create(query[i])
            }
            return query
        }
    } catch (error) {
        return error
    }
}

const getItems = async (id) => {
    try {
        const items = await Item.findAll({ where: { listId: id } })
        return items
    } catch (error) {
        return error
    }
}

module.exports = { getLists, createLists, showList, createItems, getItems }