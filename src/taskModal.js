import listController from './listController';

const newTaskModal = (() => {
    const contentDiv = document.querySelector('.content');

    const render = (defaultList) => {
        //  Container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        contentDiv.appendChild(modalContainer);

        //  Modal
        const modal = document.createElement('div');
        modal.classList.add('modal', 'new-project');
        modalContainer.appendChild(modal);

        //  Form 
        const form = document.createElement('form');
        modal.appendChild(form);

        //  Modal main section
        const modalMain = document.createElement('div');
        modalMain.classList.add('modal-main');
        form.appendChild(modalMain);

        //  Task title input
        const taskTitle = document.createElement('input');
        taskTitle.id = 'task-title';
        taskTitle.placeholder = 'Task Name';
        taskTitle.required = true;
        modalMain.appendChild(taskTitle);

        //  Task description input
        const taskDescription = document.createElement('textarea');
        taskDescription.id = 'task-description';
        taskDescription.placeholder = 'Descripition';
        taskDescription.rows = 1;
        modalMain.appendChild(taskDescription);

        //  Selection buttons container
        const selectionContainer = document.createElement('div');
        selectionContainer.classList.add('selection-container');
        modalMain.appendChild(selectionContainer);

        //  Date input
        const date = document.createElement('input');
        date.id = 'due-date';
        date.type = 'date';
        selectionContainer.appendChild(date);

        //  Priority selection
        const priority = document.createElement('select');
        priority.name = 'priority';
        priority.id = 'priority';
        selectionContainer.appendChild(priority);

        //  Priority options
        const high = document.createElement('option');
        high.value = 'high';
        high.textContent = 'High';
        priority.appendChild(high);

        const med = document.createElement('option');
        med.value = 'med';
        med.textContent = 'Medium';
        priority.appendChild(med);

        const low = document.createElement('option');
        low.value = 'low';
        low.textContent = 'Low';
        low.selected = true;
        priority.appendChild(low);

        //  Modal footer section
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        form.appendChild(modalFooter);

        //  Footer left
        const footerLeft = document.createElement('div');
        footerLeft.classList.add('footer-left');
        modalFooter.appendChild(footerLeft);

        //  List selection
        const listSelect = document.createElement('select');
        listSelect.name = 'list';
        listSelect.id = 'list';
        footerLeft.appendChild(listSelect);

        listController.getListAll().forEach(list => {
            const title = list.getTitle();

            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            if (list === defaultList) option.selected = true;

            listSelect.appendChild(option);
        });

        //  Footer right
        const footerRight = document.createElement('div');
        footerRight.classList.add('footer-right');
        modalFooter.appendChild(footerRight);

        //  Cancel button
        const cancel = document.createElement('button');
        cancel.textContent = 'Cancel';
        cancel.type = 'button';
        cancel.classList.add('modal-cancel');
        footerRight.appendChild(cancel);

        //  Add project button
        const confirm = document.createElement('button');
        confirm.textContent = 'Add Project';
        confirm.type = 'submit';
        confirm.classList.add('modal-confirm');
        footerRight.appendChild(confirm);

        _registerEventListeners();
    }

    const _closeModal = () => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.remove();
    }

    const _confirmModal = (e) => {
        e.preventDefault();
        
        const title = document.querySelector('#task-title').value;
        const description = document.querySelector('#task-description').value;
        const dueDate = document.querySelector('#due-date').value;
        const priotity = document.querySelector('#priority').value;

        const listTitle = document.querySelector('#list').value;
        const list = listController.getList(listTitle);

        list.addItem(title, description, dueDate, priotity);
        
        _closeModal();
    }

    const _registerEventListeners = () => {
        const cancelButton = document.querySelector('.modal-cancel');
        cancelButton.addEventListener('click', _closeModal);

        const form = document.querySelector('.modal form');
        form.addEventListener('submit', _confirmModal);
    }

    return {
        render,
    }
})();

export default newTaskModal;