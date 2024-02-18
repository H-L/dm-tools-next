import os

from flask import Flask
from flask import request, jsonify

import subprocess

def create_tiles(source_path, destination_path):
  src = os.path.realpath(source_path)
  dest = os.path.realpath(destination_path)
  string = "gdal2tiles.py -p raster --xyz -z 0-5 -w leaflet {} {}".format(src, dest)

  subprocess.run(string, shell=True)


# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

# a simple page that says hello
@app.route('/tiles', methods = ['GET', 'POST', 'DELETE'])
def tiles():
  if request.method == 'POST':
    map_path = request.form.get('mapPath')
    map_name = request.form.get('mapName')

    create_tiles(map_path, 'public/images/tiles/{map_name}'.format(map_name))

    return jsonify(message="Success", status=200);
  if request.method == 'GET':
      return jsonify(message="Success", status=200);
  else:
    return jsonify(message="Failed", status=405);

if __name__ == "__main__":
  app.run(host='0.0.0.0')