const lendingSchema = `
  CREATE TABLE IF NOT EXISTS lendings ( 
    lendingId VARCHAR(255) PRIMARY KEY,
    gameName VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image VARCHAR(255) NOT NULL,
    lendingPeriod INT NOT NULL CHECK (lendingPeriod > 0),
    userId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
  );
`;
 
module.exports = lendingSchema;
