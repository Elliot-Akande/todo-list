export default function todoItem(title, description, dueDate, priority) {
    let _title = title;
    let _description = description;
    let _dueDate = _formatDate(dueDate);
    let _priority = priority;

    function _formatDate(data) {
        if (!data) return 'No Date';

        const date = new Date(data);
        date.setHours(12, 0, 0, 0);
        return date;
    }

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;

    const setTitle = title => _title = title;
    const setDescription = description => _description = description;
    const setDueDate = dueDate => _dueDate = _formatDate(dueDate);
    const setPriority = priority => _priority = priority;

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
    }
}