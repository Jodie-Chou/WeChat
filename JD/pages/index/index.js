//index.js
Page({
  data:{
    disabled:true,
    btnstate:"default",
    account:"",
    pwd:""
  },
  accountinput:function(e){
    var content = e.detail.value;
    if(content !=""){
    this.setData({disabled:false,btnstate:"primary",account:content});
    }else{
    this.setData({disabled:true,btnstate:"default"});
    }
  },
  pwdBlur:function(e){
    var pwd = e.detail.value;
    if(pwd !=""){
    this.setData({pwd:pwd});
    }
  },
  login:function(e){
    var account = this.data.account;
    var pwd = this.data.pwd;
    var user = wx.getStorageSync("user");
    if(user.account==account && user.password== pwd){
        wx.showToast({
          title:"登录成功",
          icon:"success",
          duration:1000,
          success:function(){
            wx.navigateTo({
              url: '../logs/logs'
            })
          }
        });
    }else{
      wx.showToast({
        title:"登录失败",
        icon:"loading",
        duration:1000
      })
    }
  }
});
