const fs = require('fs')
const Login = function(req,res){
    req.on('data',(data)=>{
        // 获取接口参数
        let param = JSON.parse(data);
        // 读取用户信息 同步读取--防止注册后不能立即获取到最新数据
        fs.readFile(require.resolve('./data/login.json'),{encoding:'utf8'},(err,file)=>{
            // 用户数据
            let usersData = JSON.parse(file)
            // 筛选结果
            let filter = usersData.filter(el=>el.account===param.account&&el.password===param.password)
            if(filter.length>0){
                res.end(JSON.stringify({
                    msg:"登录成功",
                    status:'success',
                    data:{
                        id:filter[0].id,
                        name:filter[0].name,
                        avatar:filter[0].avatar
                    }
                }))
            }else{
                res.end(JSON.stringify({
                    msg:"账号或密码错误",
                    status:'error'
                }))
            }
        })
        
        
    })
    
}
module.exports=Login