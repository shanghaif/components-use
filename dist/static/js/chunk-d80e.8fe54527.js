(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d80e"],{C58t:function(t,e,n){},LxN1:function(t,e,n){"use strict";n.r(e);var i=n("WAOP"),a={name:"Aliplayer",props:{playStyle:{type:String,default:""},aliplayerSdkPath:{type:String,default:"https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"},autoplay:{type:Boolean,default:!1},isLive:{type:Boolean,default:!1},playsinline:{type:Boolean,default:!1},width:{type:String,default:"100%"},height:{type:String,default:"320px"},controlBarVisibility:{type:String,default:"always"},useH5Prism:{type:Boolean,default:!1},useFlashPrism:{type:Boolean,default:!1},vid:{type:String,default:""},playauth:{type:String,default:""},source:{type:String,default:""},cover:{type:String,default:""},format:{type:String,default:"m3u8"},skinLayout:{type:Array,default:function(){return[]}},x5_video_position:{type:String,default:"top"},x5_type:{type:String,default:"h5"},x5_fullscreen:{type:Boolean,default:!1},x5_orientation:{type:Number,default:2},autoPlayDelay:{type:Number,default:0},autoPlayDelayDisplayText:{type:String}},data:function(){return{playerId:"aliplayer_"+Math.random().toString(36).substr(2),scriptTagStatus:0,isReload:!1,instance:null,liveSkin:[{name:"bigPlayButton",align:"blabs",x:30,y:80},{name:"errorDisplay",align:"tlabs",x:0,y:0},{name:"infoDisplay"},{name:"controlBar",align:"blabs",x:0,y:0,children:[{name:"liveDisplay",align:"tlabs",x:15,y:25},{name:"fullScreenButton",align:"tr",x:10,y:25},{name:"volume",align:"tr",x:10,y:25}]}],playSkin:[{name:"bigPlayButton",align:"blabs",x:30,y:80},{name:"controlBar",align:"blabs",x:0,y:0,children:[{name:"progress",align:"tlabs",x:0,y:0},{name:"playButton",align:"tl",x:15,y:26},{name:"nextButton",align:"tl",x:10,y:26},{name:"timeDisplay",align:"tl",x:10,y:24},{name:"fullScreenButton",align:"tr",x:10,y:25},{name:"streamButton",align:"tr",x:10,y:23},{name:"volume",align:"tr",x:10,y:25}]},{name:"fullControlBar",align:"tlabs",x:0,y:0,children:[{name:"fullTitle",align:"tl",x:25,y:6},{name:"fullNormalScreenButton",align:"tr",x:24,y:13},{name:"fullTimeDisplay",align:"tr",x:10,y:12},{name:"fullZoom",align:"cc"}]}]}},created:function(){void 0!==window.Aliplayer?(this.scriptTagStatus=2,this.initAliplayer()):this.insertScriptTag()},mounted:function(){void 0!==window.Aliplayer?(this.scriptTagStatus=2,this.initAliplayer()):this.insertScriptTag()},methods:{insertScriptTag:function(){var t=this,e=document.getElementById("playerScriptTag");null===e&&((e=document.createElement("script")).type="text/javascript",e.src=this.aliplayerSdkPath,e.id="playerScriptTag",document.getElementsByTagName("head")[0].appendChild(e));e.loaded?t.scriptTagStatus++:e.addEventListener("load",function(){t.scriptTagStatus++,e.loaded=!0,t.initAliplayer()}),t.initAliplayer()},initAliplayer:function(){var t=this,e=this;2!==e.scriptTagStatus||null!==e.instance&&!e.reloadPlayer||(e.instance&&e.instance.dispose(),document.querySelector("#"+e.playerId).innerHTML="",e.$nextTick(function(){var n=e.liveSkin;e.isLive||(n=e.playSkin),e.instance=window.Aliplayer({id:e.playerId,autoplay:e.autoplay,isLive:e.isLive,playsinline:e.playsinline,format:e.format,width:e.width,height:e.height,controlBarVisibility:e.controlBarVisibility,useH5Prism:e.useH5Prism,useFlashPrism:e.useFlashPrism,vid:e.vid,playauth:e.playauth,source:e.source,cover:e.cover,skinLayout:n,x5_video_position:e.x5_video_position,x5_type:e.x5_type,x5_fullscreen:e.x5_fullscreen,x5_orientation:e.x5_orientation,autoPlayDelay:e.autoPlayDelay,autoPlayDelayDisplayText:e.autoPlayDelayDisplayText}),e.instance.on("ready",function(){t.$emit("ready",e.instance)}),e.instance.on("play",function(){t.$emit("play",e.instance)}),e.instance.on("pause",function(){t.$emit("pause",e.instance)}),e.instance.on("ended",function(){t.$emit("ended",e.instance)}),e.instance.on("liveStreamStop",function(){t.$emit("liveStreamStop",e.instance)}),e.instance.on("m3u8Retry",function(){t.$emit("m3u8Retry",e.instance)}),e.instance.on("hideBar",function(){t.$emit("hideBar",e.instance)}),e.instance.on("waiting",function(){t.$emit("waiting",e.instance)}),e.instance.on("snapshoted",function(){t.$emit("snapshoted",e.instance)}),e.instance.on("timeupdate",function(){_this2.$emit("timeupdate",e.instance)}),e.instance.on("requestFullScreen",function(){_this2.$emit("requestFullScreen",e.instance)}),e.instance.on("cancelFullScreen",function(){_this2.$emit("cancelFullScreen",e.instance)}),e.instance.on("error",function(){_this2.$emit("error",e.instance)}),e.instance.on("startSeek",function(){_this2.$emit("startSeek",e.instance)}),e.instance.on("completeSeek",function(){_this2.$emit("completeSeek",e.instance)})}))},play:function(){this.instance.play()},pause:function(){this.instance.pause()},replay:function(){this.instance.replay()},seek:function(t){this.instance.seek(t)},getCurrentTime:function(){return this.instance.getCurrentTime()},getDuration:function(){return this.instance.getDuration()},getVolume:function(){return this.instance.getVolume()},setVolume:function(t){this.instance.setVolume(t)},loadByUrl:function(t,e){this.instance.loadByUrl(t,e)},setSpeed:function(t){this.instance.setSpeed(t)},setPlayerSize:function(t,e){this.instance.setPlayerSize(t,e)},reloaduserPlayInfoAndVidRequestMts:function(t,e){this.instance.reloaduserPlayInfoAndVidRequestMts(t,e)},reloadPlayer:function(){this.isReload=!0,this.initAliplayer(),this.isReload=!1}}},l=(n("xOX9"),n("KHd+")),r=Object(l.a)(a,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"prism-player",style:this.playStyle,attrs:{id:this.playerId}})},[],!1,null,null,null);r.options.__file="AliPlayer.vue";var s={components:{"ali-player":r.exports},data:function(){return{url:""}},methods:{play:function(t){console.log(t)},getLivestream:function(){var t=this;Object(i.e)().then(function(e){console.log(e),t.url=e.rtmp})}},computed:{},mounted:function(){this.getLivestream()}},o=(n("M9Uv"),Object(l.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"player"},[n("div",{staticStyle:{float:"left",width:"550px"}},[t._v("\n\t\t直播\n\t\t"),n("ali-player",{attrs:{useFlashPrism:!0,autoplay:!0,isLive:!0,rePlay:!1,showBuffer:!0,showBarTime:"5000",width:"500px",height:"400px",controlBarVisibility:"hover",source:t.url},on:{play:function(e){t.play(e)}}})],1)])},[],!1,null,"528e68ad",null));o.options.__file="nowlive.vue";e.default=o.exports},M9Uv:function(t,e,n){"use strict";var i=n("vUy8");n.n(i).a},WAOP:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"c",function(){return s}),n.d(e,"d",function(){return o}),n.d(e,"a",function(){return u}),n.d(e,"e",function(){return c});var i=n("YEIV"),a=n.n(i),l=n("t3Un");function r(t,e,n){return Object(l.a)({url:"/pump/device/"+t,method:"post",params:{action:e,reportId:n},data:{}})}function s(t,e,n){return Object(l.a)({url:"/pump/report/actual",method:"get",params:{reportId:t,type:e,draw_type:n}})}function o(t,e,n,i){return Object(l.a)({url:"/pump/data/average",method:"put",params:{reportId:t,type:e,start:n,end:i}})}function u(t){return Object(l.a)({url:"/pump/cloud_file",method:"get",params:a()({objectid:t},"objectid",t)})}function c(t,e,n){return Object(l.a)({url:"/pump/livestream",method:"get",params:{app:t,stream:e,endtime:n}})}},vUy8:function(t,e,n){},xOX9:function(t,e,n){"use strict";var i=n("C58t");n.n(i).a}}]);