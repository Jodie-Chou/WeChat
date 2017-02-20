// pages/Company/Company.js
Page({
  data:{
      disabled:true,
      btnstated:"default",
      mobile:""
  },
  mobileBlur:function(e){
      var content= e.detail.value;
      if (content!=""){
          this.setData({
              disabled:false,
              btnstated:"primary",
              mobile:content
          });
      }else{
          this.setData({
              disabled:true,
              btnstated:"default"
         })
     }
}
})