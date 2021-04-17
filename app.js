//1、引入模块
var express=require('express')
//2、创建web服务器
var app=express()
var path=require('path')
var url=require('url')
var moment=require('moment')
var bodyParser = require('body-parser');

// var userAgent = require('user-agent')
//声明使用的模板引擎，访问的html会自动在views目录下寻找
app.engine('.html',require('express-art-template'))
// 可自定义views的路径
// app.set('views', 目录路径)
//2、创建静态资源目录
app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static(path.join(__dirname,'views')))

//3、路由
app.get('/',function (req,res){

  // console.log(typeof (res.header))
  // console.log(res.header("headers").keys())

  var agent=req.headers['user-agent']
  var agent_parse=agent.split(' ')[2]
  console.log(agent_parse)
  // var user_agent=userAgent.parse(req.headers['user-agent'])
  // console.log(user_agent)

  res.render('Home.html')

  // if(agent_parse==='NT')
  // {
  //   res.statusCode=302
  //   // res.setHeader('Location','/Home.html')  //重定向
  //   // res.end()
  //   res.render('Home.html')
  // }
  // else if(agent_parse==='Android')
  // {
  //   // res.statusCode=302
  //   // res.setHeader('Location','/mHome.html')  //重定向
  //   // res.end()
  //   res.render('mHome.html')
  // }
})

var myNotes=[
  // {note:'123！',createTime:'2021-04-17 16:58:30'},
  // {note:'456！',createTime:'2021-04-17 16:58:30'}
  {note:'背英语单词',createTime:'2021-04-17 16:58:30'}
]


app.get('/addNote',function (req,res){
  res.render('addNote.html')
})

app.get('/doAddNote',function (req,res){
  //获取请求发送过来的参数，push进数组
  //1、解析url
  var paramObj=url.parse(req.url,true).query;
  //2、入库：push进入数组
  var createTime=moment().format("YYYY-MM-D h:mm:ss")
  //创建一个新对象
  var newNote={note:paramObj.note,createTime:createTime}
  //入库
  myNotes.push(newNote)
  // console.log(myNotes)

  res.statusCode=302
  res.setHeader('Location','/Home_Body')  //重定向
  // res.render('Home_Body.html',{orders:myNotes})
  res.end()
})

// app.use('./doRemoveNote',function (req,res){
//   //删除数组指定对象
//   var data=req.data()
//   console.log(data)
//   res.statusCode=200
//   res.end()
// })

// app.use(bodyParser.urlencoded({
//   extended:true
// }));

//删除便签
app.get('/doRemoveNote',function (req,res){
  // console.log(url.parse(req.url).query)
  var index=url.parse(req.url).query.split('=')[1]
  index=parseInt(index)
  myNotes.splice(Number(index),1)  //删除数字指定项
  res.render('Home_Body.html')
  // res.render()
  // res.end()
})

app.get('/Home_Body',function (req,res){
  res.render('Home_Body.html',{
    orders:myNotes
  })
})

app.get('/Home_Sidebar',function (req,res){
  res.render('Home_Sidebar.html')
})

app.listen(1025,function (){
  console.log("启动成功，访问：http://localhost:1025\n或http://172.22.61.42:1025")
})