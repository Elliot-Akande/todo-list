import PubSub from "pubsub-js";
import todoItem from "./todoItem";

export default function todoList(title) {
    const _title = title;
    const _listItems = [];

    const getTitle = () => _title;
    const getItems = () => _listItems;

    const addItem = (title, description, dueDate, priority) => {
        const item = todoItem(title, description, dueDate, priority);
        _listItems.push(item);

        const NEW_ITEM = 'new list item created';
        PubSub.publish(NEW_ITEM, _title);
    };

    // const editItem = (title, newTitle, description, dueDate, priority) => {
    //     const newItem = todoItem(newTitle, description, dueDate, priority);
    //     _listItems[_listItems.indexOf(title)] = newItem;
    // };

    const removeItem = title => {
        const titles = _listItems.map(item => item.getTitle());
        return _listItems.splice(titles.indexOf(title), 1);
    };

    const toggleItemComplete = index => _listItems[index].toggleComplete();

    return {
        getTitle,
        getItems,
        addItem,
        removeItem,
        toggleItemComplete,
    };
}