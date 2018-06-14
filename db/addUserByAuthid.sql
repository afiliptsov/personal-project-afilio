INSERT INTO users
    (user_name,authid,user_avatar)
VALUES($1, $2, $3)
RETURNING *;