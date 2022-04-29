// const { read } = require("fs");

// 드래그 위치 바꾸기
// https://codepen.io/fitri/pen/VbrZQm

class Drag {
    constructor(item) {
        this.item = item;
        this.wrap = $('#listBox');
        this.listItem = this.wrap.find('.listItem');
        this.thisY = this.item.offset().top;
        this.moveState = false;

        this.init();
    }

    init() {
        const $pstState = $('.pstState');

        let FACTOR = 0;

        this.item.on('mousedown', (e) => {
            this.moveState = true;
            FACTOR = (e.pageY - this.thisY);
        })

        this.wrap.on('mousemove', (e) => {
            if (!this.moveState) return false;
            this.item.hasClass('moving') ? '' : this.item.addClass('moving');
            const curY = e.pageY - FACTOR;
            
            const swapItem = $(document.elementFromPoint(e.pageX, e.pageY));
            
           
            if(this.isListItem(swapItem)){
                const swapTop = swapItem.offset().top;
                const swapHeight = Number(swapItem.css('height').split('px')[0]);
                const min = swapTop;
                const max = swapTop+swapHeight;

                setPst(e.pageX, e.pageY, swapTop, swapItem.attr('id'));
                $pstState.attr('data', `top: ${min}, ${min+(swapHeight/2)}, bottom: ${min+(swapHeight/2)}, ${max}`);
                if(e.pageY > min && curY < max){
                    if(e.pageY < min+(swapHeight/2)){
                        swapItem.before(this.item);

                    }else{
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
                
            }
        })
    }

    isListItem(el){
        let result = false;
        if(el.is('.listItem')){
            result = true;
        }else{
            el.parents().is('.listItem')?  result = true : result = false;
        }

        return result;
    }
}

function setPst(x,y,y2,item){
    const $pstX = $('.pstX');
    const $pstY = $('.pstY');
    const $pstItem = $('.pstItem');
    
    $pstX.attr('data', x);
    $pstY.attr('data', y);
    $pstItem.attr('data', `${y2} ${item}`);
   
    
}