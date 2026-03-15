"""
API для историй жителей Крыма.
GET / — список последних историй
POST / — добавить новую историю
"""
import json
import os
import pg8000.dbapi

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    from urllib.parse import urlparse, unquote
    p = urlparse(os.environ["DATABASE_URL"])
    conn = pg8000.dbapi.connect(
        user=unquote(p.username),
        password=unquote(p.password),
        host=p.hostname,
        port=p.port or 5432,
        database=p.path.lstrip("/"),
    )
    conn.autocommit = True
    return conn


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()
    cur = conn.cursor()

    if method == "GET":
        cur.execute(
            "SELECT id, author_name, city, story, to_char(created_at, 'DD.MM.YYYY') FROM crimea_stories ORDER BY created_at DESC LIMIT 20"
        )
        rows = cur.fetchall()
        stories = [
            {"id": r[0], "author_name": r[1], "city": r[2], "story": r[3], "created_at": r[4]}
            for r in rows
        ]
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"stories": stories}, ensure_ascii=False)}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author_name = (body.get("author_name") or "").strip()[:100]
        city = (body.get("city") or "").strip()[:100]
        story = (body.get("story") or "").strip()

        if not author_name or not story or len(story) < 10:
            conn.close()
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните имя и историю"}, ensure_ascii=False)}

        if len(story) > 2000:
            conn.close()
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "История слишком длинная (макс. 2000 символов)"}, ensure_ascii=False)}

        # Simple Query Protocol: экранируем вручную
        safe_name = author_name.replace("'", "''")
        safe_city = city.replace("'", "''")
        safe_story = story.replace("'", "''")
        cur.execute(
            f"INSERT INTO crimea_stories (author_name, city, story) VALUES ('{safe_name}', '{safe_city}', '{safe_story}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.close()
        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": new_id, "ok": True}, ensure_ascii=False)}

    conn.close()
    return {"statusCode": 405, "headers": CORS, "body": ""}