-- Esquema PostgreSQL para refrigeration-services (PostgreSQL 13+).
-- Aplicar con: npm run db:setup

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  CREATE TYPE quote_status AS ENUM ('nuevo', 'contactado', 'cotizado', 'ganado', 'perdido', 'spam');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  features text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  company text CHECK (char_length(company) <= 160),
  email text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text CHECK (char_length(phone) <= 30),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 2 AND 160),
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 5000),
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  status quote_status NOT NULL DEFAULT 'nuevo',
  internal_notes text,
  source text NOT NULL DEFAULT 'web',
  ip_hash text,
  user_agent text,
  email_sent boolean NOT NULL DEFAULT false,
  contacted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quote_requests_status_created_idx ON quote_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_email_idx ON quote_requests (lower(email));
CREATE INDEX IF NOT EXISTS quote_requests_ip_hash_idx ON quote_requests (ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  is_real_photo boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text,
  is_authorized boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  author_name text NOT NULL,
  author_role text,
  quote text NOT NULL,
  is_verified boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT is_published OR is_verified)
);

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_services_updated ON services;
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS trg_quote_requests_updated ON quote_requests;
CREATE TRIGGER trg_quote_requests_updated BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS trg_gallery_items_updated ON gallery_items;
CREATE TRIGGER trg_gallery_items_updated BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS trg_clients_updated ON clients;
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS trg_testimonials_updated ON testimonials;
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS trg_site_settings_updated ON site_settings;
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

INSERT INTO services (slug, title, description, icon, features, sort_order) VALUES
  ('mantenimiento-preventivo', 'Mantenimiento Preventivo', 'Programas de mantenimiento diseñados para prevenir fallas y extender la vida útil de tus equipos.', 'Wrench', ARRAY['Inspecciones regulares', 'Limpieza especializada', 'Calibración de sistemas'], 1),
  ('reparacion-de-equipos', 'Reparación de Equipos', 'Diagnóstico y reparación especializada de todo tipo de sistemas de refrigeración industrial.', 'Settings', ARRAY['Diagnóstico preciso', 'Repuestos originales', 'Garantía en reparaciones'], 2),
  ('instalacion-de-sistemas', 'Instalación de Sistemas', 'Instalación profesional de nuevos sistemas de refrigeración adaptados a tus necesidades.', 'Thermometer', ARRAY['Diseño personalizado', 'Instalación certificada', 'Puesta en marcha'], 3),
  ('emergencias-24-7', 'Emergencias 24/7', 'Servicio de emergencia disponible las 24 horas para atender fallas críticas.', 'Zap', ARRAY['Respuesta inmediata', 'Técnicos disponibles', 'Soluciones rápidas'], 4),
  ('certificaciones', 'Certificaciones', 'Certificaciones y documentación técnica para cumplimiento normativo.', 'Shield', ARRAY['Certificados oficiales', 'Documentación técnica', 'Cumplimiento normativo'], 5),
  ('modernizacion', 'Modernización', 'Actualización de sistemas obsoletos con tecnología moderna y eficiente.', 'Clock', ARRAY['Tecnología actual', 'Mayor eficiencia', 'Ahorro energético'], 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO site_settings (key, value, description) VALUES
  ('phone_primary', '+573165371453', 'Teléfono principal (formato internacional)'),
  ('phone_secondary', '+573184748117', 'Teléfono secundario'),
  ('email', 'contacto@gpsegurosrefrigeracion.com', 'TODO confirmar correo oficial'),
  ('city', 'Bogotá, Colombia', 'Ubicación'),
  ('hours_weekdays', 'Lun - Vie: 7:00 AM - 6:00 PM', NULL),
  ('hours_saturday', 'Sáb: 8:00 AM - 2:00 PM', NULL)
ON CONFLICT (key) DO NOTHING;

INSERT INTO clients (name, logo_url, sort_order) VALUES
  ('Inducol', '/inducol-logo-industrial.png', 1),
  ('Wonder', '/wonder-food-logo.png', 2),
  ('Agrosavia', '/agrosavia-logo.png', 3),
  ('Freskaleche', '/freskaleche-logo.png', 4),
  ('Lácteos del Valle', '/lacteos-del-valle-logo.png', 5)
ON CONFLICT (name) DO NOTHING;

-- Solo si se usa Supabase con clave anon en el navegador se requiere RLS.
-- Las operaciones del formulario ocurren en la API de Next.js con DATABASE_URL
-- del servidor; nunca expongas esa variable al cliente.
