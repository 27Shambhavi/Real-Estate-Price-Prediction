from flask import Flask,request,jsonify
from flask_cors import CORS
import util 

app=Flask(__name__)
CORS(app)

@app.route('/get_location_name')
def get_location_name():
    response = jsonify({
        'locations':util.get_location_name()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
   
@app.route('/predict_home_price',methods=['POST'])
def predict_home_price():
    try:
      total_sqft= float(request.form['total_sqft'])
      location = request.form['location']
      bhk= int(request.form['bhk'])
      bath= int(request.form['bath'])

      estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
      print(f"Estimated Price for {location} with {total_sqft} sqft, {bhk} BHK, {bath} Bath: {estimated_price}")
      response = jsonify({
            'estimated_price': estimated_price
    })
      return response
    except Exception as e:
        print(f"Error in predicting home price: {e}")
        return jsonify({'error': 'Error in prediction'}), 500
if __name__=="__main__":
    print("Starting Python flask server for Home Price Prediction.... ")
    util.load_saved_artifacts()
    app.run()
    