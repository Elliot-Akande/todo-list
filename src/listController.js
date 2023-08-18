import todoList from "./todoList";

const listController = (() => {
    const lists = [];

    const newList = (title) => {
        lists.push(todoList(title));
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
            data.push({title, numItems})
        });

        console.table(data);
    }

    return {
        newList,
        removeList,
        getList,
        getListAll,
        log,
    }
})();

export default listController;