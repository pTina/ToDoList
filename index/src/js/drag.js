// const { read } = require("fs");

// 드래그 위치 바꾸기
// https://codepen.io/fitri/pen/VbrZQm

// 좌표 구할 때 Math.floor 사용한 이유
// => 소숫점으로 계산될 때가 있어서  이용하여 소숫점 버림

// .pageX, .pageY
// => 전체 문서를 기준으로 한 좌표

// elementFromPoint(x, y)
// (x, y) 좌표에 있는 엘르먼트 리턴

// try-catch
// => 예외 처리

// import { GetDatabase, Ref, Update } from './firebase.js';
import { firebase } from './firebase.js';
import  { listItem } from './listItem.js';

const update = firebase.update;
const ref = firebase.ref;

function writeNewPost(arr) {
    const db = firebase.getDatabase();

    $.each(arr, (key, value)=>{
        update(ref(db, `items/${value._id}`), {
            _idx: value._idx
        });
    })
}

function getData(wrap){
    let arr= [];
    wrap.find('.listItem').each(function(){
        const info = {
            _id: $(this).attr("id"),
            _idx: $(this).index()
        };

        arr.push(info);
    })

    writeNewPost(arr);
}


export class Drag {
    constructor(obj) {
        this.object = obj;
        this.item = $(`#${this.object.id}`);
        this.wrap = $('#listBox');
        this.listItem = this.wrap.find('.listItem');
        this.thisY = Math.floor(this.item.offset().top);
        this.moveState = false;

        this.init();
    }

    init() {
        const $pstState = $('.pstState');

        let FACTOR = 0;

        this.item.on('mousedown', (e) => {
            this.moveState = true;
            FACTOR = (Math.floor(e.pageY) - this.thisY);
        })

        this.wrap.on('mousemove', (e) => {
            if (!this.moveState) return false;

            const mouseY = Math.floor(e.pageY);
            this.item.hasClass('moving') ? '' : this.item.addClass('moving');
            // const curY = mouseY - FACTOR;

            const swapItem = $(document.elementFromPoint(e.pageX, e.pageY));


            if (this.isListItem(swapItem)) {
                const swapTop = Math.floor(swapItem.offset().top);
                const swapHeight = Number(swapItem.css('height').split('px')[0]);
                const min = swapTop;
                const max = swapTop + swapHeight;

                setPst(e.pageX, mouseY, swapTop, swapItem.attr('id'));
                $pstState.attr('data', `top: ${min}, ${min + (swapHeight / 2)}, bottom: ${min + (swapHeight / 2)}, ${max}`);
                if (mouseY > min && mouseY < max) {
                    if (mouseY < (min + (swapHeight / 2))) {
                        swapItem.before(this.item);

                    } else if (mouseY > (min + (swapHeight / 2))) {
                        swapItem.after(this.item);
                    }

                    // else if(e.pageY > min+(swapHeight/2) && e.pageY < max){
                    //     swapItem.after(this.item);
                    // }
                }
            }

        })

        this.wrap.on('mouseup mouseleave', (e) => {
            if (this.moveState) {
                this.moveState = false;
                // this.item.offset({ top: this.thisY });
                this.item.removeClass('moving');
                
                // 위치가 바뀌었다면
                if (this.object.idx !== this.item.index()) {
                    try {
                        this.object.idx = this.item.index();
                        getData(this.wrap);
                        listItem.updateListItem();
                        /*console.log('업데이트 완료:)');*/ 
    
                    } catch (e) {
                        console.error(e);
                        console.log('업데이트 ERROR:(');
                    }
                }
            }
        })
    }

    isListItem(el) {
        let result = false;
        if (el.is('.listItem')) {
            result = true;
        } else {
            el.parents().is('.listItem') ? result = true : result = false;
        }

        return result;
    }
}

function setPst(x, y, y2, item) {
    const $pstX = $('.pstX');
    const $pstY = $('.pstY');
    const $pstItem = $('.pstItem');

    $pstX.attr('data', x);
    $pstY.attr('data', y);
    $pstItem.attr('data', `${y2} ${item}`);
}

