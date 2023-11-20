import{j as e,c as L,b as S,l as w,_ as d,r as R,u as G,e as Z,W as Q,a as J,d as z,Q as K}from"./app-d474efe3.js";import{G as X}from"./GuestLayout-9a6d4a28.js";import{g as Y,a as oo,s as x,c as eo,b as to,B as C}from"./Box-811b2274.js";import{T as f}from"./Typography-ebeb4145.js";import{T as B}from"./TextField-df7c8f05.js";import{c as v,P as so}from"./Menu-78682ac7.js";import{C as ro}from"./Close-443fd761.js";import{I as ao}from"./IconButton-11024606.js";import{B as no}from"./Button-7fbd7d8a.js";import"./Grid-78a74323.js";function lo(o){return oo("MuiAlert",o)}const io=Y("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),P=io,co=v(e.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),po=v(e.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),uo=v(e.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),mo=v(e.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),go=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],fo=o=>{const{variant:s,color:r,severity:a,classes:t}=o,i={root:["root",`${s}${L(r||a)}`,`${s}`],icon:["icon"],message:["message"],action:["action"]};return to(i,lo,t)},xo=x(so,{name:"MuiAlert",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:r}=o;return[s.root,s[r.variant],s[`${r.variant}${L(r.color||r.severity)}`]]}})(({theme:o,ownerState:s})=>{const r=o.palette.mode==="light"?S:w,a=o.palette.mode==="light"?w:S,t=s.color||s.severity;return d({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},t&&s.variant==="standard"&&{color:o.vars?o.vars.palette.Alert[`${t}Color`]:r(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:a(o.palette[t].light,.9),[`& .${P.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}},t&&s.variant==="outlined"&&{color:o.vars?o.vars.palette.Alert[`${t}Color`]:r(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${P.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}},t&&s.variant==="filled"&&d({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)}))}),vo=x("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,s)=>s.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),ho=x("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,s)=>s.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),W=x("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,s)=>s.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),E={success:e.jsx(co,{fontSize:"inherit"}),warning:e.jsx(po,{fontSize:"inherit"}),error:e.jsx(uo,{fontSize:"inherit"}),info:e.jsx(mo,{fontSize:"inherit"})},Co=R.forwardRef(function(s,r){var a,t,i,n,m,g;const l=G({props:s,name:"MuiAlert"}),{action:p,children:_,className:T,closeText:A="Close",color:k,components:j={},componentsProps:y={},icon:I,iconMapping:N=E,onClose:b,role:O="alert",severity:h="success",slotProps:M={},slots:$={},variant:H="standard"}=l,U=Z(l,go),c=d({},l,{color:k,severity:h,variant:H}),u=fo(c),q=(a=(t=$.closeButton)!=null?t:j.CloseButton)!=null?a:ao,D=(i=(n=$.closeIcon)!=null?n:j.CloseIcon)!=null?i:ro,V=(m=M.closeButton)!=null?m:y.closeButton,F=(g=M.closeIcon)!=null?g:y.closeIcon;return e.jsxs(xo,d({role:O,elevation:0,ownerState:c,className:eo(u.root,T),ref:r},U,{children:[I!==!1?e.jsx(vo,{ownerState:c,className:u.icon,children:I||N[h]||E[h]}):null,e.jsx(ho,{ownerState:c,className:u.message,children:_}),p!=null?e.jsx(W,{ownerState:c,className:u.action,children:p}):null,p==null&&b?e.jsx(W,{ownerState:c,className:u.action,children:e.jsx(q,d({size:"small","aria-label":A,title:A,color:"inherit",onClick:b},V,{children:e.jsx(D,d({fontSize:"small"},F))}))}):null]}))}),Ao=Co;function Po({status:o,canResetPassword:s}){const{data:r,setData:a,post:t,processing:i,errors:n,reset:m}=Q({email:"",password:"",status:"",remember:!1});R.useEffect(()=>()=>{m("password")},[]);const g=l=>{l.preventDefault(),t(route("login"),{onError:p=>{K.error(p.message)}})};return e.jsxs(X,{children:[e.jsx(J,{title:"Entrar"}),e.jsxs(C,{component:"form",id:"form_",onSubmit:g,noValidate:!0,sx:{maxWidth:"375px",mt:1,display:"flex",flexDirection:"column"},gap:1,children:[e.jsxs(C,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[e.jsx(f,{variant:"h3",color:"primary",children:"Entre na sua conta"}),e.jsxs(f,{variant:"body1",fontWeight:400,children:["Não tem conta?",e.jsx(z,{href:route("register"),children:e.jsx(f,{component:"span",variant:"body1",color:"primary",fontWeight:400,ml:1,children:"cadastre-se"})})]})]}),e.jsx(B,{fullWidth:!0,required:!0,id:"email",label:"Usuário/E-mail",name:"email",value:r.email,error:!!n.email,helperText:n.email,onChange:l=>a("email",l.target.value)}),e.jsx(B,{fullWidth:!0,required:!0,type:"password",id:"password",label:"Senha",name:"password",value:r.password,error:!!n.password,helperText:n.password,onChange:l=>a("password",l.target.value)}),e.jsxs(C,{textAlign:"end",children:[e.jsx(z,{href:route("password.request"),children:e.jsx(f,{component:"span",variant:"body1",color:"primary",fontWeight:400,ml:1,children:"Esqueci minha senha"})}),e.jsx("br",{})]}),n.status&&e.jsx(Ao,{severity:"warning",children:n.status}),e.jsx(no,{variant:"contained",type:"submit",disabled:i,sx:{width:165,margin:"0 auto",fontWeight:"bold",fontSize:"16px"},children:"Entrar"})]})]})}export{Po as default};
