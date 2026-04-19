ALTER TABLE vocabulary
    ADD COLUMN part_of_speech VARCHAR(50),
    DROP COLUMN image_url,
    DROP COLUMN audio_url;
