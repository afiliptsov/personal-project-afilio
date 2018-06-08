INSERT INTO items
    (user_id,item_category,item_title,item_price,item_description,item_location,item_picture,item_lat,item_lng)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;