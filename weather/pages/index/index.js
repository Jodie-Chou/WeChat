Page({
    data:{
      city:"",
      today:{},
      future:{}
    },
    onLoad:function(){
      this.loadInfo();
    },
    //获取地理位置函数
    loadInfo:function(){
       var page=this;
       wx.getLocation({
         type:"wgs84",
         success:function(res){
           //获取纬度及经度
            var lat=res.latitude;
            var long=res.longitude;
            page.loadCity(lat,long);
         }
       });
    },//通过经纬度获取城市信息
    loadCity:function(lat,long){
      var page=this;
      wx.request({                  
        url:"http://api.map.baidu.com/geocoder/v2/",
        data:{
          ak:"btsVVWf0TM1zUBEbzFz6QqWF",
          location:lat+","+long,
          output:'json'
        },
        method:"GET",
        header:{"Content-Type":"application/json"},
        success:function(res){
          var city=res.data.result.addressComponent.city;
          city=city.replace("市","");
          page.setData({city:city});
          page.loadWeather(city);
        }
      })
    },
    loadWeather:function(city){
      var page=this;
      // console.log(city);
      wx.request({
        url:"http://wthrcdn.etouch.cn/weather_mini",
        data:{city:city},
        method:"GET",
        success:function(res){
          // console.log(res);
          var url=res.data.data;
          var todays={};
          todays.temp=url.wendu;
          todays.ganmao=url.ganmao;
          todays.aqi=url.aqi;
          todays.yesterday=url.yesterday;
          var future=url.forecast;
          todays.info=future.shift();
          var low=todays.info.low.replace("低温 ","");
          var high=todays.info.high.replace("高温 ","");
          todays.info.low=low;
          todays.info.high=high;
          page.setData({today:todays});
          // console.log(future.l);
         for(var i=0;i<future.length;i++){
            future[i].high=future[i].high.replace("高温 ","");
            future[i].low=future[i].high.replace("高温 ","");
         }
          page.setData({future:future});
          }
      });
    }
})