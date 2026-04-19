USE Voca_English;

-- READ: get all users
SELECT id, username, email, password, created_at
FROM `user`
ORDER BY id;

-- READ: get one user by id
SET @user_id = 1;

SELECT id, username, email, password, created_at
FROM `user`
WHERE id = @user_id;

-- CREATE: add a new user
SET @username = 'pham_dung';
SET @email = 'phamdung@example.com';
SET @password = 'password123';

INSERT INTO `user` (username, email, password)
VALUES (@username, @email, @password);

-- UPDATE: update an existing user
SET @user_id = 1;
SET @username = 'nguyen_an';
SET @email = 'nguyenan@example.com';
SET @password = 'new_password123';

UPDATE `user`
SET username = @username,
    email = @email,
    password = @password
WHERE id = @user_id;

-- DELETE: delete a user by id
-- Related user_progress rows are deleted automatically by ON DELETE CASCADE.
SET @user_id = 4;

DELETE FROM `user`
WHERE id = @user_id;

-- SEARCH: find users by username or email
SET @keyword = 'nguyen';

SELECT id, username, email, password, created_at
FROM `user`
WHERE username LIKE CONCAT('%', @keyword, '%')
   OR email LIKE CONCAT('%', @keyword, '%')
ORDER BY username;
