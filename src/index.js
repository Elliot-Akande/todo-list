import todoList from "./todoList";

const list = todoList('ToDo');

list.addItem(
    'Wash Dishes',
    'Wash all of the dishes including pots and pans',
    '12/11/2023',
    'high'
);

list.addItem(
    'Item before edit',
    'dfasd fsd fsadf ds',
    '15/12/2027',
    'low'
);

list.addItem(
    'asdfasdfsd',
    'sdfsdfasdfasf dfasd fdsaf dfasd fsd fsadf ds',
    '15/12/2023',
    'low'
);


list.editItem(1,
    'After Edit',
    'boggie woogie',
    '27/12/2023',
    'mid'
);

list.log();

//  Create default list


