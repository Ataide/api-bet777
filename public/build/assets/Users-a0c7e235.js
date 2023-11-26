import{q as _,j as e,r as h,y as v,W as K,Q as W,b as V}from"./app-94ff2bf7.js";import{C as z,b as O,L as R,P as X,e as Y,c as q,p as G,a as $,i as ee,f as ae,B as re,d as te}from"./index-0ff7a2e7.js";import{T as s}from"./Typography-f969e485.js";import{P as A}from"./Menu-e18445c6.js";import{B as l}from"./Box-bfd92c26.js";import{T as se,a as le,b as S,C as T,d as ie,D as ne,S as oe}from"./Search-709e47eb.js";import{d as M,D as L,a as N,b as de}from"./ModeEditOutline-dc9b42b0.js";import{T as j}from"./TextField-20cf0c6b.js";import{I as ce}from"./InputAdornment-a01497de.js";import{I as C}from"./IconButton-8b786467.js";import{c as ue}from"./helper-545a7ee1.js";import{D as F,a as B,b as E}from"./DialogContent-a72381c5.js";import{B as g}from"./Button-74c67291.js";import{A as he}from"./AuthenticatedLayout-4304848d.js";import{G as I}from"./Grid-f2c64255.js";import"./Close-f1c77360.js";import"./createSvgIcon-4d4aaaec.js";import"./moment-fbc5633a.js";z.register(O,R,X,Y,q,G,$,ee);const pe={responsive:!0,plugins:{legend:{display:!1,position:"top"},title:{display:!1}},scales:{x:{ticks:{display:!1},grid:{drawBorder:!1,display:!1}},y:{ticks:{display:!1,beginAtZero:!0},grid:{drawBorder:!1,display:!1}}}};function xe(){const{last_users:t}=_().props,i=()=>Object.keys(t),r=()=>Object.values(t).map(o=>o.length),u={labels:i(),datasets:[{data:r(),borderColor:"#6FDE53",backgroundColor:"#6FDE53"}]},x=r().reduce((o,b)=>o+b,0);return e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"h5",children:x}),e.jsx(ae,{options:pe,data:u,height:"76px",width:"465px"})]})}function fe(){return e.jsx(e.Fragment,{children:e.jsx(A,{elevation:5,variant:"indicator",children:e.jsxs(l,{sx:{padding:"16px 20px 0px 20px"},children:[e.jsx(s,{variant:"body2",children:"Todos usuários cadastrados"}),e.jsx(s,{variant:"body2",color:"primary",children:"Total"}),e.jsx(l,{children:e.jsx(xe,{})})]})})})}z.register(O,R,re,q,G,$);const me={responsive:!0,plugins:{legend:{display:!1,position:"top"},title:{display:!1}},scales:{x:{ticks:{display:!1},grid:{drawBorder:!1,display:!1}},y:{ticks:{display:!1,beginAtZero:!0},grid:{drawBorder:!1,display:!1}}}};function U(t,i){const r=t.createLinearGradient(0,i.bottom,0,i.top);return r.addColorStop(0,"#FFD23100"),r.addColorStop(1,"#FFD231"),r}function je(){const{news_users:t}=_().props,i=()=>Object.keys(t),r=()=>Object.values(t).map(n=>n.length),u={labels:i(),datasets:[{label:"Novatos",data:r(),borderRadius:3}]},x=h.useRef(null),[o,b]=h.useState({datasets:[...u.datasets]});h.useEffect(()=>{const n=x.current;if(!n)return;const y={...u,datasets:u.datasets.map(d=>({...d,backgroundColor:U(n.ctx,n.chartArea),borderColor:U(n.ctx,n.chartArea)}))};b(y)},[]);const f=r().reduce((n,y)=>n+y,0);return e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"h5",children:f}),e.jsx(te,{ref:x,options:me,data:o,height:"76px",width:"465px",redraw:!0})]})}function be(){return e.jsx(e.Fragment,{children:e.jsx(A,{elevation:5,variant:"indicator",children:e.jsxs(l,{sx:{padding:"16px 20px 0px 20px"},children:[e.jsx(s,{variant:"body2",children:"Usuários"}),e.jsx(s,{variant:"body2",color:"primary",children:"Novos"}),e.jsx(l,{children:e.jsx(je,{})})]})})})}function ge({resource:t}){const{users:i}=_().props,[r,p]=h.useState(""),[u,x]=h.useState(),o=(f,n)=>{p(n),t&&v.get(t,{search:u,status:n},{preserveState:!0})},b=f=>{x(f.target.value),t&&v.get(t,{search:f.target.value,status:r},{preserveState:!0})};return e.jsxs(l,{display:"flex",alignItems:"center",children:[e.jsx(se,{value:r,children:e.jsx(l,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsxs(le,{onChange:o,"aria-label":"lab API tabs example",children:[e.jsx(S,{label:e.jsxs("div",{children:["Todos",e.jsx(T,{sx:{background:"white",color:"black",ml:1,borderRadius:"5px"},size:"small",label:i.total_users})," "]}),value:""}),e.jsx(S,{label:e.jsxs("div",{children:["Ativo",e.jsx(T,{color:"success",size:"small",label:i.total_actives,sx:{ml:1,borderRadius:"5px"}})]}),value:"Ativo"}),e.jsx(S,{label:e.jsxs("div",{children:["Novos",e.jsx(T,{color:"warning",size:"small",label:i.total_recents,sx:{ml:1,borderRadius:"5px"}})]}),value:"Novo"}),e.jsx(S,{label:e.jsxs("div",{children:["Inativos",e.jsx(T,{color:"error",size:"small",label:i.total_inactives,sx:{ml:1,borderRadius:"5px"}})]}),value:"Inativo"})]})})}),e.jsxs(l,{ml:2,flex:1,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(j,{InputProps:{startAdornment:e.jsx(ce,{position:"start",children:e.jsx(ie,{sx:{color:"#fff"}})})},InputLabelProps:{shrink:!1},color:"secondary",required:!0,id:"search",placeholder:"Buscar",name:"search",value:u,onChange:b}),e.jsx(C,{"aria-label":"delete",sx:{mr:2},children:e.jsx(M,{sx:{color:"#ffffff"}})})]})]})}function ve({users:t,resource:i}){const{errors:r,auth:p}=_().props,u=[{field:"fullName",headerName:"Nome",sortable:!1,flex:1,valueGetter:a=>`${a.row.name||""} ${a.row.lastName||""}`},{field:"profile.phone",headerName:"Telefone",sortable:!1,type:"number",headerAlign:"left",align:"left",flex:1,valueGetter:a=>a.row.profile.phone},{field:"email",sortable:!1,headerName:"E-mail",flex:1},{field:"status",headerName:"Status",sortable:!1,width:120,renderCell:a=>{switch(ue(a.row)||""){case"Ativo":return e.jsx(s,{variant:"body1",sx:{color:"success.main"},children:"Ativo"});case"Inativo":return e.jsx(s,{variant:"body1",color:"error",children:"Inativo"});case"Novo":return e.jsx(s,{sx:{color:"warning.main"},children:"Novo"});default:return e.jsx(s,{variant:"body1",children:"Não encontrado"})}}},{field:"",headerName:"Ações",sortable:!1,renderCell:a=>e.jsxs(oe,{direction:"row",children:[e.jsx(C,{"aria-label":"edit",sx:{mr:1},onClick:()=>Z(a.row),children:e.jsx(de,{sx:{color:"#ffffff"}})}),e.jsx(C,{disabled:!p.roles.includes("delete users"),"aria-label":"edit",sx:{mr:1},onClick:()=>Q(a.row),children:e.jsx(M,{sx:{color:"#ffffff"}})})]}),width:160}],[x,o]=h.useState(!1),[b,f]=h.useState(!1),[n,y]=h.useState(null),[d,w]=h.useState(!1),Z=a=>{m({...a.profile,...a}),o(!0)},k=()=>{w(!1),o(!1)},Q=a=>{if(!p.roles.includes("delete users")){W.error("Desculpa, você não tem autorização para realizar essa ação.");return}f(!0),y(a)},D=()=>{y(null),f(!1)},H=()=>{n&&v.delete(route("users.destroy",{user:n}),{onSuccess:a=>{D()}})},{data:c,setData:m,post:ye,processing:Ce}=K({id:0,email:"",name:"",birthday:"",cpf:"",phone:"",pix_key:""}),J=a=>{if(a.preventDefault(),!p.roles.includes("edit users")){W.error("Desculpa, você não tem autorização para realizar essa ação.");return}v.put(route("administration.update",c.id),c,{preserveState:!0,onSuccess:P=>{W.success("Update Success"),w(!1),o(!1)},onError:P=>{}})};return e.jsxs(e.Fragment,{children:[e.jsxs(A,{elevation:5,variant:"indicator",sx:{maxWidth:"100%"},children:[e.jsx(ge,{resource:i}),t.data.length===0?e.jsx(l,{padding:10,children:e.jsx(s,{variant:"body1",color:"gray",textAlign:"center",children:"Não há dados"})}):e.jsx(ne,{disableRowSelectionOnClick:!0,disableColumnSelector:!0,rows:t.data,rowCount:t.total,paginationMode:"server",columns:u,density:"comfortable",disableColumnFilter:!0,disableColumnMenu:!0,initialState:{pagination:{paginationModel:{page:t.current_page-1,pageSize:t.per_page}}},onPaginationModelChange:(a,P)=>{v.get("",{page:a.page+1,per_page:a.pageSize},{preserveState:!0})},checkboxSelection:!0})]}),e.jsxs(F,{open:x,onClose:k,PaperProps:{sx:{backgroundColor:"#2e2e2e"}},maxWidth:"md",fullWidth:!0,children:[e.jsx(L,{children:"Gerenciar Conta"}),e.jsx(C,{"aria-label":"close",onClick:k,sx:{position:"absolute",right:8,top:8,color:a=>a.palette.primary.main},children:e.jsx(N,{})}),e.jsx(B,{children:e.jsxs(l,{component:"form",id:"form_edit",onSubmit:J,noValidate:!0,sx:{mt:1,display:"flex",flexDirection:"row"},gap:2,children:[e.jsxs(l,{display:"flex",flexDirection:"column",gap:2,width:"100%",children:[e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Nome"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"name",name:"name",placeholder:"example@example.com",value:c.name,error:!!r.name,helperText:r.name,onChange:a=>m("name",a.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"CPF"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"cpf",name:"cpf",placeholder:"22/04/1986",value:c.cpf,error:!!r.cpf,helperText:r.cpf,onChange:a=>m("cpf",a.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Data de nascimento"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"birthday",name:"birthday",placeholder:"1234567890",value:c.birthday,error:!!r.birthday,helperText:r.birthday,onChange:a=>m("birthday",a.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Telefone"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"phone",name:"phone",placeholder:"1234567890",value:c.phone,error:!!r.phone,helperText:r.phone,onChange:a=>m("phone",a.target.value),InputLabelProps:{shrink:!1}})]})]}),e.jsxs(l,{display:"flex",flexDirection:"column",gap:2,width:"100%",children:[e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Email"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"email",name:"email",placeholder:"example@example.com",value:c.email,error:!!r.email,helperText:r.email,onChange:a=>m("email",a.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Usuário"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"name",name:"name",placeholder:"example@example.com",value:c.name,error:!!r.name,helperText:r.name,onChange:a=>m("name",a.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(l,{width:"100%",children:[e.jsx(s,{variant:"subtitle2",color:"white",fontWeight:600,children:"Chave Pix"}),e.jsx(j,{fullWidth:!0,required:!0,disabled:!d,id:"pix_key",name:"pix_key",placeholder:"example@example.com",value:c.pix_key,error:!!r.pix_key,helperText:r.pix_key,onChange:a=>m("pix_key",a.target.value),InputLabelProps:{shrink:!1}})]})]})]})}),e.jsxs(E,{sx:{display:"flex",p:3},children:[!d&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{display:"flex",flexDirection:"row",flex:1,gap:2,children:[e.jsx(g,{variant:"outlined",onClick:()=>{v.visit("/apostas?id="+c.id),k()},children:"Apostas"}),e.jsx(g,{variant:"outlined",onClick:()=>{v.visit("/transacoes?id="+c.id),k()},children:"Transações"})]}),e.jsx(g,{variant:"outlined",disabled:!p.roles.includes("edit users"),onClick:()=>{w(!0)},children:"Mudar informações"})]}),d&&e.jsxs(e.Fragment,{children:[e.jsx(g,{variant:"contained",type:"submit",form:"form_edit",children:"Salvar"}),e.jsx(g,{variant:"outlined",onClick:()=>{w(!1)},children:"Cancelar"})]})]})]}),e.jsxs(F,{open:b,onClose:D,PaperProps:{sx:{backgroundColor:"#2e2e2e"}},maxWidth:"sm",fullWidth:!0,children:[e.jsx(L,{children:"Deletar contas"}),e.jsx(C,{"aria-label":"close",onClick:D,sx:{position:"absolute",right:8,top:8,color:a=>a.palette.primary.main},children:e.jsx(N,{})}),e.jsx(B,{children:e.jsx(s,{variant:"body1",fontWeight:400,children:"Tem certeza que deseja deletar esse usuário selecionado?"})}),e.jsx(E,{sx:{display:"flex",p:3},children:e.jsxs(e.Fragment,{children:[e.jsx(g,{variant:"contained",color:"error",onClick:()=>H(),children:"Deletar"}),e.jsx(g,{variant:"outlined",onClick:D,children:"Cancelar"})]})})]})]})}function Re({auth:t,users:i}){return e.jsxs(he,{user:t.user,children:[e.jsx(V,{title:"Usuários"}),e.jsxs(l,{children:[e.jsx(s,{variant:"h5",mb:2,children:"USUÁRIOS"}),e.jsxs(I,{container:!0,spacing:2,children:[e.jsx(I,{item:!0,xs:12,md:4,children:e.jsx(fe,{})}),e.jsx(I,{item:!0,xs:12,md:4,children:e.jsx(be,{})}),e.jsx(I,{item:!0,xs:12,children:e.jsx(ve,{users:i,resource:"/usuarios"})})]})]})]})}export{Re as default};
