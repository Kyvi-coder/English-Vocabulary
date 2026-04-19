CREATE TABLE IF NOT EXISTS vocabulary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    meaning TEXT NOT NULL,
    pronunciation VARCHAR(100),
    example_sentence TEXT,
    part_of_speech VARCHAR(50),
    topic_id INT NOT NULL,
    CONSTRAINT fk_vocabulary_topic
        FOREIGN KEY (topic_id) REFERENCES topic(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
