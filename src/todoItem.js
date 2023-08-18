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

    const setTitle = title => _title = title;
    const setDescription = description => _description = description;
    const setDueDate = dueDate => _dueDate = dueDate;
    const setPriority = priority => _priority = priority;

    const toggleComplete = () => _complete = !_complete;

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        isComplete,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        toggleComplete,
    }
}