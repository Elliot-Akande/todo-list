export default function todoItem(title, description, dueDate, priority) {
    let _title = title;
    let _description = description;
    let _dueDate = _formatDate();
    let _priority = priority;

    function _formatDate() {
        const date = new Date(dueDate);
        date.setHours(12, 0, 0, 0);
        return date;
    }

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDueDate = () => _dueDate;
    const getPriority = () => _priority;

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
    }
}