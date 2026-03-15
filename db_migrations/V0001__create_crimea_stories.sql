CREATE TABLE crimea_stories (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  story TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);