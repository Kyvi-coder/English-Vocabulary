CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vocabulary_id INT NOT NULL,
    learned BOOLEAN NOT NULL DEFAULT FALSE,
    review_count INT NOT NULL DEFAULT 0,
    last_reviewed_at TIMESTAMP NULL,
    CONSTRAINT fk_user_progress_user
        FOREIGN KEY (user_id) REFERENCES `user`(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_user_progress_vocabulary
        FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT uq_user_progress_user_vocabulary
        UNIQUE (user_id, vocabulary_id)
);
