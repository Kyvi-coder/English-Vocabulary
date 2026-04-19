USE Voca_English;

-- READ: get all vocabulary with topic name
SELECT v.id,
       v.word,
       v.meaning,
       v.pronunciation,
       v.example_sentence,
       v.part_of_speech,
       v.topic_id,
       t.name AS topic_name
FROM vocabulary v
JOIN topic t ON t.id = v.topic_id
ORDER BY v.id;

-- READ: get one vocabulary item by id
SET @vocabulary_id = 1;

SELECT v.id,
       v.word,
       v.meaning,
       v.pronunciation,
       v.example_sentence,
       v.part_of_speech,
       v.topic_id,
       t.name AS topic_name
FROM vocabulary v
JOIN topic t ON t.id = v.topic_id
WHERE v.id = @vocabulary_id;

-- CREATE: add a new vocabulary item
SET @word = 'train';
SET @meaning = 'tau hoa';
SET @pronunciation = '/trein/';
SET @example_sentence = 'The train arrives at nine o clock.';
SET @part_of_speech = 'noun';
SET @topic_id = 1;

INSERT INTO vocabulary (
    word,
    meaning,
    pronunciation,
    example_sentence,
    part_of_speech,
    topic_id
) VALUES (
    @word,
    @meaning,
    @pronunciation,
    @example_sentence,
    @part_of_speech,
    @topic_id
);

-- UPDATE: update an existing vocabulary item
SET @vocabulary_id = 1;
SET @word = 'cat';
SET @meaning = 'con meo';
SET @pronunciation = '/kaet/';
SET @example_sentence = 'The cat is sleeping on the chair.';
SET @part_of_speech = 'noun';
SET @topic_id = 1;

UPDATE vocabulary
SET word = @word,
    meaning = @meaning,
    pronunciation = @pronunciation,
    example_sentence = @example_sentence,
    part_of_speech = @part_of_speech,
    topic_id = @topic_id
WHERE id = @vocabulary_id;

-- DELETE: delete a vocabulary item by id
-- Related user_progress rows are deleted automatically by ON DELETE CASCADE.
SET @vocabulary_id = 10;

DELETE FROM vocabulary
WHERE id = @vocabulary_id;

-- SEARCH: find vocabulary by word, meaning, example sentence, part of speech, or topic name
SET @keyword = 'cat';

SELECT v.id,
       v.word,
       v.meaning,
       v.pronunciation,
       v.example_sentence,
       v.part_of_speech,
       v.topic_id,
       t.name AS topic_name
FROM vocabulary v
JOIN topic t ON t.id = v.topic_id
WHERE v.word LIKE CONCAT('%', @keyword, '%')
   OR v.meaning LIKE CONCAT('%', @keyword, '%')
   OR v.example_sentence LIKE CONCAT('%', @keyword, '%')
   OR v.part_of_speech LIKE CONCAT('%', @keyword, '%')
   OR t.name LIKE CONCAT('%', @keyword, '%')
ORDER BY v.word;

-- SEARCH: find vocabulary by topic id
SET @topic_id = 1;

SELECT id,
       word,
       meaning,
       pronunciation,
       example_sentence,
       part_of_speech,
       topic_id
FROM vocabulary
WHERE topic_id = @topic_id
ORDER BY word;
