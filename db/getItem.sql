SELECT items.id, user_name, user_phone, user_avatar, item_category, item_title, item_price, item_description, item_location, item_picture, item_lat, item_lng
FROM users INNER JOIN items ON users.id = items.user_id
WHERE items.id = $1;