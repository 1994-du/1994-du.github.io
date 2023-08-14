const { log } = require('console');
const fs = require('fs')
var usersData = JSON.parse(fs.readFileSync(require.resolve('./data/login.json'),{encoding:'utf8'}));//所有用户列表
const Registry = function(req,res){
    req.on('data',(data)=>{
        let param = JSON.parse(data);
        console.log('参数',param);
        let filter = usersData.filter(el=>el.account===param.account)
        console.log('筛选结果',filter);
        if(filter.length>0){
            res.end(JSON.stringify({
                msg:"账号已存在！",
                status:'error'
            }))
        }else{
            usersData.push({
                id:(Math.random()+new Date().getTime()).toString(36).slice(0,8),
                account:param.account,
                name:param.username,
                password:param.password,
                avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            })
            fs.writeFile(require.resolve('./data/login.json'),JSON.stringify(usersData),{encoding:'utf8'},(err)=>{
                console.log('写入报错',err);
                if(err){
                    res.end(JSON.stringify({
                        msg:err,
                        status:'error'
                    }))
                }else{
                    res.end(JSON.stringify({
                        msg:"注册成功！",
                        status:'success'
                    }))
                }
            })
            
        }
        
    })
}
module.exports=Registry