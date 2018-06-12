INSERT INTO images
    (post_id,image_url)
VALUES($1, $2)
RETURNING *;