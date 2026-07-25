-- Usuario inicial de desarrollo: admin@coincontrol.local / Admin123!
INSERT INTO users (email, password_hash)
VALUES (
  'admin@coincontrol.local',
  '$2b$12$NVIaJIeSTrNjK/38MqzSluI28mzj5YuesCoW2b3w/5VDjt3jDsm7u'
)
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;
