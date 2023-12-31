import PubSub from "pubsub-js";
import listController from "./listController";

const projectModal = (data) => {
    const contentDiv = document.querySelector('.content');

    const render = () => {
        //  Container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        contentDiv.appendChild(modalContainer);

        //  Modal
        const modal = document.createElement('div');
        modal.classList.add('modal', 'new-project');
        modalContainer.appendChild(modal);

        //  Header
        const header = document.createElement('div');
        header.textContent = 'New Project';
        header.classList.add('modal-header');
        modal.appendChild(header);

        //  Form
        const form = document.createElement('form');
        modal.appendChild(form);

        //  Input
        const input = document.createElement('input');
        input.id = 'project-title';
        input.placeholder = 'Project Title';
        input.required = true;
        input.maxLength = 20;
        if (data) input.value = data.getTitle();
        form.appendChild(input);

        //  Buttons 
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('modal-controls');
        form.appendChild(buttonsDiv);

        //  Cancel button
        const cancel = document.createElement('button');
        cancel.textContent = 'Cancel';
        cancel.type = 'button';
        cancel.classList.add('modal-cancel');
        buttonsDiv.appendChild(cancel);

        //  Confirm button
        const confirm = document.createElement('button');
        confirm.textContent = data ? 'Save' : 'Add Project';
        confirm.type = 'submit';
        confirm.classList.add('modal-confirm');
        buttonsDiv.appendChild(confirm);

        _registerEventListeners();
    }

    const _closeModal = () => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.remove();
    }

    const _confirmModal = (e) => {
        e.preventDefault();
        const title = document.querySelector('#project-title').value;

        if (!data) {
            const RQST_NEW_LIST = 'request to create new list';
            PubSub.publish(RQST_NEW_LIST, title);
        } else {
            const LIST_TITLE_UPDATE = 'list title updated';
            data.setTitle(title);
            PubSub.publish(LIST_TITLE_UPDATE, listController.getListAll().indexOf(data));
        }

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
};

export default projectModal;