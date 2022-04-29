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
        this.wrap = wrap;

        if(this.wrap === undefined){
            console.log(`this.wrap: ${this.wrap}}이 없어요.`);
            return false;
        };

        // drag
        const drag = new Drag(this.wrap);

        // if(!re) self.listItem.push(this);

        const $check = this.wrap.find('.check');
        const $mark = this.wrap.find('.mark');
        const $btnClose = this.wrap.find('.btnClose');
        let thisCurIdx = this.wrap.index();

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

        $btnClose.on('click', () => {
            // const idx = self.listItem.findIndex(i => i.id === this.id);
            // self.listItem.splice(idx,1);
            this.wrap.remove();
            // console.log(self.listItem);
        })

        _self.wrap.find('.check, .mark').on('click', () => {
            // console.log(`id: ${_self.id}, 완료: ${_self.check}, 즐찾: ${_self.mark}`);
            this.html = this.wrap[0].outerHTML;

        })

    }
};