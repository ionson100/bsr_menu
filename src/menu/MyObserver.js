export class ObserverItem {
    // eslint-disable-next-line no-unused-vars
    constructor({id, element, idRoot, behavior, elementMenu, name}) {
        this.id = id;
        this.element = element;
        this.idRoot = idRoot ?? "superRoot"
        this.elementMenu = elementMenu;
        this.name = name;


    }
}

export class MyObserver {
    constructor(selectColor) {
        this.selectColor = selectColor
        this.root = undefined;
        this.listItem = []
        this.lastActionMoveId = undefined;
        this.lastActionAddId = undefined;
    }

    Add(observerItem) {
        if (this.lastActionAddId !== observerItem.id) {
            this._innerAdd(observerItem);
            this.lastActionAddId = observerItem.id;
        }
    }

    _innerAdd(observerItem) {
        if (this._hasList(observerItem) === false) {
            this.listItem.push(observerItem)
            if (observerItem.idRoot === "superRoot") {
                this.root = observerItem.id;
            }
            observerItem.elementMenu.style.background = this.selectColor
        }
    }

    _innerValue(o) {
        o.element.style.visibility = 'hidden';
        o.elementMenu.style.background = '';
    }

    ClickSelect(id, funClick) {
        this.listItem.forEach(a => {
            this._innerValue(a)
        })
        this._innerClearState()
        if (funClick) {
            funClick(id)
        }
    }

    _innerClearState() {
        this.listItem.length = 0;
        this.lastActionMoveId = undefined;
        this.lastActionAddId = undefined;
    }

    _hasList(item) {
        let res = false;
        this.listItem.forEach(a => {
            if (a.id === item.id) {
                res = true;
            }
        })
        return res;
    }
    MoveMenu(observerItem) {

        if (this.lastActionMoveId === observerItem.id) return;
        const tempListRoot = [];
        let b = false;
        this.listItem.forEach((a) => {
            if (b === false) {
                if (a.idRoot !== observerItem.idRoot) {
                    tempListRoot.push(a)
                } else {
                    b = true;
                }
            }
        })

        this.listItem.forEach(a => {
            this._innerValue(a)
        })

        this._innerClearState()
        tempListRoot.forEach(e => {
            this._innerAdd(e);
        })
        this.lastActionMoveId = observerItem.id;

    }
    clearClick(){
        this.listItem.forEach(a => {
            this._innerValue(a)
        })

        this._innerClearState()
    }
}
const  h=new MyObserver()
export  function MyHubCore(){
    return h;
}



