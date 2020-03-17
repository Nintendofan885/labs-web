# New count authored by Zhuyifei1999
# https://quarry.wmflabs.org/query/27580
USE commonswiki_p;
SELECT NOW();

SELECT
  year,
  `round`,
  (
    SELECT COUNT(DISTINCT rev_actor)
    FROM revision_userindex
    INNER JOIN page
    ON rev_page = page_id
    WHERE page_namespace = 4
    AND page_title LIKE expression
    -- AND rev_comment LIKE '+1 POTY vote - eligible on%'
  ) AS `count`,
  expression
FROM (
  SELECT 
    year,
    `round`,
    CONCAT('Picture_of_the_Year/', year, '/', `round`, '/v/%') AS expression
  FROM 
    -- https://stackoverflow.com/a/6871220
    (
      SELECT @num:=@num+1 AS year
      FROM page, (SELECT @num:=2010) num
      LIMIT 9
    ) years,
    (
      SELECT 'R1' AS `round` UNION
      SELECT 'R2' AS `round`
    ) rounds
  ) allrounds;

/*
16 rows in set (7.16 sec)

+------+--------------------+-----------------------+--------+------------------------------------------------+---------------------+---------+-----------------------------+----------+------------------------------------+
| id   | select_type        | table                 | type   | possible_keys                                  | key                 | key_len | ref                         | rows     | Extra                              |
+------+--------------------+-----------------------+--------+------------------------------------------------+---------------------+---------+-----------------------------+----------+------------------------------------+
|    1 | PRIMARY            | <derived3>            | ALL    | NULL                                           | NULL                | NULL    | NULL                        |       16 |                                    |
|    3 | DERIVED            | <derived6>            | ALL    | NULL                                           | NULL                | NULL    | NULL                        |        2 |                                    |
|    3 | DERIVED            | <derived4>            | ALL    | NULL                                           | NULL                | NULL    | NULL                        |        8 | Using join buffer (flat, BNL join) |
|    6 | DERIVED            | NULL                  | NULL   | NULL                                           | NULL                | NULL    | NULL                        |     NULL | No tables used                     |
|    7 | UNION              | NULL                  | NULL   | NULL                                           | NULL                | NULL    | NULL                        |     NULL | No tables used                     |
| NULL | UNION RESULT       | <union6,7>            | ALL    | NULL                                           | NULL                | NULL    | NULL                        |     NULL |                                    |
|    4 | DERIVED            | <derived5>            | system | NULL                                           | NULL                | NULL    | NULL                        |        1 |                                    |
|    4 | DERIVED            | page                  | index  | NULL                                           | page_len            | 4       | NULL                        | 64397112 | Using index                        |
|    5 | DERIVED            | NULL                  | NULL   | NULL                                           | NULL                | NULL    | NULL                        |     NULL | No tables used                     |
|    2 | DEPENDENT SUBQUERY | page                  | ref    | PRIMARY,name_title                             | name_title          | 4       | const                       |  2642218 | Using where; Using index           |
|    2 | DEPENDENT SUBQUERY | revision              | ref    | page_timestamp,page_user_timestamp,rev_page_id | page_user_timestamp | 4       | commonswiki.page.page_id    |        1 | Using where                        |
|    2 | DEPENDENT SUBQUERY | revision_comment_temp | ref    | PRIMARY,revcomment_rev                         | PRIMARY             | 4       | commonswiki.revision.rev_id |        1 | Using index                        |
+------+--------------------+-----------------------+--------+------------------------------------------------+---------------------+---------+-----------------------------+----------+------------------------------------+
*/
