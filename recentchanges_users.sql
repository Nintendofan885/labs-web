USE commonswiki_p;
SELECT COUNT(DISTINCT rc_user_text)
FROM recentchanges_compat
WHERE rc_comment LIKE "+1 POTY vote - eligible on%";
