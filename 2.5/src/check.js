import san from 'san'
let checkbox =  san.defineComponent({
    template: '<div>' + 
            '<label><input type="checkbox" value="errorrik" checked="{= online =}">errorrik</label>'+
            '<label><input type="checkbox" value="otakustay" checked="{= online =}">otakustay</label>'+
            '<label><input type="checkbox" value="firede" checked="{= online =}">firede</label>'+
            '</div>',
    initData: function () {
        return {
            online: []
        };
    },

    attached: function () {
        this.data.set('online', ['errorrik', 'otakustay']);
        console.log(this.data.online)
        console.log("???")
    }
});

new checkbox().attach(document.body);