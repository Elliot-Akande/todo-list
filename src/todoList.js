import PubSub from "pubsub-js";
import todoItem from "./todoItem";

function todoList(title) {
    let _title = title;
    const _listItems = [];

    const getTitle = () => _title;
    const getItems = () => _listItems;

    const setTitle = title => _title = title;

    const addItem = (title, description, dueDate, priority) => {
        const item = todoItem(title, description, dueDate, priority);
        _listItems.push(item);

        const NEW_ITEM = 'new list item created';
        PubSub.publish(NEW_ITEM, _title);

        return item;
    };

    const removeItem = index => {
        return _listItems.splice(index, 1);
    };

    const toggleItemComplete = index => _listItems[index].toggleComplete();

    return {
        getTitle,
        getItems,
        setTitle,
        addItem,
        removeItem,
        toggleItemComplete,
    };
}

export default todoList;