// 꽉찬 별: fa-solid
// 보더 별: fa-regular
// const $inputText = $('#inputText');
// const $btnAdd = $('.btnAdd');
// const $listBox = $('#listBox');



const ToDoList = function (wrap) {
    const self = this;
    this.wrap = wrap;
    this.listBox = wrap.find('#listBox');
    this.btnAdd = wrap.find('.btnAdd');

    class Item {
        constructor(input){
            this.inputVal = input;
            this.check = 'false';
            this.mark = 'false';
            this.id = null;
            this.html = this.template;
            this.wrap = null;
        }

        get template(){
            const template = `
            <div class="listItem bxShadow">
                <div class="check pointer">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="content">
                    <div class="todo NanumPS">${this.inputVal}</div>
                    <div class="mark pointer">
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            `;

            return template;
        }

        initItem(wrap){
            if(this.wrap !== null) return false;

            this.wrap = wrap;
            wrap.attr('id', this.id);


        }

    };

    this.listItem = [];
    this.count = 0;

    this.init = function () {
        this.btnAdd.on('click', function(){
            const $userInput = $(this).parent('.userInput');
            const $inputText = $userInput.find('.inputText');

            if(self.isEmpty($inputText)) return false;

            self.addListItem($inputText);
            
        })
    }

    this.addListItem = function (el) {
        const item = new Item(el.val());
        self.listItem.push(item);
        el.val('');
        
        self.appendHTML();
    }

    this.appendHTML = function(){
        const $obj = self.listItem[self.count];
        const html = $obj.html;
        self.listBox.append(html);
        const $el = self.listBox.find('.listItem:last-child');

        self.setObj($obj, $el);
    }

    this.setObj = function(obj, el){
        const id = obj.id;

        if(id === null){
            obj.id = self.count+1;
            obj.initItem(el);
            self.count++;

        }else{
            return false;
        }
    }

    this.isEmpty = function(el){
        const str = el.val().trim();

        if(str === ''){
            return true;
        }else{
            return false;
        }
    }

}