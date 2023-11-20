import{q as f,r as u,j as e,y as c,C as w,b as C}from"./app-4faa17d2.js";import{B as l}from"./Box-5204ccdd.js";import{T as b,a as j,b as h,C as m,D as S,d as T}from"./Search-86b91216.js";import{D}from"./DatePicker-8c280445.js";import{P as v}from"./Menu-9ab74821.js";import{T as y}from"./Typography-a45e0f8d.js";import{T as I}from"./TextField-68bebdc8.js";import{I as _}from"./InputAdornment-842f1376.js";import{A as M}from"./AuthenticatedLayout-5d6c287d.js";import{G as x}from"./Grid-20c7bc4b.js";import"./Close-c2d45122.js";import"./IconButton-cca81e62.js";import"./Button-980dfda6.js";import"./createSvgIcon-e6b92c7a.js";import"./DialogContent-9874f0b3.js";function A({resource:o}){const{transactionDetails:n}=f().props,[d,a]=u.useState("withdraw"),[t,r]=u.useState(),p=(s,i)=>{a(i),c.get("",{search:t,type:i},{preserveState:!0,only:["transactionDetails"]})};return u.useEffect(()=>{a("deposit")},[]),e.jsxs(l,{display:"flex",alignItems:"center",children:[e.jsx(b,{value:d,children:e.jsx(l,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsxs(j,{onChange:p,"aria-label":"lab API tabs example",children:[e.jsx(h,{label:e.jsxs("div",{children:["Depósitos",e.jsx(m,{color:"primary",sx:{ml:1,borderRadius:"5px"},size:"small",label:n.data.filter(s=>s.type==="deposit").reduce((s,{deposit:i})=>s+1,0)})]}),value:"deposit"}),e.jsx(h,{label:e.jsxs("div",{children:["Saques",e.jsx(m,{sx:{ml:1,borderRadius:"5px"},color:"error",size:"small",label:n.data.filter(s=>s.type==="withdraw").reduce((s,{deposit:i})=>s+1,0)})]}),value:"withdraw"})]})})}),e.jsx(l,{mr:4,flex:1,display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"center",children:e.jsx(D,{sx:{width:"207px",backgroundColor:"#2E2E2E",color:"#fff",borderRadius:"10px !important","& .MuiIconButton-root":{color:"primary.main"}}})})]})}function R({transactions:o,resource:n}){const d=[{field:"created_at",headerName:"Data",sortable:!1,flex:1,valueGetter:t=>"ID: "+t.row.user_id+"    "+w(new Date(t.row.created_at),"dd/MM/yyyy hh:mm")},{field:"amount",headerName:"Quantia",type:"number",headerAlign:"left",align:"left",flex:1,valueGetter:t=>"R$ "+(t.row.withdraw+t.row.deposit).toFixed(2)}],{transactionDetails:a}=f().props;return e.jsx(e.Fragment,{children:e.jsxs(v,{elevation:5,variant:"indicator",children:[e.jsx(A,{}),a&&a.data.length===0?e.jsx(l,{padding:10,children:e.jsx(y,{variant:"body1",color:"gray",textAlign:"center",children:"Não há dados"})}):e.jsx(S,{disableRowSelectionOnClick:!0,disableColumnSelector:!0,rows:a.data,rowCount:a.total,paginationMode:"server",columns:d,density:"comfortable",initialState:{pagination:{paginationModel:{page:a.current_page-1,pageSize:a.per_page}}},onPaginationModelChange:(t,r)=>{c.get("/transacoes",{page:t.page+1,per_page:t.pageSize},{preserveState:!0,only:["transactionDetails"]})},checkboxSelection:!1})]})})}function k({resource:o}){const{transactions:n}=f().props,[d,a]=u.useState(""),[t,r]=u.useState(),p=(i,g)=>{a(g),o&&c.get(o,{search:t,status:g},{preserveState:!0})},s=i=>{r(i.target.value),c.get("",{search:i.target.value},{preserveState:!0})};return e.jsxs(l,{display:"flex",alignItems:"center",children:[e.jsx(b,{value:d,children:e.jsx(l,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsx(j,{onChange:p,"aria-label":"lab API tabs example",children:e.jsx(h,{label:e.jsxs("div",{children:["Todos",e.jsx(m,{sx:{background:"white",color:"black",ml:1,borderRadius:"5px"},size:"small",label:n.total||0})]}),value:""})})})}),e.jsx(l,{mr:4,flex:1,display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"center",children:e.jsx(I,{InputProps:{startAdornment:e.jsx(_,{position:"start",children:e.jsx(T,{sx:{color:"#fff"}})})},InputLabelProps:{shrink:!1},color:"secondary",required:!0,id:"search",placeholder:"Buscar",name:"search",value:t,onChange:s})})]})}function N({transactions:o,resource:n}){const d=[{field:"user_id",headerName:"ID",sortable:!1,flex:1},{field:"name",headerName:"Nome",sortable:!1,flex:1},{field:"total_deposits",headerName:"Depósito",type:"number",headerAlign:"left",align:"left",flex:1},{field:"total_withdraws",headerName:"Saque",type:"number",headerAlign:"left",align:"left",flex:1}],[a,t]=u.useState([]);return e.jsx(e.Fragment,{children:e.jsxs(v,{elevation:5,variant:"indicator",children:[e.jsx(k,{}),e.jsx(S,{getRowId:r=>r.user_id,disableRowSelectionOnClick:!0,disableColumnSelector:!0,rows:o.data,rowCount:o.total,paginationMode:"server",columns:d,density:"comfortable",initialState:{pagination:{paginationModel:{page:o.current_page-1,pageSize:o.per_page}}},onPaginationModelChange:(r,p)=>{c.get("/transacoes",{page:r.page+1,per_page:r.pageSize},{only:["transactions"],preserveState:!0})},checkboxSelection:!0,rowSelectionModel:a,onRowSelectionModelChange:r=>{if(r.length>1){const p=new Set(a),s=r.filter(i=>!p.has(i));c.visit(route("transactions",{id:s[0]}),{method:"get",only:["transactionDetails"],preserveState:!0}),t(s)}else c.visit(route("transactions",{id:r[0]}),{method:"get",only:["transactionDetails"],preserveState:!0}),t(r)}})]})})}function W({auth:o,transactions:n}){return e.jsxs(M,{user:o.user,children:[e.jsx(C,{title:"Transações"}),e.jsxs(l,{children:[e.jsx(y,{variant:"h5",mb:2,children:"TRANSAÇÕES"}),e.jsxs(x,{container:!0,spacing:2,children:[e.jsx(x,{item:!0,xs:7,children:e.jsx(N,{transactions:n})}),e.jsx(x,{item:!0,xs:5,children:e.jsx(R,{transactions:n})})]})]})]})}export{W as default};
