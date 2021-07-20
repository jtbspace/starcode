from flask import Flask, render_template,request

import re

import numpy as np

import sys 

import os

import base64
from PIL import Image
from io import BytesIO

from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image
from keras.models import model_from_json
from pathlib import Path


app = Flask(__name__)	

script_location = Path(__file__).absolute().parent
json_file_location = script_location / 'models/models.json'
#file = file_location.open()

json_file = json_file_location.open()
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

loaded_model.load_weights(script_location / "models.h5")

def model_predict(img_path, model):
    test_image = image.load_img(img_path, target_size = (280, 280))
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis = 0)
    os.remove(img_path)
    preds = model.predict(test_image)
    return preds

@app.route('/')
def index():
	return render_template("starfinder.html")

@app.route('/site')
def site():
	#initModel()
	#render out pre-built HTML file right on the index page
	return render_template("starfinder.html")

@app.route('/model')
def model():
	return render_template("index.html")


@app.route('/predict/',methods=['GET','POST'])
def predict():
	if request.method == 'POST':
		file = request.get_data()
		# saving / gettingimage 
		#print(file)
		my_bytes = file.replace(b'data:image/png;base64,',b'')
		#print(my_bytes)
		im = Image.open(BytesIO(base64.b64decode(my_bytes)))
		im.save('test.png', 'PNG')
		# sending model..
		preds = model_predict('test.png', loaded_model)
			# Pocess your result for human
			# pred_class = preds.argmax(axis=-1)            # Simple argmax
		constellations = ['Apus','Auriga','Camelopardalis','Cassiopeia','Chamaeleon','Circinus','Crux','Dorado','Indus','Musca','Reticulum','Triangulum Australe','Tucana','Ursa Minor/Ursa Major']
		e = np.argmax(preds,axis=1)
		e=int(e)
		print(constellations[e])
		return constellations[e]
	

if __name__ == "__main__":
	#decide what port to run the app in
	port = int(os.environ.get('PORT', 5000))
	#run the app locally on the givn port
	app.run()
	#optional if we want to run in debugging mode
	#app.run(debug=True)
