webpackJsonp([16],{"/vL0":function(e,a,t){"use strict";function l(e){t("SXTm")}Object.defineProperty(a,"__esModule",{value:!0});var n=t("k3WJ"),o=t("33zP"),i=t("VU/8"),s=l,r=i(n.a,o.a,!1,s,"data-v-baf26206",null);a.default=r.exports},"33zP":function(e,a,t){"use strict";var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"sellerComplain"},[t("div",{staticClass:"tab"},[t("div",{staticClass:"inp"},[t("div",{staticClass:"search"},[t("el-input",{attrs:{placeholder:"请输入姓名/手机号"}},[t("el-button",{staticClass:"primary",attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1)]),e._v(" "),t("div",{staticClass:"nav"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"未受理",name:"first"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"处理中",name:"second"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"已处理",name:"third"}})],1)],1),e._v(" "),t("div",{staticClass:"tabCont"},[t("el-table",{attrs:{data:e.tableData}},[t("el-table-column",{attrs:{prop:"sellerPhone",align:"center",label:"商家联系方式"}}),e._v(" "),t("el-table-column",{attrs:{prop:"complainReason",align:"center",label:"投诉原因"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.complainReason,placement:"top"}},[t("span",{staticClass:"overElipes"},[e._v(e._s(a.row.complainReason))])])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"complainCommon",align:"center",label:"投诉备注"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.complainCommon,placement:"top"}},[t("span",{staticClass:"overElipes"},[e._v(e._s(a.row.complainCommon))])])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"dealOptionIn",align:"center",label:"处理意见(对内)"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.dealOptionIn,placement:"top"}},[t("span",{staticClass:"overElipes"},[e._v(e._s(a.row.dealOptionIn))])])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"dealOptionOut",align:"center",label:"处理意见(对外)"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.dealOptionOut,placement:"top"}},[t("span",{staticClass:"overElipes"},[e._v(e._s(a.row.dealOptionOut))])])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"applyTime",align:"center",label:"first"==e.activeName?"申请时间":"second"==e.activeName?"受理时间":"完成时间"}}),e._v(" "),"first"!=e.activeName?t("el-table-column",{attrs:{prop:"operateMember",align:"center",label:"操作人"}}):e._e(),e._v(" "),t("el-table-column",{attrs:{prop:"operate",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.lookDetail(a.row)}}},[e._v(e._s("third"===e.activeName?"查看":"去处理"))])]}}])})],1)],1),e._v(" "),t("div",{staticClass:"pager"},[t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[100,200,300,400],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:400},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},n=[],o={render:l,staticRenderFns:n};a.a=o},Ruxt:function(e,a,t){a=e.exports=t("FZ+f")(!0),a.push([e.i,".sellerComplain[data-v-baf26206]{padding:20px}.sellerComplain .tab[data-v-baf26206]{padding:20px;background:#fff}.sellerComplain .tab .inp[data-v-baf26206]{text-align:right}.sellerComplain .tab .inp .search[data-v-baf26206]{display:inline-block;max-width:300px}.sellerComplain .tab .inp .search .primary[data-v-baf26206]{background:#40b6ff;color:#fff;border-color:#40b6ff;border-top-left-radius:0;border-bottom-left-radius:0;border:1px solid #40b6ff}.sellerComplain .tab .overElipes[data-v-baf26206]{display:inline-block;width:112px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}","",{version:3,sources:["D:/vue-plantform-two/src/components/complain/sellerComplain/sellerComplain.vue"],names:[],mappings:"AACA,iCACE,YAAc,CACf,AACD,sCACE,aAAc,AACd,eAAiB,CAClB,AACD,2CACE,gBAAkB,CACnB,AACD,mDACE,qBAAsB,AACtB,eAAiB,CAClB,AACD,4DACE,mBAAoB,AACpB,WAAY,AACZ,qBAAsB,AACtB,yBAA0B,AAC1B,4BAA6B,AAC7B,wBAA0B,CAC3B,AACD,kDACE,qBAAsB,AACtB,YAAa,AACb,gBAAiB,AACjB,mBAAoB,AACpB,sBAAwB,CACzB",file:"sellerComplain.vue",sourcesContent:["\n.sellerComplain[data-v-baf26206] {\n  padding: 20px;\n}\n.sellerComplain .tab[data-v-baf26206] {\n  padding: 20px;\n  background: #fff;\n}\n.sellerComplain .tab .inp[data-v-baf26206] {\n  text-align: right;\n}\n.sellerComplain .tab .inp .search[data-v-baf26206] {\n  display: inline-block;\n  max-width: 300px;\n}\n.sellerComplain .tab .inp .search .primary[data-v-baf26206] {\n  background: #40b6ff;\n  color: #fff;\n  border-color: #40b6ff;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border: 1px solid #40b6ff;\n}\n.sellerComplain .tab .overElipes[data-v-baf26206] {\n  display: inline-block;\n  width: 112px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}"],sourceRoot:""}])},SXTm:function(e,a,t){var l=t("Ruxt");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);t("rjj0")("5a695edd",l,!0)},k3WJ:function(e,a,t){"use strict";a.a={name:"sellerComplain",data:function(){return{activeName:"first",currentPage:1,tableData:[{sellerPhone:"18655554444",complainReason:"八个字八个字",complainCommon:"八个字八个字",dealOptionIn:"--",dealOptionOut:"--",applyTime:"2017-11-17 19:20:56",operateMember:"疯狂到哈倒萨"}]}},methods:{handleClick:function(e,a){console.log(e,a)},lookDetail:function(e){console.log(e),this.$router.push({name:"sellerComplainDetail"})},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e)}}}}});
//# sourceMappingURL=16.f33eb4da24e8a7ce4cc5.js.map