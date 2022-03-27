// 꽉찬 별: fa-solid
// 보더 별: fa-regular
// const $inputText = $('#inputText');
// const $btnAdd = $('.btnAdd');
// const $listBox = $('#listBox');

class ListItem{
    template = `
    <div class="listItem bxShadow">
        <div class="check pointer">
            <i class="fa-solid fa-check"></i>
        </div>
        <div class="content">
            <div class="todo NanumPS">{{__todo__}}</div>
            <div class="mark pointer">
                <i class="fa-regular fa-star"></i>
            </div>
        </div>
    </div>
    `;

    constructor(wrap){
        this.wrap = wrap;
    }

    render() {
        this.wrap.append(this.template);
    }
}

class Init {
    wrap;
    btnAdd;

    constructor(wrap){
        const self = this;
        this.wrap = wrap;
        this.btnAdd = this.wrap.find('.btnAdd');
        this.btnAdd.on('click', self.addItem);
    }

    addItem(){
        const $userInput = $(this).parent('.userInput')
        const $txt = $userInput.find(".inputText > input");
        const inputText = $txt.val();

        if(inputText === '' ){
            return false;
        }

    }
}