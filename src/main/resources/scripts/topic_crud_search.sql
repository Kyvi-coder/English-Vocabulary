USE Voca_English;

-- READ: get all topics
SELECT id, name, description
FROM topic
ORDER BY id;

-- READ: get one topic by id
SET @topic_id = 1;

SELECT id, name, description
FROM topic
WHERE id = @topic_id;

-- CREATE: add a new topic
SET @topic_name = 'Travel';
SET @topic_description = 'Vocabulary about travel and transportation.';

INSERT INTO topic (name, description)
VALUES (@topic_name, @topic_description);

-- UPDATE: update an existing topic
SET @topic_id = 1;
SET @topic_name = 'Animals';
SET @topic_description = 'Vocabulary about common animals and pets.';

UPDATE topic
SET name = @topic_name,
    description = @topic_description
WHERE id = @topic_id;

-- DELETE: delete a topic by id
-- This fails when vocabulary rows still reference the topic.
SET @topic_id = 4;

DELETE FROM topic
WHERE id = @topic_id;

-- SEARCH: find topics by name or description
SET @keyword = 'animal';

SELECT id, name, description
FROM topic
WHERE name LIKE CONCAT('%', @keyword, '%')
   OR description LIKE CONCAT('%', @keyword, '%')
ORDER BY name;
