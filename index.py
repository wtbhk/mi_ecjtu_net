from flask import Flask
from flask import request
app = Flask(__name__)


@app.route('/list')
def list():
	return request.args.get('count')


@app.route('/<int:id>/vote')
def vote(id):
	return str(id)


@app.route('/new', methods=['POST'])
def new():
	return request.form



if __name__ == '__main__':
	app.run(host='0.0.0.0')