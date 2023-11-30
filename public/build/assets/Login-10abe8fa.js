import{j as t,c as W,e as $,l as S,_ as d,r as E,u as q,a as G,W as Z,b as Q,d as J,Q as K}from"./app-f8b9ab11.js";import{G as X}from"./GuestLayout-dcf953d5.js";import{a as Y,g as oo,s as m,c as to,b as eo,B as w}from"./Box-7f40d207.js";import{T as C}from"./ButtonBase-321d2179.js";import{T as z}from"./TextField-f2593e54.js";import{c as x,P as so}from"./Menu-59a589f9.js";import{C as ro}from"./Close-24258ab2.js";import{I as lo}from"./IconButton-e88a4fd3.js";import{B as ao}from"./Button-5a8dee08.js";import"./Grid-a93bfbb2.js";function no(o){return oo("MuiAlert",o)}const io=Y("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),B=io,co=x(t.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),po=x(t.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),uo=x(t.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),go=x(t.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),fo=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],mo=o=>{const{variant:s,color:r,severity:l,classes:e}=o,i={root:["root",`${s}${W(r||l)}`,`${s}`],icon:["icon"],message:["message"],action:["action"]};return eo(i,no,e)},xo=m(so,{name:"MuiAlert",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:r}=o;return[s.root,s[r.variant],s[`${r.variant}${W(r.color||r.severity)}`]]}})(({theme:o,ownerState:s})=>{const r=o.palette.mode==="light"?$:S,l=o.palette.mode==="light"?S:$,e=s.color||s.severity;return d({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},e&&s.variant==="standard"&&{color:o.vars?o.vars.palette.Alert[`${e}Color`]:r(o.palette[e].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${e}StandardBg`]:l(o.palette[e].light,.9),[`& .${B.icon}`]:o.vars?{color:o.vars.palette.Alert[`${e}IconColor`]}:{color:o.palette[e].main}},e&&s.variant==="outlined"&&{color:o.vars?o.vars.palette.Alert[`${e}Color`]:r(o.palette[e].light,.6),border:`1px solid ${(o.vars||o).palette[e].light}`,[`& .${B.icon}`]:o.vars?{color:o.vars.palette.Alert[`${e}IconColor`]}:{color:o.palette[e].main}},e&&s.variant==="filled"&&d({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${e}FilledColor`],backgroundColor:o.vars.palette.Alert[`${e}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[e].dark:o.palette[e].main,color:o.palette.getContrastText(o.palette[e].main)}))}),vo=m("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,s)=>s.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Co=m("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,s)=>s.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),P=m("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,s)=>s.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),L={success:t.jsx(co,{fontSize:"inherit"}),warning:t.jsx(po,{fontSize:"inherit"}),error:t.jsx(uo,{fontSize:"inherit"}),info:t.jsx(go,{fontSize:"inherit"})},ho=E.forwardRef(function(s,r){var l,e,i,a,g,f;const n=q({props:s,name:"MuiAlert"}),{action:p,children:R,className:_,closeText:h="Close",color:T,components:A={},componentsProps:j={},icon:y,iconMapping:k=L,onClose:I,role:N="alert",severity:v="success",slotProps:M={},slots:b={},variant:O="standard"}=n,H=G(n,fo),c=d({},n,{color:T,severity:v,variant:O}),u=mo(c),U=(l=(e=b.closeButton)!=null?e:A.CloseButton)!=null?l:lo,D=(i=(a=b.closeIcon)!=null?a:A.CloseIcon)!=null?i:ro,V=(g=M.closeButton)!=null?g:j.closeButton,F=(f=M.closeIcon)!=null?f:j.closeIcon;return t.jsxs(xo,d({role:N,elevation:0,ownerState:c,className:to(u.root,_),ref:r},H,{children:[y!==!1?t.jsx(vo,{ownerState:c,className:u.icon,children:y||k[v]||L[v]}):null,t.jsx(Co,{ownerState:c,className:u.message,children:R}),p!=null?t.jsx(P,{ownerState:c,className:u.action,children:p}):null,p==null&&I?t.jsx(P,{ownerState:c,className:u.action,children:t.jsx(U,d({size:"small","aria-label":h,title:h,color:"inherit",onClick:I},V,{children:t.jsx(D,d({fontSize:"small"},F))}))}):null]}))}),Ao=ho;function Po({status:o,canResetPassword:s}){const{data:r,setData:l,post:e,processing:i,errors:a,reset:g}=Z({email:"",password:"",status:"",remember:!1});E.useEffect(()=>()=>{g("password")},[]);const f=n=>{n.preventDefault(),e(route("login"),{onError:p=>{K.error(p.message)}})};return t.jsxs(X,{children:[t.jsx(Q,{title:"Entrar"}),t.jsxs(w,{component:"form",id:"form_",onSubmit:f,noValidate:!0,sx:{maxWidth:"375px",mt:1,display:"flex",flexDirection:"column"},gap:1,children:[t.jsxs(w,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[t.jsx(C,{variant:"h3",color:"primary",children:"Entre na sua conta"}),t.jsxs(C,{variant:"body1",fontWeight:400,children:["Não tem conta?",t.jsx(J,{href:route("register"),children:t.jsx(C,{component:"span",variant:"body1",color:"primary",fontWeight:400,ml:1,children:"cadastre-se"})})]})]}),t.jsx(z,{fullWidth:!0,required:!0,id:"email",label:"Usuário/E-mail",name:"email",value:r.email,error:!!a.email,helperText:a.email,onChange:n=>l("email",n.target.value)}),t.jsx(z,{fullWidth:!0,required:!0,type:"password",id:"password",label:"Senha",name:"password",value:r.password,error:!!a.password,helperText:a.password,onChange:n=>l("password",n.target.value)}),a.status&&t.jsx(Ao,{severity:"warning",children:a.status}),t.jsx(ao,{variant:"contained",type:"submit",disabled:i,sx:{width:165,margin:"0 auto",fontWeight:"bold",fontSize:"16px"},children:"Entrar"})]})]})}export{Po as default};