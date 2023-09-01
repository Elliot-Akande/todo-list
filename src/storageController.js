import PubSub from "pubsub-js";
import listController from "./listController";

const storageController = (() => {
    const init = () => {
        if (!localStorage.getItem('data')) {
            _initData();
        } else {
            _populateLists();
        }

        _registerSubscribers();
    }

    const _initData = () => {
        _setData([_getEmptyList('Inbox')]);
    }

    const _populateLists = () => {
        listController.populate(_getData());
    }

    const _getEmptyList = title => {
        return {
            'title': title,
            'items': [],
        }
    }

    const _getData = () => {
        return JSON.parse(localStorage.getItem('data'));
    }

    const _setData = data => {
        localStorage.setItem('data', JSON.stringify(data));
    }

    const _addList = list => {
        const data = _getData();
        data.push(_getEmptyList(list.getTitle()));
        _setData(data);
    }

    const _updateList = index => {
        const data = _getData();
        data[index].title = listController.getList(index).getTitle();
        _setData(data);
    }

    const _deleteList = index => {
        const data = _getData();
        data.splice(index, 1);
        _setData(data);
    }

    const addItem = (list, item) => {
        const data = _getData();

        const index = listController.getListAll().indexOf(list);
        console.log(index);
        data[index].items.push({
            title: item.getTitle(),
            description: item.getDescription(),
            dueDate: item.getDueDate(),
            priority: item.getPriority(),
        });
        
        _setData(data);
    }

    const _registerSubscribers = () => {
        const NEW_LIST = 'new list created';
        const LIST_TITLE_UPDATE = 'list title updated';
        const LIST_DELETED = 'list has been deleted';
        const NEW_ITEM = 'new list item created';

        PubSub.subscribe(NEW_LIST, (msg, list) => _addList(list));
        PubSub.subscribe(LIST_TITLE_UPDATE, (msg, index) => _updateList(index));
        PubSub.subscribe(LIST_DELETED, (msg, index) => _deleteList(index));
    }

    return {
        init,
        addItem,
    };
})();

export default storageController;