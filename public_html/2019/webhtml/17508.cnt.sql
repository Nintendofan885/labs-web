USE commonswiki_p;
SELECT
"2019" AS date,
COUNT(DISTINCT rev_user_text) AS count
FROM revision_compat
INNER JOIN page
ON rev_page = page_id
WHERE rev_comment LIKE "+1 POTY vote - eligible on%"
AND page_title LIKE "Picture_of_the_Year/2019/R1/v/%"
UNION ALL
SELECT
"2018" AS date,
COUNT(DISTINCT rev_user_text) AS count
FROM revision_compat
INNER JOIN page
ON rev_page = page_id
WHERE rev_comment LIKE "+1 POTY vote - eligible on%"
AND page_title LIKE "Picture_of_the_Year/2018/R1/v/%";;
