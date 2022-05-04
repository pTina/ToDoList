class ListItem {
    constructor(){
        this._listItem = [];
    }

    get listItem(){
        return this._listItem;
    }

    addListItem(val){
        this._listItem.push(val);
    }

    removeListItem(id){
        const idx = this.listItem.findIndex(i => i.id === id);
        this._listItem.splice(idx,1);
    }

    sortListItem(){
        this._listItem.sort((a, b) => {
            return a._idx - b._idx;
        });
    }

    updateListItem(){
        const self = this;
        $('#listBox').find('.listItem').each(function(){
            const INDEX = self.listItem.findIndex(i => i.id === $(this).attr('id'));
            self.listItem[INDEX].idx = $(this).index();
        })
    
        this.sortListItem();
    }
}

export const listItem = new ListItem();

// const listItem = [];

// function addListItem(val){
//     listItem.push(val);
//     console.log(listItem);
// }

// function removeListItem(id){
//     const idx = listItem.findIndex(i => i.id === id);
//     listItem.splice(idx,1);
//     console.log(listItem);
// }

// function sortListItem(){
//     listItem.sort((a, b) => {
//         return a._idx - b._idx;
//     });
//     console.log(listItem);
// }

// function updateListItem(){
//     $('#listBox').find('.listItem').each(function(){
//         const INDEX = listItem.findIndex(i => i.id === $(this).attr('id'));
//         listItem[INDEX].idx = $(this).index();
//     })

//     sortListItem();
// }

// function callInitItem(idx){
//     console.log(idx);
//     console.log(listItem[idx]);
//     listItem[idx].initItem('re');
// }

// export { listItem, addListItem, removeListItem, sortListItem, updateListItem, callInitItem };