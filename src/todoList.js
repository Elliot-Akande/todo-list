import todoItem from "./todoItem";

export default function todoList(title) {
    const _title = title;
    const _listItems = [];

    const getTitle = () => _title;
    const getItems = () => _listItems;

    const addItem = (title, description, dueDate, priority) => {
        const item = todoItem(title, description, dueDate, priority);
        _listItems.push(item);

        item.log(); //  For development only
    };

    const editItem = (index, title, description, dueDate, priority) => {
        const newItem = todoItem(title, description, dueDate, priority);
        _listItems[index] = newItem;
    };

    const removeItem = index => _listItems.splice(index, 1);

    const toggleItemComplete = index => _listItems[index].toggleComplete();

    //  For development only
    const log = () => {
        const data = [];
        _listItems.forEach(item => data.push(item.log()));
        console.table(data);
    };

    return {
        getTitle,
        getItems,
        addItem,
        editItem,
        removeItem,
        toggleItemComplete,
        log,
    };
}