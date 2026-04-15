INSERT IGNORE INTO user_progress (
    id,
    user_id,
    vocabulary_id,
    learned,
    review_count,
    last_reviewed_at
) VALUES
(1, 1, 1, TRUE, 3, '2026-04-15 10:00:00'),
(2, 1, 2, TRUE, 2, '2026-04-15 10:10:00'),
(3, 1, 4, FALSE, 0, NULL),
(4, 2, 3, TRUE, 1, '2026-04-15 10:20:00'),
(5, 2, 5, FALSE, 0, NULL),
(6, 2, 7, TRUE, 4, '2026-04-15 10:30:00'),
(7, 3, 6, TRUE, 2, '2026-04-15 10:40:00'),
(8, 3, 8, FALSE, 0, NULL),
(9, 3, 9, TRUE, 1, '2026-04-15 10:50:00');
