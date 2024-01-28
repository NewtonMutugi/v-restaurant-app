from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import MetaData, Table, inspect
from models import Location, db, Food, User
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

with app.app_context():
    # Check if the 'foods' table exists
    db.create_all()
    inspector = inspect(db.engine)
    if 'foods' in inspector.get_table_names():
        print("The 'foods' table exists.")
    else:
        print("The 'foods' table does not exist.")

    # Check if the 'foods' table exists
    inspector = inspect(db.engine)
    if 'foods' in inspector.get_table_names():
        print("The 'foods' table exists.")
        # print all table names
        print(inspector.get_table_names())
    else:
        print("The 'foods' table does not exist.")


@app.route('/user', methods=['POST'])
def register_user():
    data = request.get_json()

    required_fields = ['first_name', 'last_name', 'email', 'phone', 'password']
    if not all(field in data for field in required_fields):
        return make_response(jsonify({"error": "Missing required fields"}), 400)

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return make_response(jsonify({"error": "User with this email already exists"}), 409)

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        password=data['password']
    )

    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "id": new_user.id,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "email": new_user.email,
        "phone": new_user.phone,
        "created_at": new_user.created_at,
    }

    return make_response(jsonify(response_body), 201)


@app.route('/user/<email>', methods=['GET'])
def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()

    if user:
        response_body = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "created_at": user.created_at,
        }
        return make_response(jsonify(response_body), 200)
    else:
        return make_response(jsonify({"error": "User not found"}), 404)


@app.route('/dishes', methods=['GET'])
def get_foods():
    foods = []
    for food in Food.query.all():
        response_body = {
            "id": food.id,
            "name": food.name,
            "image": food.image,
            "description": food.description,
            "price": food.price
        }
        foods.append(response_body)

    response = make_response(
        jsonify(foods),
        200
    )
    return response

# class FoodClass(Resource):
#     def post(self):
#         data = request.get_json()
#         new_food = Food(
#             id = data['id'],
#             name = data['name'],
#             image = data['image'],
#             description = data['description'],
#             price = data['price']

#         )
#         db.session.add(new_food)
#         db.session.commit()

#         response_data = {
#             "id":new_food.id,
#             "name":new_food.name,
#             "image":new_food.image,
#             "description":new_food.description,
#             "price":new_food.price
#         }

#         if new_food:
#             return make_response(
#                 jsonify(response_data),
#                 200
#             )
#         else:
#             return make_response(
#                 jsonify({
#                     "message": "Not found"
#                 })
#             )

# api.add_resource(FoodClass, '/foods')


@app.route('/locations', methods=['GET'])
def get_locations():
    locations = []
    for location in Location.query.all():
        response_body = {
            "id": location.id,
            "name": location.name,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "delivery_fee": location.delivery_fee
        }
        locations.append(response_body)
    response = make_response(
        jsonify(locations),
        200
    )
    return response


@app.route('/locations/<int:id>', methods=['GET'])
def get_location(id):
    location = Location.query.get(id)
    if location is None:
        return make_response(jsonify({"message": "Location not found"}), 404)
    response_body = {
        "id": location.id,
        "name": location.name,
        "latitude": location.latitude,
        "longitude": location.longitude
    }
    return make_response(jsonify(response_body), 200)


@app.route('/distance', methods=['GET'])
def get_distance():
    origin = request.args.get('origins')
    destination = request.args.get('destinations')
    api_key = request.args.get('key')
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={}&destinations={}&key={}".format(
        origin, destination, api_key)
    response = requests.get(url)
    print(response.json())
    return response.json()


if __name__ == '__main__':
    app.run(debug=True)
