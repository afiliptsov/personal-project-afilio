INSERT INTO users
    (user_name,authid)
VALUES($1, $2)
RETURNING *;