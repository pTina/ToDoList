class SearchInfo {
    constructor(){
        const self = this;

        this._KOREA_AREA = KOREA_AREA;
        this.$area1 = $('.area1');
        this.$area2 = $('.area2');
        this.$typeCar = $('.typeCar');
        this.listArea1 = [];

        // 한번만 실행
        this.makeArea1();

        $(".area1").change(function(){
            const val = $(this).find('option:selected').attr('value');
           
            if(val === 'none'){
                self.$area2.html('');
                self.$area2.attr('disabled', '');

            }else{
                self.makeArea2(val);
            }
            
            
        });
    }

    makeArea1(){
        const html = `<option value="{{__val__}}">{{__val__}}</option>`;
        const listHTML = [];
        $.each(this._KOREA_AREA, (idx, val)=>{
            const key = Object.keys(val)[0];
            this.listArea1.push(key);
            listHTML.push(html.replaceAll('{{__val__}}', key));
        })

        this.$area1.append(listHTML.join());
    };

    makeArea2(val){
        this.$area2.html('');
        this.$area2.removeAttr('disabled');

        const AREA1 = val;
        const idx = this.listArea1.findIndex(key => key === AREA1);
        const arr = this._KOREA_AREA[idx][val];

        const html = `<option value="{{__val__}}">{{__val__}}</option>`;
        const listHTML = [];
        
        for(let item of arr){
            listHTML.push(html.replaceAll('{{__val__}}', item));
        }

        this.$area2.append(listHTML.join());
        
    };

}


