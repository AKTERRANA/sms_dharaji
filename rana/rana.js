module.exports ={
    getRana:(req, res)=>{
        res.status(200).json({ data:[{name:"rana"}, {name:"saju"}]})
    }
}