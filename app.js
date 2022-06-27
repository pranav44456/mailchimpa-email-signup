const express = require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html");

});
app.post("/",function(req,res)
{
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
     var data={
        members: [
            {
                email_adress: email,
                status:"subscribed",
                merge_field: {
                fname: firstname,
                lname:  lastname,
              
            }
        }
        ]
     };
    
     const jsondata=JSON.stringify(data);
     const url="https://us17.api.mailchimp.com/3.0/lists/ea4192df45";
     const option={
       
        method:"POST",
        auth:"angelal1:049895b4f236613ef1ddc4c30a8ba6bc-us17"
      }
     
         
          
          const request=https.request(url,option,function(response){
            if(response.statusCode==200)
            {
                res.send("successfully sub scribed");
            }
            else{
                res.sendFile(__dirname +"/failure.html");
            }
            response.on("data",function(data){
                console.log(JSON.parse(data));

            })
          })
          request.write(jsondata);
          request.end();

                  });




// 049895b4f236613ef1ddc4c30a8ba6bc-us17 
//ea4192df45.

app.listen(3000,function(){
    console.log("server is running at port 3000");
 });
