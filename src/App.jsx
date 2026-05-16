import { useState, useEffect } from "react";
const USERS = [
  { id:1, nome:"Ana Lima", email:"ana@imobx.com", senha:"123", cargo:"Gerente", role:"admin", av:"AL", cor:"#C9A96E" },
  { id:2, nome:"Pedro Rocha", email:"pedro@imobx.com", senha:"123", cargo:"Corretor Sênior", role:"corretor", av:"PR", cor:"#3b82f6" },
  { id:3, nome:"Lucas Matos", email:"lucas@imobx.com", senha:"123", cargo:"Corretor", role:"corretor", av:"LM", cor:"#10b981" },
  { id:4, nome:"Camila Torres", email:"camila@imobx.com", senha:"123", cargo:"Corretora", role:"corretor", av:"CT", cor:"#ec4899" },
  { id:5, nome:"Rafael Dias", email:"rafael@imobx.com", senha:"123", cargo:"Corretor Jr.", role:"corretor", av:"RD", cor:"#8b5cf6" },
];const STATUS_LEAD = [
  { k:"novo", l:"Novo Lead", c:"#3b82f6" },
  { k:"contato", l:"Em Contato", c:"#8b5cf6" },
  { k:"visita", l:"Visita Agendada", c:"#f59e0b" },
  { k:"proposta", l:"Proposta", c:"#ec4899" },
  { k:"negociacao", l:"Negociação", c:"#f97316" },
  { k:"ganho", l:"Ganho ✓", c:"#10b981" },
  { k:"perdido", l:"Perdido ✗", c:"#6b7280" },
];
const ORIGENS = ["Site","WhatsApp","Instagram","Google","Indicação","Portais","Facebook","Outro"];
const LEADS0 = [
  { id:1, nome:"Carlos Ferreira", tel:"(11) 98765-4321", email:"carlos@email.com", origem:"Site", interesse:"Compra", orc:850000, bairro:"Jardins", tipo:"Apartamento", status:"novo", corretor:"Ana Lima", dt:"2025-05-10", notas:"Quer 3 quartos.", score:87 },
  { id:2, nome:"Mariana Souza", tel:"(11) 91234-5678", email:"mari@gmail.com", origem:"WhatsApp", interesse:"Aluguel", orc:4500, bairro:"Vila Madalena", tipo:"Casa", status:"contato", corretor:"Pedro Rocha", dt:"2025-05-11", notas:"Pet-friendly.", score:72 },
  { id:3, nome:"Roberto Alves", tel:"(11) 97777-3333", email:"roberto@empresa.com", origem:"Indicação", interesse:"Compra", orc:2500000, bairro:"Moema", tipo:"Cobertura", status:"visita", corretor:"Ana Lima", dt:"2025-05-08", notas:"Cliente VIP.", score:95 },
  { id:4, nome:"Fernanda Costa", tel:"(11) 96666-2222", email:"fecosta@hotmail.com", origem:"Instagram", interesse:"Compra", orc:600000, bairro:"Campo Belo", tipo:"Apartamento", status:"proposta", corretor:"Lucas Matos", dt:"2025-05-07", notas:"Visitou 2 imóveis.", score:91 },
  { id:5, nome:"João Mendes", tel:"(11) 95555-1111", email:"joao@gmail.com", origem:"Google", interesse:"Aluguel", orc:8000, bairro:"Faria Lima", tipo:"Sala Comercial", status:"negociacao", corretor:"Lucas Matos", dt:"2025-05-06", notas:"80m²+.", score:78 },
  { id:6, nome:"Patrícia Lima", tel:"(11) 94444-0000", email:"patricia@email.com", origem:"Site", interesse:"Compra", orc:1200000, bairro:"Alphaville", tipo:"Casa", status:"ganho", corretor:"Ana Lima", dt:"2025-05-03", notas:"Fechado!", score:99 },
  { id:7, nome:"Thiago Nunes", tel:"(11) 93333-8888", email:"thiago@email.com", origem:"Portais", interesse:"Compra", orc:450000, bairro:"Santana", tipo:"Apartamento", status:"perdido", corretor:"Pedro Rocha", dt:"2025-05-01", notas:"Comprou com outra.", score:34 },
];const IMOVEIS0 = [
  { id:1, cod:"ALT-001", titulo:"Apartamento Luxo Jardins", tipo:"Apartamento", fin:"Venda", preco:1850000, area:142, qts:3, bhs:2, vgs:2, bairro:"Jardins", end:"R. Oscar Freire, 1200", status:"disponivel", corretor:"Ana Lima", vis:8, foto:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=70" },
  { id:2, cod:"ALT-002", titulo:"Casa Alto Padrão Alphaville", tipo:"Casa", fin:"Venda", preco:3200000, area:380, qts:5, bhs:4, vgs:4, bairro:"Alphaville", end:"Al. das Flores, 45", status:"reservado", corretor:"Pedro Rocha", vis:5, foto:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=70" },
  { id:3, cod:"ALT-003", titulo:"Studio Vila Madalena", tipo:"Apartamento", fin:"Aluguel", preco:3800, area:45, qts:1, bhs:1, vgs:1, bairro:"Vila Madalena", end:"R. Aspicuelta, 88", status:"disponivel", corretor:"Lucas Matos", vis:12, foto:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=70" },
  { id:4, cod:"ALT-004", titulo:"Cobertura Duplex Moema", tipo:"Cobertura", fin:"Venda", preco:4700000, area:290, qts:4, bhs:5, vgs:3, bairro:"Moema", end:"Av. Ibirapuera, 3103", status:"disponivel", corretor:"Ana Lima", vis:3, foto:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=70" },
  { id:5, cod:"ALT-005", titulo:"Sala Comercial Faria Lima", tipo:"Sala Comercial", fin:"Aluguel", preco:8500, area:85, qts:0, bhs:2, vgs:2, bairro:"Pinheiros", end:"Av. Faria Lima, 2000", status:"negociacao", corretor:"Lucas Matos", vis:7, foto:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70" },
];
const VISITAS0 = [
  { id:1, lead:"Roberto Alves", imovel:"Cobertura Duplex Moema", corretor:"Ana Lima", data:"2025-05-16", hora:"10:00", status:"agendada", obs:"Cliente VIP." },
  { id:2, lead:"Fernanda Costa", imovel:"Apartamento Luxo Jardins", corretor:"Lucas Matos", data:"2025-05-16", hora:"14:30", status:"agendada", obs:"Segunda visita." },
  { id:3, lead:"Carlos Ferreira", imovel:"Studio Vila Madalena", corretor:"Ana Lima", data:"2025-05-17", hora:"09:00", status:"agendada", obs:"" },
  { id:4, lead:"João Mendes", imovel:"Sala Comercial Faria Lima", corretor:"Lucas Matos", data:"2025-05-14", hora:"11:00", status:"realizada", obs:"Pediu proposta." },
];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const fmtM = (v) => +v >= 1e6 ? `R$ ${(+v/1e6).toFixed(2).replace(".",",")}Mi` : `R$ ${(+v).toLocaleString("pt-BR")}`;
const fmtD = (d) => d ? new Date(d+"T12:00").toLocaleDateString("pt-BR") : "";
const slObj = Object.fromEntries(STATUS_LEAD.map(s=>[s.k,s]));
const uObj = Object.fromEntries(USERS.map(u=>[u.nome,u]));
const SVG = {
  home:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  users:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  build:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  cal:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  funnel:"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  plus:"M12 4v16m8-8H4",
  search:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  edit:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  x:"M6 18L18 6M6 6l12 12",
  check:"M5 13l4 4L19 7",
  star:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  ai:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  send:"M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  mail:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  phone:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  pin:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  key:"M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  logout:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  shield:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  lock:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  eye:"M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  eyeoff:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
  menu:"M4 6h16M4 12h16M4 18h16",
  team:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  bed:"M2 4v16M22 4v16M2 8h20M2 16h20M6 8v8M18 8v8",
  car:"M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v1m-4 9H9m8 0h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-8 0V9",
  tag:"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  arrow:"M14 5l7 7m0 0l-7 7m7-7H3",
  grid:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  list:"M4 6h16M4 10h16M4 14h16M4 18h16",
  whats:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.734 9.734 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z",
};
const Ic = ({ n, s=18, c="currentColor", sw=1.8 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={SVG[n]}/>
  </svg>
);
const Score = ({ v }) => {
  const c = v>=80?"#10b981":v>=55?"#f59e0b":"#ef4444";
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <div style={{flex:1,height:4,background:"#252525",borderRadius:99,overflow:"hidden"}}>
        <div style={{width:`${v}%`,height:"100%",background:c,borderRadius:99}}/>
      </div>
      <span style={{fontSize:11,fontWeight:700,color:c,minWidth:24,textAlign:"right"}}>{v}</span>
    </div>
  );
};
const Badge = ({ s }) => {
  const o = slObj[s]||{l:s,c:"#6b7280"};
  return <span style={{background:o.c+"20",color:o.c,border:`1px solid ${o.c}35`,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{o.l}</span>;
};
const Avatar = ({ nome, cor, size=32, fontSize=12 }) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:cor||"#C9A96E",display:"flex",alignItems:"center",justifyContent:"center",fontSize,fontWeight:700,color:"#000",flexShrink:0}}>
    {nome?.slice(0,2).toUpperCase()}
  </div>
);const Modal = ({ title, onClose, children, wide }) => {
  useEffect(()=>{document.body.style.overflow="hidden";return()=>{document.body.style.overflow="";};},[]);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className={`modal-box${wide?" wide":""}`} onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="ib" onClick={onClose}><Ic n="x" s={18}/></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
const Confirm = ({ msg, onOk, onCancel }) => (
  <Modal title="Confirmar ação" onClose={onCancel}>
    <p style={{color:"#bbb",marginBottom:24,lineHeight:1.6}}>{msg}</p>
    <div className="row-end gap8">
      <button className="btn-ghost" onClick={onCancel}>Cancelar</button>
      <button className="btn-danger" onClick={onOk}><Ic n="trash" s={14}/> Excluir</button>
    </div>
  </Modal>
);
const Login = ({ onLogin }) => {
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const [show,setShow] = useState(false);
  const [erro,setErro] = useState("");
  const [load,setLoad] = useState(false);
  const [quick,setQuick] = useState(null);
  const go = (em,sn) => {
    setLoad(true); setErro("");
    setTimeout(()=>{
      const u = USERS.find(u=>u.email===em&&u.senha===sn);
      u ? onLogin(u) : (setErro("E-mail ou senha incorretos."),setLoad(false));
    },700);
  };
  return (
    <div className="login-root">
      <div className="login-panel">
        <div className="login-brand">
          <div className="brand-mark">A</div>
          <div><p className="brand-eye">ALTERNATIVA</p><p className="brand-name">IMOB<span>X</span></p></div>
        </div>
        <h1 className="login-h1">CRM Imobiliário</h1>
        <p className="login-sub">Entre com suas credenciais</p>
        <div className="lf-field">
          <label>E-mail</label>
          <div className="lf-wrap">
            <Ic n="mail" s={16} c="#555"/>
            <input type="email" placeholder="seu@imobx.com" value={email} onChange={e=>{setEmail(e.target.value);setQuick(null);}} onKeyDown={e=>e.key==="Enter"&&go(email,senha)}/>
          </div>
        </div>
        <div className="lf-field">
          <label>Senha</label>
          <div className="lf-wrap">
            <Ic n="lock" s={16} c="#555"/>
            <input type={show?"text":"password"} placeholder="••••••" value={senha} onChange={e=>{setSenha(e.target.value);setQuick(null);}} onKeyDown={e=>e.key==="Enter"&&go(email,senha)}/>
            <button className="lf-eye" onClick={()=>setShow(!show)}><Ic n={show?"eyeoff":"eye"} s={15} c="#555"/></button>
          </div>
        </div>
        {erro&&<div className="lf-erro"><Ic n="x" s={13} c="#ef4444"/> {erro}</div>}
        <button className="btn-login" disabled={load} onClick={()=>go(email,senha)}>
          {load?<span className="spinner"/>:<><Ic n="key" s={16} c="#000"/> Entrar no sistema</>}
        </button>
        <div className="demo-sep"><span>Acesso rápido</span></div>
        <div className="demo-grid">
          {USERS.map(u=>(
            <button key={u.id} className={`demo-btn${quick?.id===u.id?" sel":""}`} onClick={()=>{setQuick(u);setEmail(u.email);setSenha(u.senha);}}>
              <Avatar nome={u.av} cor={u.cor} size={28} fontSize={10}/>
              <div style={{textAlign:"left"}}><div className="demo-nome">{u.nome.split(" ")[0]}</div><div className="demo-cargo">{u.cargo}</div></div>
              {u.role==="admin"&&<span className="demo-admin">Admin</span>}
            </button>
          ))}
        </div>
        {quick&&<button className="btn-quick" onClick={()=>go(quick.email,quick.senha)}><Ic n="arrow" s={15} c="#000"/> Entrar como {quick.nome.split(" ")[0]}</button>}
      </div>
      <div className="login-visual">
        <div className="lv-bg"/>
        <div className="lv-overlay"/>
        <div className="lv-content">
          <h2>Gerencie sua imobiliária com inteligência</h2>
          <p>CRM completo com pipeline, agenda, imóveis e IA.</p>
          <div className="lv-features">
            {["Pipeline Kanban","IA para Leads","Agenda de Visitas","Gestão de Imóveis","Acesso por Corretor","Dashboard"].map((f,i)=>(
              <div key={i} className="lv-feat"><Ic n="check" s={14} c="#C9A96E" sw={2.5}/>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );const AIPanel = ({ lead, onClose }) => {
  const [res,setRes] = useState("");
  const [load,setLoad] = useState(false);
  const [pr,setPr] = useState("");
  const run = async (tipo) => {
    setLoad(true); setRes("");
    const ps = {
      analise:`Analise este lead imobiliário:\nNome: ${lead.nome}\nInteresse: ${lead.interesse}\nOrçamento: ${fmtM(lead.orc)}\nBairro: ${lead.bairro}\nTipo: ${lead.tipo}\nScore: ${lead.score}/100\nDê: 1) Potencial 2) Próximos passos 3) Argumentos de venda 4) Riscos.`,
      email:`Escreva email de follow-up para:\nNome: ${lead.nome}\nInteresse: ${lead.interesse} de ${lead.tipo} em ${lead.bairro}\nOrçamento: ${fmtM(lead.orc)}\nAssinar pela Alternativa ImobX.`,
      whats:`Mensagem WhatsApp para:\nNome: ${lead.nome}\nInteresse: ${lead.interesse} de ${lead.tipo} em ${lead.bairro}\nOrçamento: ${fmtM(lead.orc)}\nMáx 3 parágrafos.`,
      custom:pr,
    };
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:ps[tipo]}]})
      });
      const d = await r.json();
      setRes(d.content?.[0]?.text||"Erro.");
    } catch { setRes("Erro ao conectar."); }
    setLoad(false);
  };
  return (
    <Modal title={`✦ IA — ${lead.nome}`} onClose={onClose} wide>
      <div className="ai-wrap">
        <div className="ai-lead-info">
          <Avatar nome={lead.nome.slice(0,2)} cor={uObj[lead.corretor]?.cor} size={40}/>
          <div style={{flex:1}}><div className="ai-nome">{lead.nome}</div><div className="ai-meta">{lead.interesse} · {lead.tipo} · {fmtM(lead.orc)}</div></div>
          <div style={{minWidth:90}}><Score v={lead.score}/></div>
        </div>
        <div className="ai-actions">
          <button className="ai-act-btn" onClick={()=>run("analise")}><Ic n="ai" s={15}/> Analisar</button>
          <button className="ai-act-btn" onClick={()=>run("email")}><Ic n="mail" s={15}/> E-mail</button>
          <button className="ai-act-btn" onClick={()=>run("whats")}><Ic n="whats" s={15}/> WhatsApp</button>
        </div>
        <div className="ai-input-row">
          <input placeholder="Pergunta personalizada..." value={pr} onChange={e=>setPr(e.target.value)} onKeyDown={e=>e.key==="Enter"&&pr&&run("custom")}/>
          <button className="ai-send" onClick={()=>pr&&run("custom")}><Ic n="send" s={16} c="#000"/></button>
        </div>
        <div className="ai-output">
          {load&&<div className="ai-loading"><div className="dots"><s/><s/><s/></div><span>Analisando...</span></div>}
          {!load&&res&&<div className="ai-text">{res.split("\n").map((l,i)=>l?<p key={i}>{l}</p>:<br key={i}/>)}</div>}
          {!load&&!res&&<div className="ai-empty"><Ic n="ai" s={32} c="#C9A96E"/><p>Selecione uma ação acima</p></div>}
        </div>
      </div>
    </Modal>
  );const FormLead = ({ lead, onSave, onClose, user }) => {
  const isAdmin = user.role==="admin";
  const [f,setF] = useState(lead||{nome:"",tel:"",email:"",origem:"Site",interesse:"Compra",orc:"",bairro:"",tipo:"Apartamento",status:"novo",corretor:user.nome,notas:"",score:60});
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  const ok = () => { if(!f.nome.trim()) return; onSave({...f,id:lead?.id||uid(),dt:lead?.dt||new Date().toISOString().split("T")[0]}); };
  return (
    <Modal title={lead?"Editar Lead":"Novo Lead"} onClose={onClose}>
      <div className="form-g">
        <div className="fg"><label>Nome *</label><input value={f.nome} onChange={e=>s("nome",e.target.value)}/></div>
        <div className="fg"><label>Telefone</label><input value={f.tel} onChange={e=>s("tel",e.target.value)}/></div>
        <div className="fg"><label>E-mail</label><input type="email" value={f.email} onChange={e=>s("email",e.target.value)}/></div>
        <div className="fg"><label>Origem</label><select value={f.origem} onChange={e=>s("origem",e.target.value)}>{ORIGENS.map(o=><option key={o}>{o}</option>)}</select></div>
        <div className="fg"><label>Interesse</label><select value={f.interesse} onChange={e=>s("interesse",e.target.value)}><option>Compra</option><option>Aluguel</option><option>Venda</option></select></div>
        <div className="fg"><label>Orçamento (R$)</label><input type="number" value={f.orc} onChange={e=>s("orc",e.target.value)}/></div>
        <div className="fg"><label>Bairro</label><input value={f.bairro} onChange={e=>s("bairro",e.target.value)}/></div>
        <div className="fg"><label>Tipo</label><select value={f.tipo} onChange={e=>s("tipo",e.target.value)}><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Terreno</option><option>Sala Comercial</option></select></div>
        <div className="fg"><label>Status</label><select value={f.status} onChange={e=>s("status",e.target.value)}>{STATUS_LEAD.map(sl=><option key={sl.k} value={sl.k}>{sl.l}</option>)}</select></div>
        <div className="fg"><label>Corretor</label>
          <select value={f.corretor} onChange={e=>s("corretor",e.target.value)} disabled={!isAdmin}>
            {USERS.map(u=><option key={u.id}>{u.nome}</option>)}
          </select>
        </div>
        <div className="fg full"><label>Score: {f.score}</label>
          <input type="range" min={0} max={100} value={f.score} onChange={e=>s("score",+e.target.value)} style={{accentColor:"#C9A96E"}}/>
          <Score v={f.score}/>
        </div>
        <div className="fg full"><label>Notas</label><textarea rows={3} value={f.notas} onChange={e=>s("notas",e.target.value)}/></div>
      </div>
      <div className="row-end gap8" style={{marginTop:16,paddingTop:14,borderTop:"1px solid #222"}}>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn-gold" onClick={ok}><Ic n="check" s={15} c="#000"/> Salvar Lead</button>
      </div>
    </Modal>
  );
};
const FormImovel = ({ im, onSave, onClose, user }) => {
  const isAdmin = user.role==="admin";
  const [f,setF] = useState(im||{titulo:"",tipo:"Apartamento",fin:"Venda",preco:"",area:"",qts:"",bhs:"",vgs:"",bairro:"",end:"",status:"disponivel",corretor:user.nome,foto:"",cod:`ALT-${String(Date.now()).slice(-3)}`});
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  const ok = () => { if(!f.titulo.trim()) return; onSave({...f,id:im?.id||uid(),vis:im?.vis||0}); };
  return (
    <Modal title={im?"Editar Imóvel":"Novo Imóvel"} onClose={onClose}>
      <div className="form-g">
        <div className="fg full"><label>Título *</label><input value={f.titulo} onChange={e=>s("titulo",e.target.value)}/></div>
        <div className="fg"><label>Tipo</label><select value={f.tipo} onChange={e=>s("tipo",e.target.value)}><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Terreno</option><option>Sala Comercial</option></select></div>
        <div className="fg"><label>Finalidade</label><select value={f.fin} onChange={e=>s("fin",e.target.value)}><option>Venda</option><option>Aluguel</option></select></div>
        <div className="fg"><label>Preço (R$)</label><input type="number" value={f.preco} onChange={e=>s("preco",e.target.value)}/></div>
        <div className="fg"><label>Área (m²)</label><input type="number" value={f.area} onChange={e=>s("area",e.target.value)}/></div>
        <div className="fg"><label>Quartos</label><input type="number" min={0} value={f.qts} onChange={e=>s("qts",e.target.value)}/></div>
        <div className="fg"><label>Banheiros</label><input type="number" min={0} value={f.bhs} onChange={e=>s("bhs",e.target.value)}/></div>
        <div className="fg"><label>Vagas</label><input type="number" min={0} value={f.vgs} onChange={e=>s("vgs",e.target.value)}/></div>
        <div className="fg"><label>Bairro</label><input value={f.bairro} onChange={e=>s("bairro",e.target.value)}/></div>
        <div className="fg"><label>Endereço</label><input value={f.end} onChange={e=>s("end",e.target.value)}/></div>
        <div className="fg"><label>Status</label><select value={f.status} onChange={e=>s("status",e.target.value)}><option value="disponivel">Disponível</option><option value="reservado">Reservado</option><option value="negociacao">Em Negociação</option><option value="vendido">Vendido</option></select></div>
        <div className="fg"><label>Corretor</label><select value={f.corretor} onChange={e=>s("corretor",e.target.value)} disabled={!isAdmin}>{USERS.map(u=><option key={u.id}>{u.nome}</option>)}</select></div>
        <div className="fg full"><label>URL Foto</label><input value={f.foto} onChange={e=>s("foto",e.target.value)} placeholder="https://..."/></div>
      </div>
      <div className="row-end gap8" style={{marginTop:16,paddingTop:14,borderTop:"1px solid #222"}}>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn-gold" onClick={ok}><Ic n="check" s={15} c="#000"/> Salvar Imóvel</button>
      </div>
    </Modal>
  );
};
const FormVisita = ({ onSave, onClose, leads, imoveis, user }) => {
  const isAdmin = user.role==="admin";
  const [f,setF] = useState({lead:leads[0]?.nome||"",imovel:imoveis[0]?.titulo||"",corretor:user.nome,data:new Date().toISOString().split("T")[0],hora:"10:00",status:"agendada",obs:""});
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <Modal title="Agendar Visita" onClose={onClose}>
      <div className="form-g">
        <div className="fg"><label>Lead</label><select value={f.lead} onChange={e=>s("lead",e.target.value)}>{leads.map(l=><option key={l.id}>{l.nome}</option>)}</select></div>
        <div className="fg"><label>Imóvel</label><select value={f.imovel} onChange={e=>s("imovel",e.target.value)}>{imoveis.map(im=><option key={im.id}>{im.titulo}</option>)}</select></div>
        <div className="fg"><label>Corretor</label><select value={f.corretor} onChange={e=>s("corretor",e.target.value)} disabled={!isAdmin}>{USERS.map(u=><option key={u.id}>{u.nome}</option>)}</select></div>
        <div className="fg"><label>Data</label><input type="date" value={f.data} onChange={e=>s("data",e.target.value)}/></div>
        <div className="fg"><label>Hora</label><input type="time" value={f.hora} onChange={e=>s("hora",e.target.value)}/></div>
        <div className="fg"><label>Status</label><select value={f.status} onChange={e=>s("status",e.target.value)}><option value="agendada">Agendada</option><option value="realizada">Realizada</option><option value="cancelada">Cancelada</option></select></div>
        <div className="fg full"><label>Observações</label><textarea rows={3} value={f.obs} onChange={e=>s("obs",e.target.value)}/></div>
      </div>
      <div className="row-end gap8" style={{marginTop:16,paddingTop:14,borderTop:"1px solid #222"}}>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn-gold" onClick={()=>onSave({...f,id:uid()})}><Ic n="check" s={15} c="#000"/> Agendar</button>
      </div>
    </Modal>
  );const Dashboard = ({ leads, imoveis, visitas, user }) => {
  const admin = user.role==="admin";
  const mL = admin ? leads : leads.filter(l=>l.corretor===user.nome);
  const mV = admin ? visitas : visitas.filter(v=>v.corretor===user.nome);
  const ganhos = mL.filter(l=>l.status==="ganho");
  const ativos = mL.filter(l=>!["ganho","perdido"].includes(l.status));
  const conv = mL.length ? Math.round(ganhos.length/mL.length*100) : 0;
  const hoje = new Date().toISOString().split("T")[0];
  const kpis = [
    {l:admin?"Total Leads":"Meus Leads",v:mL.length,sub:`${ativos.length} ativos`,c:"#3b82f6",i:"u
};const LeadsPage = ({ leads, setLeads, user }) => {
  const admin = user.role==="admin";
  const [busca,setBusca] = useState("");
  const [fSt,setFSt] = useState("todos");
  const [fCor,setFCor] = useState(admin?"todos":user.nome);
  const [viewK,setViewK] = useState(false);
  const [modal,setModal] = useState(null);
  const [sel,setSel] = useState(null);
  const base = admin ? leads : leads.filter(l=>l.corretor===user.nome);
  const list = base.filter(l=>{
    const m=busca.toLowerCase();
    return (!m||l.nome.toLowerCase().includes(m)||l.email?.toLowerCase().includes(m)||l.bairro?.toLowerCase().includes(m))
      &&(fSt==="todos"||l.status===fSt)
      &&(fCor==="todos"||l.corretor===fCor);
  });
  const save = (l) => { setLeads(p=>p.some(x=>x.id===l.id)?p.map(x=>x.id===l.id?l:x):[l,...p]); setModal(null); };
  const del = () => { setLeads(p=>p.filter(l=>l.id!==sel.id)); setModal(null); };
  const move = (id,st) => setLeads(p=>p.map(l=>l.id===id?{...l,status:st}:l));
  const canEdit = l => admin||l.corretor===user.nome;
  return (
    <div className="page">
      <div className="page-hd">
        <div><h1>CRM — Leads</h1><p className="page-sub">{list.length} lead{list.length!==1?"s":""}</p></div>
        <divconst PipelinePage = ({ leads, setLeads, user }) => {
  const admin = user.role==="admin";
  const [drag,setDrag] = useState(null);
  const [over,setOver] = useState(null);
  const mL = admin ? leads : leads.filter(l=>l.corretor===user.nome);
  const pot = mL.filter(l=>!["ganho","perdido"].includes(l.status)).reduce((a,l)=>a+(+l.orc||0),0);
  const drop = (st) => { if(drag) setLeads(p=>p.ma
};const AgendaPage = ({ visitas, setVisitas, leads, imoveis, user }) => {
  const admin = user.role==="admin";
  const [modal,setModal] = useState(false);
  const [fDt,setFDt] = useState("");
  const [fSt,setFSt] = useState("todos");
  const mV = admin ? visitas : visitas.filter(v=>v.corretor===user.no
};export default function App() {
  const [user,setUser] = useState(null);
  const [pag,setPag] = useState("dash");
  const [leads,setLeads] = useState(LEADS0);
  const [imoveis,setImoveis] = useState(IMOVEIS0);
  const [visitas,setVisitas] = useState(VISITAS0);
  const [sideOpen,setSide] = useState(false);
  const [uMenu,setUMenu] = useState(false);

  if (!user) return (
    <>
      <style>{CSS}</style>
      <Login onLogin={u=>{setUser(u);setPag("dash");}}/>
    </>
  );

  const admin = user.role==="admin";
  const nav = [
    {id:"dash",l:"Dashboard",i:"home"},
    {id:"leads",l:"CRM / Leads",i:"users"},
    {id:"pipeline",l:"Pipeline",i:"funnel"},
    {id:"imoveis",l:"Imóveis",i:"build"},
    {id:"agenda",l:"Agenda",i:"cal"},
  ];
  const cnt = {
    leads: leads.length,
    agenda: visitas.filter(v=>v.status==="agendada"&&(admin||v.corretor===user.nome)).length,
    imoveis: imoveis.length,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <aside className={`sb${sideOpen?" open":""}`}>
          <div className="sb-brand">
            <div className="sb-mark">A</div>
            <diconst CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--g:#C9A96E;--g2:#e8d5b0;--bg:#0
