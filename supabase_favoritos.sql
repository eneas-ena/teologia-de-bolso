-- ============================================================
-- Teólogo de Bolso PRO — tabela de sincronização de favoritos
-- Cole tudo isto no Supabase em: SQL Editor -> New query -> Run
-- ============================================================

create table if not exists tbp_favoritos (
  codigo        text primary key,
  dados         jsonb       not null default '[]'::jsonb,
  atualizado_em timestamptz not null default now()
);

-- Segurança: liga o RLS (Row Level Security) SEM criar políticas públicas.
-- Assim, a tabela só pode ser acessada pelo servidor (chave service_role),
-- nunca diretamente pelo navegador.
alter table tbp_favoritos enable row level security;
