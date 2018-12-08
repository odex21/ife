let total = 0,
    hasData = false
const Data = []


export default {

    ininitData(){
        hasData = true;
        for(let i = 0; i < 1000; i++){
            Data.push({
                title: total++,
                date: Date(),
                detail: "什么也没有"
            })
        }
        
    },

    getData(index){
        if(!hasData){
            this.ininitData()
        }
        console.log(index)
        const i = (index < 980) ? index: 0,
            data =  Data.slice(i, i + 20)
        console.log(data)
        return data

    }
}