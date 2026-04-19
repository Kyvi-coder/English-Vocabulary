INSERT IGNORE INTO vocabulary (
    id,
    word,
    meaning,
    pronunciation,
    example_sentence,
    part_of_speech,
    topic_id
) VALUES
(1, 'cat', 'con meo', '/kaet/', 'The cat is sleeping on the chair.', 'noun', 1),
(2, 'dog', 'con cho', '/dog/', 'My dog likes to play in the park.', 'noun', 1),
(3, 'bird', 'con chim', '/berd/', 'A bird is singing in the tree.', 'noun', 1),
(4, 'rice', 'com; gao', '/rais/', 'I eat rice every day.', 'noun', 2),
(5, 'apple', 'qua tao', '/aep-uhl/', 'She eats an apple after lunch.', 'noun', 2),
(6, 'milk', 'sua', '/milk/', 'He drinks milk in the morning.', 'noun', 2),
(7, 'father', 'bo; cha', '/fah-ther/', 'My father works at a school.', 'noun', 3),
(8, 'mother', 'me', '/muh-ther/', 'Her mother is cooking dinner.', 'noun', 3),
(9, 'sister', 'chi gai; em gai', '/sis-ter/', 'I have one sister.', 'noun', 3);
