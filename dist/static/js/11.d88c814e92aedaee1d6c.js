webpackJsonp([11],{"0LVv":function(t,a,n){"use strict";var e=n("Dd8w"),i=n.n(e),o=n("SJI6");n.n(o);a.a={name:"sellerComplainDetail",data:function(){return{input:"",showOut:"",showIn:"",showImg:"",isShowImg:!1,complainDetailObj:{},tableData:{}}},computed:i()({},Object(o.mapGetters)(["userInfo"])),methods:{lookImg:function(){this.showImg=this.complainDetailObj.picUrls,this.isShowImg=!0},toDo:function(t){var a=this;this.$ajax.post("/api/platform/complain/dealComplain",{complainMessageId:this.$route.query.messageComplainId,dealResultIn:this.showIn,dealStatus:t,dealComment:this.showOut,operateUserId:this.userInfo.operateUserAccountId}).then(function(t){"200"===t.data.code?(a.$message({message:"处理成功！",type:"success"}),a.$router.push({name:"sellerComplain"})):a.$message({message:t.data.message,type:"warning"})}).catch(function(){a.$message.error("处理失败，请重试！")})},getDetail:function(){var t=this;this.$ajax.post("/api/platform/complain/getComplainDetail",{messageComplainId:this.$route.query.messageComplainId}).then(function(a){if("200"===a.data.code){var n=a.data.data;t.complainDetailObj=n,t.showOut=n.dealComment,t.showIn=n.dealResultIn}else t.$message({type:"warning",message:a.data.message})}).catch(function(t){console.log(t)})}},mounted:function(){this.getDetail()}}},"1kS7":function(t,a){a.f=Object.getOwnPropertySymbols},AAsJ:function(t,a,n){var e=n("M6DL");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("rjj0")("4854c177",e,!0)},Dd8w:function(t,a,n){"use strict";a.__esModule=!0;var e=n("woOf"),i=function(t){return t&&t.__esModule?t:{default:t}}(e);a.default=i.default||function(t){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t}},M6DL:function(t,a,n){a=t.exports=n("FZ+f")(!0),a.push([t.i,".sellerComplainDetail[data-v-632b930a]{margin:12px 20px 40px}.sellerComplainDetail .title[data-v-632b930a]{font-size:12px;margin-bottom:14px}.sellerComplainDetail .cont[data-v-632b930a]{padding:20px;background:#fff}.sellerComplainDetail .cont .tab1[data-v-632b930a]{text-align:center}.sellerComplainDetail .cont .tab1 table[data-v-632b930a]{font-size:14px}.sellerComplainDetail .cont .tab1 table th[data-v-632b930a]{width:25%;border:1px solid #ccc;background:#eee;padding-top:12px;padding-bottom:12px;font-weight:500;color:#666}.sellerComplainDetail .cont .tab1 table td[data-v-632b930a]{border:1px solid #ccc;padding-top:12px;padding-bottom:12px}.sellerComplainDetail .cont h6[data-v-632b930a]{font-size:16px;color:#333;margin-top:48px;margin-bottom:24px;font-weight:700}.sellerComplainDetail .cont .pCont[data-v-632b930a]{display:inline-block;margin-left:20px;margin-right:20px;padding:20px;background:#eee}.sellerComplainDetail .cont .pCont p[data-v-632b930a]{line-height:24px;font-size:14px;color:#666}.sellerComplainDetail .cont .imgs[data-v-632b930a]{margin-top:12px;margin-left:20px;margin-right:20px}.sellerComplainDetail .cont .imgs img[data-v-632b930a]{width:80px;height:80px;margin-right:24px}.sellerComplainDetail .cont .inputs[data-v-632b930a]{margin-left:20px;margin-right:20px}.sellerComplainDetail .cont .inputs span[data-v-632b930a]{font-size:14px;color:#333}.sellerComplainDetail .cont .inputs .input[data-v-632b930a]{width:700px;margin-top:8px;margin-bottom:16px}.sellerComplainDetail .cont .submit[data-v-632b930a]{margin:60px 20px 80px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.sellerComplainDetail .cont .submit .btn[data-v-632b930a]{margin-left:150px;margin-right:150px;display:inline-block;width:90px;height:36px;line-height:36px;color:#fff;text-align:center;background:#40b6ff;border-radius:4px;cursor:pointer}.sellerComplainDetail .showImgBox[data-v-632b930a]{position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.6)}.sellerComplainDetail .showImgBox .imgBox[data-v-632b930a]{max-height:800px}.sellerComplainDetail .showImgBox .imgBox[data-v-632b930a],.sellerComplainDetail .showImgBox .imgBox img[data-v-632b930a]{position:absolute;max-width:800px;top:0;right:0;left:0;bottom:0;margin:auto}","",{version:3,sources:["C:/Users/Administrator/Desktop/项目二/platform/src/components/complain/sellerComplain/sellerComplainDetail.vue"],names:[],mappings:"AACA,uCAEE,qBAAkB,CAGnB,AACD,8CACE,eAAgB,AAChB,kBAAoB,CACrB,AACD,6CACE,aAAc,AACd,eAAiB,CAClB,AACD,mDACE,iBAAmB,CACpB,AACD,yDACE,cAAgB,CACjB,AACD,4DACE,UAAW,AACX,sBAAuB,AACvB,gBAAiB,AACjB,iBAAkB,AAClB,oBAAqB,AACrB,gBAAiB,AACjB,UAAY,CACb,AACD,4DACE,sBAAuB,AACvB,iBAAkB,AAClB,mBAAqB,CACtB,AACD,gDACE,eAAgB,AAChB,WAAY,AACZ,gBAAiB,AACjB,mBAAoB,AACpB,eAAkB,CACnB,AACD,oDACE,qBAAsB,AACtB,iBAAkB,AAClB,kBAAmB,AACnB,aAAc,AACd,eAAiB,CAClB,AACD,sDACE,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACb,AACD,mDACE,gBAAiB,AACjB,iBAAkB,AAClB,iBAAmB,CACpB,AACD,uDACE,WAAY,AACZ,YAAa,AACb,iBAAmB,CACpB,AACD,qDACE,iBAAkB,AAClB,iBAAmB,CACpB,AACD,0DACE,eAAgB,AAChB,UAAY,CACb,AACD,4DACE,YAAa,AACb,eAAgB,AAChB,kBAAoB,CACrB,AACD,qDACE,sBAAkB,AAElB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CAGjC,AACD,0DACE,kBAAmB,AACnB,mBAAoB,AACpB,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,WAAY,AACZ,kBAAmB,AACnB,mBAAoB,AACpB,kBAAmB,AACnB,cAAgB,CACjB,AACD,mDACE,eAAgB,AAChB,WAAY,AACZ,YAAa,AACb,MAAO,AACP,OAAQ,AACR,yBAA4B,CAC7B,AACD,2DAGE,gBAAkB,CAMnB,AACD,0HATE,kBAAmB,AACnB,gBAAiB,AAEjB,MAAO,AACP,QAAS,AACT,OAAQ,AACR,SAAU,AACV,WAAa,CAUd",file:"sellerComplainDetail.vue",sourcesContent:["\n.sellerComplainDetail[data-v-632b930a] {\n  margin-top: 12px;\n  margin-left: 20px;\n  margin-right: 20px;\n  margin-bottom: 40px;\n}\n.sellerComplainDetail .title[data-v-632b930a] {\n  font-size: 12px;\n  margin-bottom: 14px;\n}\n.sellerComplainDetail .cont[data-v-632b930a] {\n  padding: 20px;\n  background: #fff;\n}\n.sellerComplainDetail .cont .tab1[data-v-632b930a] {\n  text-align: center;\n}\n.sellerComplainDetail .cont .tab1 table[data-v-632b930a] {\n  font-size: 14px;\n}\n.sellerComplainDetail .cont .tab1 table th[data-v-632b930a] {\n  width: 25%;\n  border: 1px solid #ccc;\n  background: #eee;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  font-weight: 500;\n  color: #666;\n}\n.sellerComplainDetail .cont .tab1 table td[data-v-632b930a] {\n  border: 1px solid #ccc;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n.sellerComplainDetail .cont h6[data-v-632b930a] {\n  font-size: 16px;\n  color: #333;\n  margin-top: 48px;\n  margin-bottom: 24px;\n  font-weight: bold;\n}\n.sellerComplainDetail .cont .pCont[data-v-632b930a] {\n  display: inline-block;\n  margin-left: 20px;\n  margin-right: 20px;\n  padding: 20px;\n  background: #eee;\n}\n.sellerComplainDetail .cont .pCont p[data-v-632b930a] {\n  line-height: 24px;\n  font-size: 14px;\n  color: #666;\n}\n.sellerComplainDetail .cont .imgs[data-v-632b930a] {\n  margin-top: 12px;\n  margin-left: 20px;\n  margin-right: 20px;\n}\n.sellerComplainDetail .cont .imgs img[data-v-632b930a] {\n  width: 80px;\n  height: 80px;\n  margin-right: 24px;\n}\n.sellerComplainDetail .cont .inputs[data-v-632b930a] {\n  margin-left: 20px;\n  margin-right: 20px;\n}\n.sellerComplainDetail .cont .inputs span[data-v-632b930a] {\n  font-size: 14px;\n  color: #333;\n}\n.sellerComplainDetail .cont .inputs .input[data-v-632b930a] {\n  width: 700px;\n  margin-top: 8px;\n  margin-bottom: 16px;\n}\n.sellerComplainDetail .cont .submit[data-v-632b930a] {\n  margin-left: 20px;\n  margin-right: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-top: 60px;\n  margin-bottom: 80px;\n}\n.sellerComplainDetail .cont .submit .btn[data-v-632b930a] {\n  margin-left: 150px;\n  margin-right: 150px;\n  display: inline-block;\n  width: 90px;\n  height: 36px;\n  line-height: 36px;\n  color: #fff;\n  text-align: center;\n  background: #40b6ff;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.sellerComplainDetail .showImgBox[data-v-632b930a] {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: rgba(0,0,0,0.6);\n}\n.sellerComplainDetail .showImgBox .imgBox[data-v-632b930a] {\n  position: absolute;\n  max-width: 800px;\n  max-height: 800px;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  margin: auto;\n}\n.sellerComplainDetail .showImgBox .imgBox img[data-v-632b930a] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  margin: auto;\n  max-width: 800px;\n}"],sourceRoot:""}])},NpIQ:function(t,a){a.f={}.propertyIsEnumerable},R4wc:function(t,a,n){var e=n("kM2E");e(e.S+e.F,"Object",{assign:n("To3L")})},To3L:function(t,a,n){"use strict";var e=n("lktj"),i=n("1kS7"),o=n("NpIQ"),l=n("sB3e"),s=n("MU5D"),A=Object.assign;t.exports=!A||n("S82l")(function(){var t={},a={},n=Symbol(),e="abcdefghijklmnopqrst";return t[n]=7,e.split("").forEach(function(t){a[t]=t}),7!=A({},t)[n]||Object.keys(A({},a)).join("")!=e})?function(t,a){for(var n=l(t),A=arguments.length,p=1,r=i.f,m=o.f;A>p;)for(var c,C=s(arguments[p++]),d=r?e(C).concat(r(C)):e(C),g=d.length,b=0;g>b;)m.call(C,c=d[b++])&&(n[c]=C[c]);return n}:A},V3tA:function(t,a,n){n("R4wc"),t.exports=n("FeBl").Object.assign},"j/Ge":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"sellerComplainDetail"},[n("div",{staticClass:"title"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{name:"sellerComplain"}}},[t._v("投诉处理")]),t._v(" "),n("el-breadcrumb-item",[t._v("处理详情")])],1)],1),t._v(" "),n("div",{staticClass:"cont"},[n("div",{staticClass:"tab1"},[n("table",{staticStyle:{width:"100%"}},[t._m(0),t._v(" "),n("tr",[n("td",[t._v(t._s(t.complainDetailObj.complainInfo))]),t._v(" "),n("td",[t._v(t._s(t.complainDetailObj.chuaqinInfo))]),t._v(" "),n("td",[t._v(t._s(t.complainDetailObj.applyTime))])])])]),t._v(" "),n("h6",[t._v("投诉原因")]),t._v(" "),n("div",{staticClass:"pCont"},[n("p",[t._v(t._s(t.complainDetailObj.complainReason))])]),t._v(" "),n("div",{staticClass:"imgs"},[n("img",{attrs:{src:t.complainDetailObj.picUrls,alt:"投诉截图"},on:{click:t.lookImg}})]),t._v(" "),n("h6",[t._v("投诉备注")]),t._v(" "),n("div",{staticClass:"pCont"},[n("p",[t._v(t._s(t.complainDetailObj.complainComment))])]),t._v(" "),n("h6",[t._v("处理备注")]),t._v(" "),n("ul",{staticClass:"inputs"},[t._m(1),t._v(" "),n("li",{staticClass:"input"},[n("el-input",{attrs:{type:"textarea",rows:2,autosize:{minRows:2,maxRows:6},resize:"both",placeholder:"请输入内容"},model:{value:t.showOut,callback:function(a){t.showOut=a},expression:"showOut"}})],1),t._v(" "),t._m(2),t._v(" "),n("li",{staticClass:"input"},[n("el-input",{attrs:{type:"textarea",rows:2,autosize:{minRows:2,maxRows:6},resize:"both",placeholder:"请输入内容"},model:{value:t.showIn,callback:function(a){t.showIn=a},expression:"showIn"}})],1)]),t._v(" "),n("div",{staticClass:"submit"},[n("span",{staticClass:"btn",on:{click:function(a){t.toDo(1)}}},[t._v("处理中")]),t._v(" "),n("span",{staticClass:"btn",on:{click:function(a){t.toDo(2)}}},[t._v("已处理完成")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowImg,expression:"isShowImg"}],staticClass:"showImgBox",on:{click:function(a){t.isShowImg=!1}}},[n("div",{staticClass:"imgBox"},[n("img",{attrs:{src:t.showImg,alt:"pic"}})])])])])},i=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("tr",[n("th",[t._v("投诉方")]),t._v(" "),n("th",[t._v("被投诉方")]),t._v(" "),n("th",[t._v("投诉时间")])])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("li",[n("span",[t._v("展示给投诉者")])])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("li",[n("span",[t._v("内部备注")])])}],o={render:e,staticRenderFns:i};a.a=o},pZTg:function(t,a,n){"use strict";function e(t){n("AAsJ")}Object.defineProperty(a,"__esModule",{value:!0});var i=n("0LVv"),o=n("j/Ge"),l=n("VU/8"),s=e,A=l(i.a,o.a,!1,s,"data-v-632b930a",null);a.default=A.exports},woOf:function(t,a,n){t.exports={default:n("V3tA"),__esModule:!0}}});
//# sourceMappingURL=11.d88c814e92aedaee1d6c.js.map