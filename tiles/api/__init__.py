import os

from flask import Flask, request, jsonify, redirect, url_for, send_file
import werkzeug
from werkzeug.utils import secure_filename

import subprocess

# GLOBAL VARIABLES
UPLOAD_TILES_FOLDER = 'images/tiles'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# APP INIT & CONFIG
app = Flask(__name__, instance_relative_config=True, static_url_path='/public', static_folder='public')
app.config['UPLOAD_TILES_FOLDER'] = UPLOAD_TILES_FOLDER
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

# PRIVATE CUSTOM METHODS
def create_tiles(dir_path, img_path):
  src = os.path.realpath(img_path)
  dest = os.path.realpath(dir_path)
  string = "gdal2tiles -p raster --xyz -z 0-5 -w leaflet {} {}".format(src, dest)

  subprocess.run(string, shell=True)

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



# APP ROUTES
@app.errorhandler(werkzeug.exceptions.InternalServerError)
def handle_error_occured(e):
  return 'error occured' + str(e), 500

@app.route('/', methods=['GET'])
def home():
  return jsonify(message="Success ! Welcome to DM Tiles", status=200);

@app.route('/tiles', methods=['GET', 'POST', 'DELETE'])
def tiles():
  if request.method == 'POST':
    try:
      map_name = request.form.get('mapName')
      uploaded_file = request.files['originalFileName']

      if uploaded_file.filename == '':
        return jsonify(message="No file selected", status=400);

      if allowed_file(uploaded_file.filename) == False:
        return jsonify(message="Invalid file format", status=400);

      if uploaded_file and allowed_file(uploaded_file.filename):
        # Create map directory
        map_dir_path=os.path.join(app.static_folder, app.config['UPLOAD_TILES_FOLDER'], map_name)
        if not os.path.exists(map_dir_path):
          os.makedirs(map_dir_path)

        # Save uploaded file
        map_path=os.path.join(map_dir_path, secure_filename(uploaded_file.filename))
        uploaded_file.save(map_path)

        create_tiles(map_dir_path, map_path)

        return jsonify(message="Success", map_dir_path=map_dir_path, map_path=map_path, status=200);

    except Exception as e:
      print(e)
      return jsonify(message="Failed. Exception raised.", status=500, code=e.code, name=e.name, description=e.description);

  if request.method == 'GET':
    return jsonify(message="Tiles !", status=200);
    #   return jsonify(message="Success", map_original_file_path=map_original_file_path, map_path=map_path, status=200);
    #     # return jsonify(message="Success", status=200);
  else:
    return jsonify(message="Failed because why not", status=405);

@app.route('/tiles/<path:subpath>', methods=['GET'])
def tiles_serve(subpath):
  if request.method == 'GET':
    print('SUBPATH', subpath)
    return send_file(os.path.join(app.static_folder, app.config['UPLOAD_TILES_FOLDER'], subpath))
  else:
    return jsonify(message="Failed because why not", status=405);

if __name__ == "__main__":
    app.run(debug=True)