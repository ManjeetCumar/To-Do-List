from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql6588183:NjqHuVi4ee@sql6.freesqldatabase.com/sql6588183'
# app.config['MYSQL_HOST'] = 'sql6.freesqldatabase.com'
# app.config['MYSQL_USER'] = 'sql6588183'
# app.config['MYSQL_PASSWORD'] = 'NjqHuVi4ee'
# app.config['MYSQL_DB'] = 'sql6588183'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False

#instantiate db object
db = SQLAlchemy(app)

app.app_context().push()

# instantiate marshmallow object
ma = Marshmallow(app)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(db.String(120), nullable=False)
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        super().__init__()
        self.title = title
        self.body = body

    def __repr__(self):
        return '<Title %r>' % self.title

# create User db schema
class ArticleSchema(ma.Schema):
    class Meta:
        fields= ('id','title','body', 'date')

#create instances of schema

article_schema = ArticleSchema(many= False)
articles_schema = ArticleSchema(many = True)

@app.route('/', methods = ['GET'])
def get_articles():
    all_articles = Article.query.all()
    results =  articles_schema.dump(all_articles)
    return jsonify(results)

@app.route('/get/<id>', methods = ['GET'])
def post_details(id):
    article_searched = Article.query.get(id)
    return article_schema.jsonify(article_searched)

@app.route('/add', methods = ["POST"])
def add_article():

    try:
        title = request.json['title']
        body = request.json['body']
        print('Hi!')

        new_article = Article( title = title, body = body)
        db.session.add(new_article)
        db.session.commit()

        return article_schema.jsonify(new_article)

    except Exception as e:
        return jsonify({'Error': e})

@app.route('/update/<id>', methods = ['PUT'])
def update_article(id):
    tob_update = Article.query.get(id)

    title = request.json['title']
    body = request.json['body']

    tob_update.title = title
    tob_update.body = body

    db.session.commit()
    return article_schema.jsonify(tob_update)

@app.route('/delete/<id>', methods = ['DELETE'])
def delete_article(id):
    tob_deleted = Article.query.get(id)
    db.session.delete(tob_deleted)
    db.session.commit()

    return article_schema.jsonify(tob_deleted)


if __name__ == "__main__":
    app.run(debug=True)