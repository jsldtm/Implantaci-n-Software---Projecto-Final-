-- 1_create_table_users.sql
CREATE TABLE IF NOT EXISTS Users (
  user_id BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(50) NOT NULL,
  user_password VARCHAR(20) NOT NULL,
  user_role VARCHAR(6) NOT NULL, -- [client/admin]
  created_at DATETIME,
  updated_at DATETIME
);
