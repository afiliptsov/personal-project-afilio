UPDATE users
SET credits = credits+1
WHERE id=$1
RETURNING *;