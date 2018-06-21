SELECT DISTINCT ON
(i.id,priority) i.id,u.id AS user_id, user_name, user_phone, user_avatar,
       item_category, item_title, item_price, item_description,
       item_location, item_lat, item_lng, im.image_url, priority
FROM users u INNER JOIN
     items i
     ON u.id = i.user_id INNER JOIN
     images im
     ON im.post_id = i.id
ORDER BY priority DESC;