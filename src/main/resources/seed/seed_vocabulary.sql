INSERT IGNORE INTO vocabulary (
    id,
    word,
    meaning,
    pronunciation,
    example_sentence,
    image_url,
    audio_url,
    topic_id
) VALUES
(1, 'cat', 'con meo', '/kaet/', 'The cat is sleeping on the chair.', 'https://example.com/images/cat.jpg', 'https://example.com/audio/cat.mp3', 1),
(2, 'dog', 'con cho', '/dog/', 'My dog likes to play in the park.', 'https://example.com/images/dog.jpg', 'https://example.com/audio/dog.mp3', 1),
(3, 'bird', 'con chim', '/berd/', 'A bird is singing in the tree.', 'https://example.com/images/bird.jpg', 'https://example.com/audio/bird.mp3', 1),
(4, 'rice', 'com; gao', '/rais/', 'I eat rice every day.', 'https://example.com/images/rice.jpg', 'https://example.com/audio/rice.mp3', 2),
(5, 'apple', 'qua tao', '/aep-uhl/', 'She eats an apple after lunch.', 'https://example.com/images/apple.jpg', 'https://example.com/audio/apple.mp3', 2),
(6, 'milk', 'sua', '/milk/', 'He drinks milk in the morning.', 'https://example.com/images/milk.jpg', 'https://example.com/audio/milk.mp3', 2),
(7, 'father', 'bo; cha', '/fah-ther/', 'My father works at a school.', 'https://example.com/images/father.jpg', 'https://example.com/audio/father.mp3', 3),
(8, 'mother', 'me', '/muh-ther/', 'Her mother is cooking dinner.', 'https://example.com/images/mother.jpg', 'https://example.com/audio/mother.mp3', 3),
(9, 'sister', 'chi gai; em gai', '/sis-ter/', 'I have one sister.', 'https://example.com/images/sister.jpg', 'https://example.com/audio/sister.mp3', 3);
