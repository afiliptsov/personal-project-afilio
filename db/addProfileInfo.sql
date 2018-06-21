UPDATE users
    SET user_phone = $1,user_name = $2,user_email = $3 WHERE id = $4
RETURNING *;