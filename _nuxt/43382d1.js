(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{409:function(e,t,l){"use strict";l.r(t);l(14),l(85);var n={name:"CForm",props:{inputKey:{type:String,default:""},value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"},placeholder:{type:String,default:""},required:{type:Boolean,default:!1},description:{type:String,default:""}},data:function(){return{}},computed:{tempValue:{set:function(e){this.$emit("input",e)},get:function(){return this.value}},defaultPlaceholder:function(){return""===this.placeholder?"輸入".concat(this.label):this.placeholder}}},r=l(96),component=Object(r.a)(n,(function(){var e=this,t=e._self._c;return t("b-form-group",{attrs:{id:e.inputKey,label:e.label,"label-for":e.inputKey,description:e.description}},[t("b-form-input",{attrs:{id:e.inputKey,type:e.type,placeholder:e.defaultPlaceholder,required:e.required},model:{value:e.tempValue,callback:function(t){e.tempValue=t},expression:"tempValue"}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);