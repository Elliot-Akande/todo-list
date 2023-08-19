import PubSub from "pubsub-js";
import todoList from "./todoList";

const listController = (() => {
    const lists = [];

    const newList = (title) => {
        const list = todoList(title)
        lists.push(list);

        const NEW_LIST = 'new list created';
        PubSub.publish(NEW_LIST, list);
    }

    const removeList = (index) => lists.splice(index, 1);

    const getList = (index) => lists[index];

    const getListAll = () => lists;

    //  For dev purposes only
    const log = () => {
        const data = [];
        lists.forEach(list => {
            const title = list.getTitle()
            const numItems = list.getItems().length;
            data.push({ title, numItems })
        });

        console.table(data);
    }

    const _registerSubscribers = () => {
        const RQST_NEW_LIST = 'request to create new list';

        PubSub.subscribe(RQST_NEW_LIST, (msg, data) => newList(data));
    }

    _registerSubscribers();

    return {
        newList,
        removeList,
        getList,
        getListAll,
        log,
    }
})();

export default listController;