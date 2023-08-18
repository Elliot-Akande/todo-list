import todoItem from "./todoItem";

const item = todoItem(
    'Wash Dishes', 
    'Wash all of the dishes including pots and pans', 
    '12/11/2023', 
    'high'
);

console.log(item);
console.log(item.getTitle());
console.log(item.setTitle('clean carpet'));
console.log(item.getTitle());
