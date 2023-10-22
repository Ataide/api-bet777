import{j as e,W as f,r as h,a as x,d as c}from"./app-92eb4320.js";import{G as _}from"./GuestLayout-deb19a1b.js";import{r as v,i as g}from"./createSvgIcon-437b8070.js";import{B as j}from"./Box-1a300698.js";import{T as t}from"./Typography-2d8b60df.js";import{T as s}from"./TextField-f386aac0.js";import{I as b}from"./InputAdornment-fd735429.js";import{B as w}from"./Button-76807396.js";import"./Grid-c152af84.js";import"./Menu-a50db4c0.js";var i={},y=g;Object.defineProperty(i,"__esModule",{value:!0});var l=i.default=void 0,C=y(v()),q=e,T=(0,C.default)((0,q.jsx)("path",{d:"m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"}),"East");l=i.default=T;function z(){const{data:o,setData:n,post:u,processing:d,errors:a,reset:m}=f({first_name:"",last_name:"",birthday:"",phone:"",user_name:"",email:"",password:"",password_confirmation:""});h.useEffect(()=>()=>{m("password","password_confirmation")},[]);const p=r=>{r.preventDefault(),u(route("register"))};return e.jsxs(_,{children:[e.jsx(x,{title:"Cadastro"}),e.jsxs(j,{component:"form",onSubmit:p,noValidate:!0,sx:{mt:1,display:"flex",flexDirection:"column"},gap:1,children:[e.jsx(t,{variant:"body1",children:"Informação Pessoal"}),e.jsx(s,{fullWidth:!0,required:!0,id:"first_name",label:"Primeiro Nome",name:"first_name",value:o.first_name,error:!!a.first_name,helperText:a.first_name,onChange:r=>n("first_name",r.target.value)}),e.jsx(s,{fullWidth:!0,required:!0,id:"last_name",label:"Sobrenome",name:"last_name",value:o.last_name,error:!!a.last_name,helperText:a.last_name,onChange:r=>n("last_name",r.target.value)}),e.jsx(t,{variant:"body1",children:"Data de Nascimento"}),e.jsx(t,{variant:"body1",children:"Informações para Contato"}),e.jsx(s,{fullWidth:!0,required:!0,id:"email",label:"E-mail",name:"email",value:o.email,error:!!a.email,helperText:a.email,onChange:r=>n("email",r.target.value)}),e.jsx(t,{variant:"body1",children:"Número de telefone"}),e.jsx(s,{fullWidth:!0,required:!0,InputProps:{startAdornment:e.jsx(b,{position:"start",children:e.jsx(t,{variant:"body1",fontWeight:400,children:"+55"})})},id:"phone",label:"Celular",name:"phone",value:o.phone,error:!!a.phone,helperText:a.phone,onChange:r=>n("phone",r.target.value)}),e.jsx(t,{variant:"body1",children:"Cria login"}),e.jsx(s,{fullWidth:!0,required:!0,id:"user_name",label:"Usuário",name:"user_name",value:o.user_name,error:!!a.user_name,helperText:a.user_name,onChange:r=>n("user_name",r.target.value)}),e.jsx(s,{fullWidth:!0,required:!0,type:"password",id:"password",label:"Senha",name:"password",value:o.password,error:!!a.password,helperText:a.password,onChange:r=>n("password",r.target.value)}),e.jsx(s,{fullWidth:!0,required:!0,type:"password",id:"password_confirmation",label:"Confirmar senha",name:"password_confirmation",value:o.password_confirmation,error:!!a.password_confirmation,helperText:a.password_confirmation,onChange:r=>n("password_confirmation",r.target.value)}),e.jsx(w,{variant:"contained",type:"submit",disabled:d,endIcon:e.jsx(l,{}),sx:{width:316,margin:"0 auto",fontWeight:"bold",fontSize:"16px"},children:"Continuar"}),e.jsxs(t,{variant:"body1",textAlign:"center",children:["Já possui uma conta?",e.jsx(c,{href:route("login"),children:e.jsx(t,{component:"span",variant:"body1",color:"primary",ml:1,children:"Faça login aqui"})})]})]})]})}export{z as default};
