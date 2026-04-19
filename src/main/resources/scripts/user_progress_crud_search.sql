USE Voca_English;

-- READ: get all progress records with user and vocabulary details
SELECT up.id,
       up.user_id,
       u.username,
       up.vocabulary_id,
       v.word,
       up.learned,
       up.review_count,
       up.last_reviewed_at
FROM user_progress up
JOIN `user` u ON u.id = up.user_id
JOIN vocabulary v ON v.id = up.vocabulary_id
ORDER BY up.id;

-- READ: get one progress record by id
SET @progress_id = 1;

SELECT up.id,
       up.user_id,
       u.username,
       up.vocabulary_id,
       v.word,
       up.learned,
       up.review_count,
       up.last_reviewed_at
FROM user_progress up
JOIN `user` u ON u.id = up.user_id
JOIN vocabulary v ON v.id = up.vocabulary_id
WHERE up.id = @progress_id;

-- CREATE: add a new progress record
SET @user_id = 1;
SET @vocabulary_id = 3;
SET @learned = FALSE;
SET @review_count = 0;
SET @last_reviewed_at = NULL;

INSERT INTO user_progress (
    user_id,
    vocabulary_id,
    learned,
    review_count,
    last_reviewed_at
) VALUES (
    @user_id,
    @vocabulary_id,
    @learned,
    @review_count,
    @last_reviewed_at
);

-- UPDATE: update an existing progress record
SET @progress_id = 1;
SET @learned = TRUE;
SET @review_count = 4;
SET @last_reviewed_at = CURRENT_TIMESTAMP;

UPDATE user_progress
SET learned = @learned,
    review_count = @review_count,
    last_reviewed_at = @last_reviewed_at
WHERE id = @progress_id;

-- DELETE: delete a progress record by id
SET @progress_id = 10;

DELETE FROM user_progress
WHERE id = @progress_id;

-- SEARCH: find progress records by user id
SET @user_id = 1;

SELECT up.id,
       up.user_id,
       u.username,
       up.vocabulary_id,
       v.word,
       up.learned,
       up.review_count,
       up.last_reviewed_at
FROM user_progress up
JOIN `user` u ON u.id = up.user_id
JOIN vocabulary v ON v.id = up.vocabulary_id
WHERE up.user_id = @user_id
ORDER BY v.word;

-- SEARCH: find progress records by vocabulary id
SET @vocabulary_id = 1;

SELECT up.id,
       up.user_id,
       u.username,
       up.vocabulary_id,
       v.word,
       up.learned,
       up.review_count,
       up.last_reviewed_at
FROM user_progress up
JOIN `user` u ON u.id = up.user_id
JOIN vocabulary v ON v.id = up.vocabulary_id
WHERE up.vocabulary_id = @vocabulary_id
ORDER BY u.username;

-- SEARCH: find progress records by learned status
SET @learned = TRUE;

SELECT up.id,
       up.user_id,
       u.username,
       up.vocabulary_id,
       v.word,
       up.learned,
       up.review_count,
       up.last_reviewed_at
FROM user_progress up
JOIN `user` u ON u.id = up.user_id
JOIN vocabulary v ON v.id = up.vocabulary_id
WHERE up.learned = @learned
ORDER BY up.last_reviewed_at DESC;
