export default function todoItem(title, description, dueDate, priority) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _complete = false;

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;
    const isComplete = () => _complete;

    const toggleComplete = () => _complete = !_complete;

    //  For development only
    const log = () => {
        return {_title, _description, _dueDate, _priority, _complete};
    }

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        isComplete,
        toggleComplete,
        log,
    }
}