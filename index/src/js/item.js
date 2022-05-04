import { Drag } from './drag.js?x';
import { firebase } from './firebase.js';
import  { listItem } from './listItem.js';

const remove = firebase.remove;
const update = firebase.update;
const ref = firebase.ref;

// 데이터 삭제
function removeItemData(id) {
    const db = firebase.getDatabase();
    remove(ref(db, `items/${id}`));
}
    
// 상태변화
function chageItemData(id, obj) {
    const db = firebase.getDatabase();
    update(ref(db, `items/${id}`), obj);
}

class Item {
    constructor(input, id){
        this.inputVal = input;
        this._check = false;
        this._mark = false;
        this._id = id;
        // this._wrap = null;
        this._idx = 0;
        this._html = `
            <div class="listItem bxShadow" id="${this._id}">
                <div class="check pointer">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="content">
                    <div class="todo NanumPS">${this.inputVal}</div>
                    <div class="mark pointer">
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
                <button type="button" class="btnClose pointer">
                    <i class="fa-regular fa-x"></i>
                </button>
            </div>
        `;
    }

    get id(){
        return this._id;
    }

    get html(){ 
        return  this._html;
    }

    set html(value){
        return this._html = value;
    }

    get check(){
        return this._check;
    }

    set check(value){
        this._check = value;
    }

    get mark(){
        return this._mark;
    }

    set mark(value){
        this._mark = value;
    }

    get idx(){
        return this._idx;
    }

    set idx(value){
        this._idx = value;
    }

    // get wrap(){
    //     return this._wrap;
    // }

    // set wrap(value){
    //     this._wrap = value;
    // }

    // initItem(wrap, re){
    initItem (re){
        const _self = this;
        const $wrap = $(`#${this.id}`);
        this.idx = $(`#${this.id}`).index();

        if($wrap === undefined){
            console.log(`$wrap: ${$wrap}}이 없어요.`);
            return false;
        };

        // drag
        const drag = new Drag(this);
        if(!re){
            listItem.addListItem(this);
        }

        const $check = $wrap.find('.check');
        const $mark = $wrap.find('.mark');
        const $btnClose = $wrap.find('.btnClose');
        // let thisCurIdx = $wrap.index();

        $check.on('click', function(){
            $(this).toggleClass('on');
            if($(this).hasClass('on')){
                _self.check = true;
            }else{
                _self.check = false;
            }

            try{
                chageItemData(_self._id, {'_check': _self.check});
                // console.log('_check 상태 변화 완료');

            }catch(e){
                console.error(e);
                console.log('STATE CHECK ERROR:(');
            }

            
        })

        $mark.on('click', function(){
            $(this).toggleClass('on');
            const $icon = $(this).find('i');

            if($(this).hasClass('on')){
                $icon.removeClass('fa-regular').addClass('fa-solid');
                _self.mark = true;

            }else{
                $icon.removeClass('fa-solid').addClass('fa-regular');
                _self.mark = false;
            }

            try{
                chageItemData(_self._id, {'_mark': _self.mark});
                // console.log('_mark 상태 변화 완료:)');

            }catch(e){
                console.error(e);
                console.log('_mark ERROR:(');
            }

            
        })

        $btnClose.on('click', () => {
            // LISTITEM.removeListItem(this.id);
            // const idx = self.listItem.findIndex(i => i.id === this.id);
            // self.listItem.splice(idx,1);
            
            try{
                removeItemData(this.id);
                listItem.removeListItem(this.id);
                $wrap.remove();
                // console.log('삭제 완료:)');

            }catch(e){
                console.error(e);
                console.log('삭제 ERROR:(');
            }
            
        })

        $wrap.find('.check, .mark').on('click', () => {
            // console.log(`id: ${_self.id}, 완료: ${_self.check}, 즐찾: ${_self.mark}`);
            this.html = $wrap[0].outerHTML;
            try{
                chageItemData(_self._id, {'_html': $wrap[0].outerHTML});
                // console.log('_html 상태 변화 완료:)');

            }catch(e){
                console.error(e);
                console.log('_html ERROR:(');
            }
        })

    }
};

export {chageItemData, Item};