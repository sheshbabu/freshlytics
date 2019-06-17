-- up migration

-- password inserted is 'hunter2' using bcrypt 12 rounds

INSERT INTO Users (
  id, name, password
) VALUES ('100', 'admin', '$2b$10$xJeEMQUMPU37bAuaos10Xe/1A4n4GwAKUKHvpUIEZbru7gp6k6qqe');