// 꽉찬 별: fa-solid
// 보더 별: fa-regular
// const $inputText = $('#inputText');
// const $btnAdd = $('.btnAdd');
// const $listBox = $('#listBox');

// getter, setter
// https://ko.javascript.info/property-accessors#ref-2680
// 모듈 import, export
// https://velog.io/@iamjoo/Cannot-use-import-statement-outside-a-module

// import { GetDatabase, Ref, Set, Remove } from './firebase.js';
import { firebase, GetAuth } from './firebase.js';
import { chageItemData, Item } from './item.js';
import { listItem } from './listItem.js';

const set = firebase.set;
const ref = firebase.ref;
const child = firebase.child;
const get = firebase.get;
const query = firebase.query;
const orderByChild = firebase.orderByChild;
const db = firebase.getDatabase();

// 데이터 쓰기
function writeItemData(obj) {
    const data = { ...obj };
    set(ref(db, `items/${obj.id}`), data);
}

// 데이터 조회
const dbRef = ref(firebase.getDatabase());
// console.log(get(child(dbRef, 'items'), orderByChild('_idx')));
function getItemData(key, value, wrap) {
    const KEY = key;
    const VALUE = value;

    get(child(dbRef, `items`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }

    }).then((result)=>{
        const itemData = Object.entries(result);
        itemData.sort((a,b) => {
            return a[1]._idx - b[1]._idx;
        })

        return itemData;

    }).then((itemData)=>{
        wrap[0].innerHTML = '';

        if(KEY === 'home'){
            itemData.forEach((obj, index)=>{
                wrap.append(obj[1]._html);
                listItem.listItem[index].initItem('re');
            })

        }else{
            itemData.forEach((obj, index)=>{
                if(obj[1][key] === VALUE){
                    wrap.append(obj[1]._html);
                    listItem.listItem[index].initItem('re');
                }
            })
        }
        
    }).catch((e) => {
        console.log('데이터 조회 ERROR:(');
        console.error(e);
    });
}

export function ToDoList(wrap) {
    const self = this;
    this.wrap = wrap;
    this.listBox = wrap.find('#listBox');
    this.btnMenu = wrap.find('#btnMenu');
    this.menu = wrap.find('#menu');
    this.home = wrap.find('#home');
    this.userInput = wrap.find('.userInput');
    this.inputText = self.userInput.find('.inputText');
    this.btnAdd = self.userInput.find('.btnAdd');

    this.count = 0;
    this.data = {
        get listBox() {
            return this._listBox;
        },

        set listBox(value) {
            this._listBox = value;
        }
    }

    this.init = function () {
        self.btnAdd.on('click', function () {
            self.addItem();
        })

        self.inputText.on('keyup', function (e) {
            if (e.keyCode === 13) self.addItem();

        })

        self.btnMenu.on('click', function () {
            self.menu.toggleClass('on');
        })

        self.menu.find('.menuItem').on('click', function () {
            const id = $(this).attr('id');
            if (self.wrap.attr('view') === `page-${id}`) return false;
            self.render(id);
        })

        self.home.on('click', function () {
            const id = $(this).attr('id');
            if (self.wrap.attr('view') === `page-${id}`) return false;
            self.render(id);
        });

    }

    this.render = function (id) {
        self.menu.removeClass('on');
        self.wrap.attr('view', `page-${id}`);
        // self.listBox[0].innerHTML = '';

        if (id === 'bookMark') {
            self.loopItem('_mark', true);

        } else if (id === 'comItem') {
            self.loopItem('_check', true);

        } else if (id === 'inComitem') {
            self.loopItem('_check', false);

        } else if (id === 'home') {
            self.loopItem('home');
        }
    }

    this.loopItem = function (key, value) {
        const _key = key;
        const _value = value;
        getItemData(_key, _value, self.listBox);
        // if (_key === undefined || _value === undefined) {
        //     $.each(self.listItem, (index, item) => {
        //         self.listBox.append(item.html);
        //         item.initItem();
        //         const $item = $(`#${item.id}`);
        //         self.overHeight($item.find('.todo'));
        //     })
        //     return false;
        // }

        

        // $.each(self.listItem, (index, item) => {
        //     if (item[_key] === _value) {
        //         self.listBox.append(item.html);
        //         item.initItem();
        //         const $item = $(`#${item.id}`);
        //         self.overHeight($item.find('.todo'));
        //     }
        // })
    }

    this.overHeight = function (el) {
        const HEIGHT = Number(el.css('height').split('px')[0]);
        if (HEIGHT > 100) {
            el.parents('.listItem').css({
                'height': `${HEIGHT + 40}px`,
                'min-height': `${HEIGHT + 40}px`
            });
        }
    }

    this.elItem = function (id) {
        return self.listBox.find(`#${id}`);
    }

    this.addItem = function () {
        const el = self.inputText;
        if (self.isEmpty(el)) return false;

        self.count++;
        const item = new Item(el.val(), `list-${self.count}`);
        
        // item.initItem(self.elItem(item._id));
        try{
            writeItemData(item);

            el.val('');
            self.listBox.append(item.html);
            item.initItem();
            const $item = $(`#${item.id}`);
            item.idx = $(`#${item.id}`).index();
            chageItemData(item.id, { '_idx': item.idx });
            self.overHeight($item.find('.content'));

            // console.log('추가 완료:)');

        }catch(e){
            console.error(e);
            console.log('추가 ERROR:(');
            
            // console.log(e);
        }

    }

    this.isEmpty = function (el) {
        const str = el.val().trim();

        if (str === '') {
            return true;
        } else {
            return false;
        }
    }

}


// 옵저버 https://baeharam.netlify.app/posts/javascript/intersection-observer
// 파이어베이스 연동 https://spiralmoon.tistory.com/entry/Firebase-%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%97%90-%EC%9B%B9-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0