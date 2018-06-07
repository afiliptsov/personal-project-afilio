UPDATE users
    SET user_phone = $1,user_avatar=$2,user_address=$3 WHERE id = $4
RETURNING *;