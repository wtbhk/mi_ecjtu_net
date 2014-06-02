from flask import Flask
from flask import request
import redis
import json
import re
import time
app = Flask(__name__)

r = redis.Redis()

@app.route('/list')
def list():
	count = int(request.args.get('count'))
	start_from = int(request.args.get('start_from'))
	count = 200 if count>200 else count
	count = 50 if count<0 else count
	start_from = 0 if start_from<0 else start_from
	result = []
	mi_list = r.zrevrange('mi_list', start_from, start_from + count)
	for i in mi_list:
		result.append(r.hgetall('mi_'+str(i)))
	return json.dumps(result)

@app.route('/<id>/vote')
def vote(id):
	r.zincrby('mi_vote', 1, id)
	r.hincrby('mi_'+str(id), 'vote', 1)
	return json.dumps({'result':'success'})


@app.route('/new', methods=['POST'])
def new():
	pattern = re.compile(r'<\/?.*>')
	if pattern.match(request.form['content']) or pattern.match(request.form['author']):
		return json.dumps({'result':'error'})
	id = r.incr('mi_id')
	result = r.pipeline().hset('mi_'+str(id), 'author', request.form['author']).hset('mi_'+str(id), 'content', request.form['content']).hset('mi_'+str(id), 'vote', 0).zadd('mi_list', id, int(time.time())).zadd('mi_vote', id, 0).execute()
	if result:
		return json.dumps({'result':'success', 'id':id})

if __name__ == '__main__':
	app.run(host='0.0.0.0',debug=True)