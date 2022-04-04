// 꽉찬 별: fa-solid
// 보더 별: fa-regular
// const $inputText = $('#inputText');
// const $btnAdd = $('.btnAdd');
// const $listBox = $('#listBox');

// getter, setter
// https://ko.javascript.info/property-accessors#ref-2680


const ToDoList = function (wrap) {
    const self = this;
    this.wrap = wrap;
    this.listBox = wrap.find('#listBox');
    this.btnMenu = wrap.find('#btnMenu');
    this.menu = wrap.find('#menu');
    this.listItem = [];
    this.home = wrap.find('#home');

    this.userInput = wrap.find('.userInput');
    this.inputText = self.userInput.find('.inputText');
    this.btnAdd = self.userInput.find('.btnAdd');

    class Item {
        constructor(input, id){
            this.inputVal = input;
            this._check = false;
            this._mark = false;
            this._id = id;
            this.wrap = null;

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

        initItem(wrap, re){
            const _self = this;
            _self.wrap = wrap;

            if(this.wrap === undefined){
                console.log(`this.wrap: ${_self.wrap}}이 없어요.`);
                return false;
            };

            if(!re) self.listItem.push(this);
            // console.log(self.listItem);
            
            const $check = _self.wrap.find('.check');
            const $mark = _self.wrap.find('.mark');
            const $btnClose = _self.wrap.find('.btnClose');

            $check.on('click', function(){
                $(this).toggleClass('on');
                if($(this).hasClass('on')){
                    _self.check = true;
                }else{
                    _self.check = false;
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
            })

            $btnClose.on('click', function(){
                const idx = self.listItem.findIndex(i => i.id === _self.id);
                self.listItem.splice(idx,1);
                _self.wrap.remove();
                // console.log(self.listItem);
            })

            _self.wrap.find('.check, .mark').on('click', function(){
                // console.log(`id: ${_self.id}, 완료: ${_self.check}, 즐찾: ${_self.mark}`);
                _self.html = _self.wrap[0].outerHTML;
            })

        }
    };

    this.count = 0;
    this.data = {
        get listBox(){
            return this._listBox;
        },

        set listBox(value){
            this._listBox = value;
        }
    }

    this.init = function () {
        self.btnAdd.on('click', function(){
            self.updateItem();
        })

        self.inputText.on('keyup', function(e){
            if(e.keyCode === 13) self.updateItem();
        })

        self.btnMenu.on('click', function(){
            self.menu.toggleClass('on');
        })

        self.menu.find('.menuItem').on('click', function(){
            const id = $(this).attr('id');
            if(self.wrap.attr('view') === `page-${id}`) return false;
            self.render(id);
        })

        self.home.on('click', function(){
            const id = $(this).attr('id');
            if(self.wrap.attr('view') === `page-${id}`) return false;
            self.render(id);
        });

    }

    this.render = function(id){
        self.menu.removeClass('on');
        self.wrap.attr('view',`page-${id}`);
        self.listBox[0].innerHTML = '';

        if(id === 'bookMark'){
            self.loopItem('mark', true);

        }else if(id === 'comItem'){
            self.loopItem('check', true);

        }else if(id === 'inComitem'){
            self.loopItem('check', false);
            
        }else if(id === 'home'){
            self.loopItem();
        }
    }

    this.loopItem= function(key, value){
        const _key = key;
        const _value = value;

        if(_key === undefined || _value === undefined){
            $.each(self.listItem, (index, item) =>{
                self.listBox.append(item.html);
                item.initItem(self.elItem(item.id), 're');
            })
            return false;
        }

        $.each(self.listItem, (index, item) =>{
            if(item[_key].toString() === _value.toString()){
                self.listBox.append(item.html);
                item.initItem(self.elItem(item.id), 're');
            }
        })
        
    }

    this.overHeight = function(el){
        const HEIGHT = Number(el.css('height').split('px')[0]);
        if(HEIGHT > 100){
            el.parents('.listItem').css(`height`,`${HEIGHT+40}px`);
        }
    }

    this.elItem = function(id){
        return self.listBox.find(`#${id}`);
    }

    this.updateItem = function(){
        const el = self.inputText;
        if(self.isEmpty(el)) return false;

        self.count++;
        const item = new Item(el.val(), `list-${self.count}`);
        el.val('');

        self.listBox.append(item.html);
        item.initItem(self.elItem(item._id));

        self.overHeight(item.wrap.find('.content'));
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