UPDATE items
SET priority = 1
WHERE id=$1
RETURNING*