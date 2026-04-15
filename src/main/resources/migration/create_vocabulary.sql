CREATE TABLE IF NOT EXISTS vocabulary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    meaning TEXT NOT NULL,
    pronunciation VARCHAR(100),
    example_sentence TEXT,
    image_url VARCHAR(255),
    audio_url VARCHAR(255),
    topic_id INT NOT NULL,
    CONSTRAINT fk_vocabulary_topic
        FOREIGN KEY (topic_id) REFERENCES topic(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
