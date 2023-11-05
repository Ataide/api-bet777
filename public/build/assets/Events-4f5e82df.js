import{q as _,r as p,j as e,y as f,W as O,a as R}from"./app-2beb9d58.js";import{T as q,a as z,b as G,C as L,d as Y,D as $,c as w,e as y,f as T,S as J}from"./Search-49fae4e2.js";import{a as P,D as B,b as E,d as V,c as H}from"./Close-286ea521.js";import{D as M}from"./DatePicker-e1ffca47.js";import{B as a}from"./Box-85e1cba2.js";import{B as s}from"./Button-878287c3.js";import{T as W,F as K,S as Q}from"./TextField-e6b76fb0.js";import{I as U}from"./InputAdornment-0ac47649.js";import{I as n,M as j,A as X}from"./AuthenticatedLayout-9215bf08.js";import{h as Z}from"./moment-fbc5633a.js";import{P as ee}from"./Menu-bdf3865f.js";import{T as h}from"./Typography-e9ba13d7.js";import{G as I}from"./Grid-3e9acb3b.js";import"./createSvgIcon-8e7867b3.js";function te({resource:r,clickOpenNewEvent:l}){_().props;const[u,g]=p.useState(""),[i,b]=p.useState(),m=(o,d)=>{g(d),r&&f.get(r,{search:i,status:d},{preserveState:!0})},c=o=>{b(o.target.value),r&&f.get(r,{search:o.target.value,status:u},{preserveState:!0})};return e.jsxs(a,{display:"flex",alignItems:"center",children:[e.jsx(q,{value:u,children:e.jsx(a,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsx(z,{onChange:m,"aria-label":"lab API tabs example",children:e.jsx(G,{label:e.jsxs("div",{children:["Todos",e.jsx(L,{sx:{background:"white",color:"black",ml:1,borderRadius:"5px"},size:"small",label:2})]}),value:""})})})}),e.jsxs(a,{ml:2,flex:1,display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"center",gap:2,children:[l&&e.jsx(s,{variant:"contained",color:"primary",onClick:l,children:"Criar Evento"}),e.jsx(W,{InputProps:{startAdornment:e.jsx(U,{position:"start",children:e.jsx(Y,{sx:{color:"#fff"}})})},InputLabelProps:{shrink:!1},color:"secondary",required:!0,id:"search",placeholder:"Buscar",name:"search",value:i,onChange:c}),e.jsx(M,{sx:{width:"207px",backgroundColor:"#2E2E2E",color:"#fff",borderRadius:"10px !important","& .MuiIconButton-root":{color:"primary.main"}}}),e.jsx(s,{variant:"outlined",color:"primary",children:"Encerrar eventos"}),e.jsx(n,{"aria-label":"delete",sx:{mr:2},children:e.jsx(P,{sx:{color:"#ffffff"}})})]})]})}function re({events:r,resource:l}){const u=[{field:"title",headerName:"Nome",sortable:!1,flex:1},{field:"sport",headerName:"Esporte",headerAlign:"left",align:"left",flex:1},{field:"games.count",headerName:"Jogos",width:120,valueGetter:t=>t.row.games.length},{field:"created_at",headerName:"Criado em",headerAlign:"left",align:"left",flex:1},{field:"",headerName:"Ações",sortable:!1,renderCell:t=>{const x=se=>{const N=t.row;return alert(JSON.stringify(N,null,4))};return e.jsxs(J,{direction:"row",children:[e.jsx(n,{"aria-label":"edit",sx:{mr:1},onClick:k,children:e.jsx(V,{sx:{color:"#ffffff"}})}),e.jsx(n,{"aria-label":"edit",sx:{mr:1},onClick:F,children:e.jsx(P,{sx:{color:"#ffffff"}})}),e.jsx(n,{"aria-label":"more-options",sx:{mr:1},onClick:x,children:e.jsx(H,{sx:{color:"#ffffff"}})})]})},width:120}],[g,i]=p.useState(!1),[b,m]=p.useState(!1),[c,o]=p.useState(!1),{errors:d}=_().props,k=()=>{i(!0),o(!0)},D=()=>{o(!1),i(!1)},F=()=>{m(!0)},C=()=>{m(!1)},{data:v,setData:S,post:ae,processing:oe}=O({title:"",sport:"",end_date:""}),A=t=>{t.preventDefault(),f.post(route("events.storeFromModal"),v,{preserveState:!0,onSuccess:x=>{i(!1)},onError:x=>{console.log(x)}})};return e.jsxs(e.Fragment,{children:[e.jsxs(ee,{elevation:5,variant:"indicator",children:[e.jsx(te,{resource:l,clickOpenNewEvent:k}),e.jsx($,{disableRowSelectionOnClick:!0,onRowClick:t=>f.get("/eventos/"+t.row.id),disableColumnSelector:!0,rows:r.data,rowCount:r.total,paginationMode:"server",columns:u,density:"comfortable",initialState:{pagination:{paginationModel:{page:r.current_page-1,pageSize:r.per_page}}},onPaginationModelChange:(t,x)=>{f.get("/eventos",{page:t.page+1,per_page:t.pageSize},{preserveState:!0})},pageSizeOptions:[5,10],checkboxSelection:!0})]}),e.jsxs(w,{open:g,onClose:D,PaperProps:{sx:{backgroundColor:"#2e2e2e"}},maxWidth:"md",fullWidth:!0,children:[e.jsx(B,{children:"Criar Evento"}),e.jsx(n,{"aria-label":"close",onClick:D,sx:{position:"absolute",right:8,top:8,color:t=>t.palette.primary.main},children:e.jsx(E,{})}),e.jsx(y,{children:e.jsxs(a,{component:"form",id:"form_edit",onSubmit:A,noValidate:!0,sx:{mt:1,display:"flex",flexDirection:"row"},gap:2,children:[e.jsxs(a,{display:"flex",flexDirection:"column",gap:2,width:"100%",children:[e.jsxs(a,{width:"100%",children:[e.jsx(h,{variant:"subtitle2",color:"white",fontWeight:600,children:"Nome do evento"}),e.jsx(W,{fullWidth:!0,required:!0,disabled:!c,id:"title",name:"title",placeholder:"Campeonato Brasileiro",value:v.title,error:!!d.title,helperText:d.title,onChange:t=>S("title",t.target.value),InputLabelProps:{shrink:!1}})]}),e.jsxs(a,{width:"100%",children:[e.jsx(h,{variant:"caption",color:"white",fontWeight:600,children:"Data final do evento ( o evento se encerrara automaticamente)"}),e.jsx(M,{onChange:t=>S("end_date",Z(t).format("YYYY-MM-DD H:mm:ss")),sx:{width:"100%",backgroundColor:"#1B1C1B",color:"#fff",borderRadius:"10px !important","& .MuiIconButton-root":{color:"primary.main"}}})]})]}),e.jsx(a,{display:"flex",flexDirection:"column",gap:2,width:"100%",children:e.jsxs(a,{width:"100%",children:[e.jsx(h,{variant:"caption",color:"white",fontWeight:600,children:"Esporte"}),e.jsx(K,{fullWidth:!0,children:e.jsxs(Q,{sx:{backgroundColor:"#1B1C1B",color:"#fff"},value:v.sport,placeholder:"Selecione um esporte",onChange:t=>S("sport",t.target.value),children:[e.jsx(j,{value:"Selecione um esporte",children:"Selecione um esporte"}),e.jsx(j,{value:"Futebol",children:"Futebol"}),e.jsx(j,{value:"Vôlei",children:"Vôlei"}),e.jsx(j,{value:"Basquete",children:"Basquete"})]})})]})})]})}),e.jsxs(T,{sx:{display:"flex",p:3},children:[!c&&e.jsx(e.Fragment,{children:e.jsx(s,{variant:"outlined",onClick:()=>{o(!0)},children:"Mudar informações"})}),c&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"contained",type:"submit",form:"form_edit",children:"Salvar"}),e.jsx(s,{variant:"outlined",onClick:()=>{o(!1)},children:"Cancelar"})]})]})]}),e.jsxs(w,{open:b,onClose:C,PaperProps:{sx:{backgroundColor:"#2e2e2e"}},maxWidth:"sm",fullWidth:!0,children:[e.jsx(B,{children:"Deletar contas"}),e.jsx(n,{"aria-label":"close",onClick:C,sx:{position:"absolute",right:8,top:8,color:t=>t.palette.primary.main},children:e.jsx(E,{})}),e.jsx(y,{children:e.jsxs(h,{variant:"body1",fontWeight:400,children:["Tem certeza que desenha deletar ",e.jsx("strong",{children:"4 contas"})," selecionadas?"]})}),e.jsx(T,{sx:{display:"flex",p:3},children:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"contained",color:"error",children:"Deletar"}),e.jsx(s,{variant:"outlined",onClick:C,children:"Cancelar"})]})})]})]})}function Ce({auth:r,events:l}){return e.jsxs(X,{user:r.user,children:[e.jsx(R,{title:"Eventos"}),e.jsxs(a,{children:[e.jsx(h,{variant:"h5",mb:2,children:"Eventos"}),e.jsx(I,{container:!0,spacing:2,children:e.jsx(I,{item:!0,xs:12,children:e.jsx(re,{events:l})})})]})]})}export{Ce as default};
