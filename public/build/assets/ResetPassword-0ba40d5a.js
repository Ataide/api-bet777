import{W as u,r as h,j as r,a as x,d as j}from"./app-4a25f70e.js";import{G as w}from"./GuestLayout-c61928c9.js";import{B as s}from"./Box-5201a203.js";import{T as o}from"./Typography-5479ea09.js";import{T as i}from"./TextField-b3defe54.js";import{B as g}from"./Button-054ebab2.js";import"./Grid-bc3e8996.js";import"./Menu-b58d19b1.js";function C({token:d,email:l}){const{data:a,setData:n,post:p,processing:f,errors:t,reset:m}=u({token:d,email:l,password:"",password_confirmation:""});h.useEffect(()=>()=>{m("password","password_confirmation")},[]);const c=e=>{e.preventDefault(),p(route("password.store"))};return r.jsxs(w,{children:[r.jsx(x,{title:"Redefinição de Senha"}),r.jsxs(s,{component:"form",id:"form_",onSubmit:c,noValidate:!0,sx:{mt:1,display:"flex",flexDirection:"column"},gap:2,children:[r.jsxs(s,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2,children:[r.jsx(o,{variant:"h3",color:"primary",children:"Redefinir senha"}),r.jsx(o,{variant:"body1",fontWeight:400,children:"Insira sua nova senha"})]}),r.jsxs(s,{children:[r.jsx(o,{variant:"subtitle1",ml:2,fontWeight:700,children:"Senha"}),r.jsx(i,{fullWidth:!0,required:!0,type:"password",id:"password",name:"password",value:a.password,error:!!t.password,helperText:t.password,onChange:e=>n("password",e.target.value),InputLabelProps:{shrink:!1}})]}),r.jsxs(s,{children:[r.jsx(o,{variant:"subtitle1",ml:2,fontWeight:700,children:"Confirme a senha"}),r.jsx(i,{fullWidth:!0,required:!0,type:"password",id:"password_confirmation",name:"password_confirmation",value:a.password_confirmation,error:!!t.password_confirmation,helperText:t.password_confirmation,onChange:e=>n("password_confirmation",e.target.value),InputLabelProps:{shrink:!1}})]}),r.jsx(g,{variant:"contained",type:"submit",disabled:f,sx:{fontWeight:"bold",fontSize:"16px"},children:"Redefinir senha"}),r.jsxs(s,{children:[r.jsx(j,{href:route("login"),children:r.jsx(o,{component:"span",variant:"body1",color:"primary",fontWeight:400,ml:1,children:"Voltar ao login."})}),r.jsx("br",{})]})]})]})}export{C as default};
