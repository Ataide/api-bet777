import{j as e,r as u,q as f,y as i,z as T,b as C}from"./app-c45835ec.js";import{D as M}from"./DatePicker-0467f5fd.js";import{d as _}from"./dayjs.min-7bb3f2a4.js";import{B as n}from"./Box-3d9fba78.js";import{T as S,a as v,b as m,C as h,D as y,d as I}from"./Search-64415634.js";import{P as D}from"./Menu-5d25c29a.js";import{T as w}from"./Typography-0a0609e8.js";import{T as A}from"./TextField-ddc657f8.js";import{I as k}from"./InputAdornment-64666362.js";import{A as R}from"./AuthenticatedLayout-54c96231.js";import{G as b}from"./Grid-ef8eac94.js";import"./IconButton-571f0f9a.js";import"./Button-b0daae8d.js";import"./DialogContent-9f0a70a1.js";import"./Close-5b5df976.js";import"./createSvgIcon-568a0746.js";function P({value:s,onChange:l}){return e.jsx(M,{localeText:{clearButtonLabel:"Limpar",todayButtonLabel:"Hoje"},slotProps:{actionBar:{actions:["clear","today"]}},sx:({palette:o})=>({"& .MuiOutlinedInput-root":{color:o.common.white,background:o.background.default},"& .MuiSvgIcon-root":{color:o.primary.main},".MuiDayCalendar-weekDayLabel":{color:o.primary.main}}),value:s,onChange:l})}function z({resource:s}){const[l,o]=u.useState(null),{transactionDetails:a}=f().props,[t,r]=u.useState(""),[c,p]=u.useState(),d=(g,j)=>{r(j),i.get("",{search:c,type:j},{preserveState:!0,only:["transactionDetails"]})},x=g=>{i.get("",{date:g?_(g).format("YYYY-MM-DD"):""},{preserveState:!0,only:["transactionDetails"]})};return e.jsxs(n,{display:"flex",alignItems:"center",children:[e.jsx(S,{value:t,children:e.jsx(n,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsxs(v,{onChange:d,"aria-label":"lab API tabs example",children:[e.jsx(m,{label:e.jsxs("div",{children:["Todos",e.jsx(h,{color:"primary",sx:{ml:1,borderRadius:"5px"},size:"small",label:a.total_geral||0})]}),value:""}),e.jsx(m,{label:e.jsxs("div",{children:["Depósitos",e.jsx(h,{color:"primary",sx:{ml:1,borderRadius:"5px"},size:"small",label:a.total_deposit||0})]}),value:"deposit"}),e.jsx(m,{label:e.jsxs("div",{children:["Saques",e.jsx(h,{sx:{ml:1,borderRadius:"5px"},color:"error",size:"small",label:a.total_withdraw||0})]}),value:"withdraw"})]})})}),e.jsx(n,{mr:4,flex:1,display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"center",children:e.jsx(P,{value:l,onChange:x})})]})}function N({transactions:s,resource:l}){const o=[{field:"created_at",headerName:"Data",sortable:!1,flex:1,valueGetter:t=>"ID: "+t.row.user_id+"    "+T(new Date(t.row.created_at),"dd/MM/yyyy hh:mm")},{field:"amount",headerName:"Quantia",type:"number",headerAlign:"left",align:"left",flex:1,valueGetter:t=>"R$ "+(t.row.withdraw+t.row.deposit).toFixed(2)}],{transactionDetails:a}=f().props;return e.jsx(e.Fragment,{children:e.jsxs(D,{elevation:5,variant:"indicator",children:[e.jsx(z,{}),a&&a.data.length===0?e.jsx(n,{padding:10,children:e.jsx(w,{variant:"body1",color:"gray",textAlign:"center",children:"Não há dados"})}):e.jsx(y,{disableRowSelectionOnClick:!0,disableColumnSelector:!0,rows:a.data,rowCount:a.total,paginationMode:"server",columns:o,density:"comfortable",initialState:{pagination:{paginationModel:{page:a.current_page-1,pageSize:a.per_page}}},onPaginationModelChange:(t,r)=>{i.get("",{page:t.page+1,per_page:t.pageSize},{preserveState:!0,only:["transactionDetails"]})},checkboxSelection:!1})]})})}function B({resource:s}){const{transactions:l}=f().props,[o,a]=u.useState(""),[t,r]=u.useState(),c=(d,x)=>{a(x),s&&i.get(s,{search:t,status:x},{preserveState:!0})},p=d=>{r(d.target.value),i.get("",{search:d.target.value},{preserveState:!0})};return e.jsxs(n,{display:"flex",alignItems:"center",children:[e.jsx(S,{value:o,children:e.jsx(n,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsx(v,{onChange:c,"aria-label":"lab API tabs example",children:e.jsx(m,{label:e.jsxs("div",{children:["Todos",e.jsx(h,{sx:{background:"white",color:"black",ml:1,borderRadius:"5px"},size:"small",label:l.total||0})]}),value:""})})})}),e.jsx(n,{mr:4,flex:1,display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"center",children:e.jsx(A,{InputProps:{startAdornment:e.jsx(k,{position:"start",children:e.jsx(I,{sx:{color:"#fff"}})})},InputLabelProps:{shrink:!1},color:"secondary",required:!0,id:"search",placeholder:"Buscar",name:"search",value:t,onChange:p})})]})}function L({transactions:s,resource:l}){const o=[{field:"user_id",headerName:"ID",sortable:!1,flex:1},{field:"name",headerName:"Nome",sortable:!1,flex:1},{field:"total_deposits",headerName:"Depósito",type:"number",headerAlign:"left",align:"left",flex:1},{field:"total_withdraws",headerName:"Saque",type:"number",headerAlign:"left",align:"left",flex:1}],[a,t]=u.useState([]);return e.jsx(e.Fragment,{children:e.jsxs(D,{elevation:5,variant:"indicator",children:[e.jsx(B,{}),e.jsx(y,{getRowId:r=>r.user_id,disableRowSelectionOnClick:!0,disableColumnSelector:!0,rows:s.data,rowCount:s.total,paginationMode:"server",columns:o,density:"comfortable",initialState:{pagination:{paginationModel:{page:s.current_page-1,pageSize:s.per_page}}},onPaginationModelChange:(r,c)=>{i.get("/transacoes",{page:r.page+1,per_page:r.pageSize},{only:["transactions"],preserveState:!0})},checkboxSelection:!0,rowSelectionModel:a,onRowSelectionModelChange:r=>{if(r.length>1){const c=new Set(a),p=r.filter(d=>!c.has(d));i.visit(route("transactions",{id:p[0]}),{method:"get",only:["transactionDetails"],preserveState:!0}),t(p)}else i.visit(route("transactions",{id:r[0]}),{method:"get",only:["transactionDetails"],preserveState:!0}),t(r)}})]})})}function ee({auth:s,transactions:l}){return e.jsxs(R,{user:s.user,children:[e.jsx(C,{title:"Transações"}),e.jsxs(n,{children:[e.jsx(w,{variant:"h5",mb:2,children:"TRANSAÇÕES"}),e.jsxs(b,{container:!0,spacing:2,children:[e.jsx(b,{item:!0,xs:7,children:e.jsx(L,{transactions:l})}),e.jsx(b,{item:!0,xs:5,children:e.jsx(N,{transactions:l})})]})]})]})}export{ee as default};