USE commonswiki_p;
SELECT
  DATE(CONCAT(YEAR(rc_timestamp),"-",MONTH(rc_timestamp),"-",DAY(rc_timestamp))) AS day,
  COUNT(DISTINCT rc_user) AS POTY_users
FROM recentchanges_compat
WHERE rc_comment LIKE "%POTY vote - eligible on%"
GROUP BY day;
