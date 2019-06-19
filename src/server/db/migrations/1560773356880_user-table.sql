-- up migration

CREATE TABLE Users (
  id SERIAL,
  name text,
  password text
);

