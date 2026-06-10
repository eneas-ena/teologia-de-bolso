// api/sync.js — sincronização de favoritos do "Teólogo de Bolso PRO"
// Guarda os favoritos num cofre central (Supabase), identificados por um código pessoal.
// As credenciais do banco ficam SÓ aqui no servidor; o navegador nunca as vê.
//
// Variáveis de ambiente necessárias na Vercel:
//   SUPABASE_URL  -> a URL do projeto (ex.: https://xxxx.supabase.co)
//   SUPABASE_KEY  -> a chave "service_role" do Supabase (secreta)

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }
  const URL = process.env.SUPABASE_URL;
  const KEY = process.env.SUPABASE_KEY;
  if (!URL || !KEY) {
    res.status(500).json({ error: "Sincronização não configurada no servidor." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const acao = body && body.acao;
  const codigo = body && String(body.codigo || "").trim().toLowerCase();
  if (!codigo) {
    res.status(400).json({ error: "Código vazio." });
    return;
  }

  const base = URL.replace(/\/$/, "") + "/rest/v1/tbp_favoritos";
  const headers = {
    "apikey": KEY,
    "Authorization": "Bearer " + KEY,
    "content-type": "application/json",
  };

  try {
    if (acao === "get") {
      const r = await fetch(base + "?codigo=eq." + encodeURIComponent(codigo) + "&select=dados", { headers });
      const arr = await r.json();
      const dados = (Array.isArray(arr) && arr[0] && Array.isArray(arr[0].dados)) ? arr[0].dados : [];
      res.status(200).json({ dados });
      return;
    }
    if (acao === "set") {
      const dados = (body && Array.isArray(body.dados)) ? body.dados : [];
      const r = await fetch(base, {
        method: "POST",
        headers: Object.assign({}, headers, { "Prefer": "resolution=merge-duplicates,return=minimal" }),
        body: JSON.stringify({ codigo, dados, atualizado_em: new Date().toISOString() }),
      });
      if (!r.ok) {
        const t = await r.text();
        res.status(502).json({ error: "Falha ao salvar: " + t });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }
    res.status(400).json({ error: "Ação inválida." });
  } catch (e) {
    res.status(500).json({ error: "Falha na sincronização: " + String(e) });
  }
};
