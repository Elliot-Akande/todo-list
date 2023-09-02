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
    const removeList = index => lists.splice(index, 1);
    const getList = index => lists[index];
    const getListAll = () => lists;

    const populate = data => {
        data.forEach(list => {
            const project = todoList(list.title);
            project.populate(list.items);
            lists.push(project);
        });

        const STORAGE_RETRIEVED = 'lists created using data from local storage';
        PubSub.publish(STORAGE_RETRIEVED);
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
        populate,
    }
})();

export default listController;