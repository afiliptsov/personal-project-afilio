SELECT items.id, user_name, user_phone, user_avatar, item_category, item_title, item_price, item_description, item_location, item_lat, item_lng, images.image_url, user_id, priority, user_email
FROM users INNER JOIN items ON users.id = items.user_id INNER JOIN images ON images.post_id = items.id
WHERE items.id = $1;