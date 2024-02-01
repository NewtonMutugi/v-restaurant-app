from flask_restful import Resource
from flask import Flask, make_response, jsonify, request, json, session
from configuration import db, mash, api, app
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from models import Address, Food, User, Review, Location, Reservation, Order, OrderItem
from flask_restful import Api, Resource, reqparse
import requests
# import base64
from datetime import datetime
from configuration import db, mash, api, app, auth
from flask_jwt_extended import create_access_token, jwt_required


class Index(Resource):
    def get(self):
        return make_response(
            "Venina API", 200
        )


api.add_resource(Index, '/')


def User_details(user):
    return make_response(
        {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone}, 200
    )


class Login(Resource):
    def post(self):
        user_signIn = request.get_json()
        password = user_signIn['password']
        user = User.query.filter_by(email=user_signIn['email']).first()

        if user:
            if user.authenticate(password):
                access_token = create_access_token(identity=user.email)
                return {'access_token': access_token}, 200

            return "Enter Correct Username or Password", 400
        return "No such user exists", 404


api.add_resource(Login, '/login')


class CheckSession(Resource):
    def get(self):
        user = session.get('user')
        user_info = User.query.filter_by(email=user).first()

        if user:
            return User_details(user_info)

        return "Please signIn to continue", 404


api.add_resource(CheckSession, '/checksession')


class Logout(Resource):
    def delete(self):
        user = session.get('user')

        if user:
            session['user'] = None

            return "LogOut Successful", 200
        return make_response("Method not allowed", 404)


api.add_resource(Logout, '/logout')


class UserSchema(mash.SQLAlchemySchema):

    class Meta:
        model = User
        load_instance = True

    id = mash.auto_field()
    first_name = mash.auto_field()
    last_name = mash.auto_field()
    email = mash.auto_field()
    phone = mash.auto_field()
    first_name = mash.auto_field()

    url = mash.Hyperlinks(
        {
            "self": mash.URLFor(
                "userbyid",
                values=dict(id="<id>")),
            "collection": mash.URLFor("users")
        }
    )


user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/userbyid/<int:id>', methods=['GET'])
def userbyid(id):
    user = User.query.get(id)
    if user is None:
        return make_response("User not found", 404)
    return make_response(user_schema.dump(user), 200)


class Users(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()

        return make_response(
            users_schema.dump(users), 200
        )


api.add_resource(Users, '/users')


class Signup(Resource):
    def post(self):
        user = request.get_json()
        # check whether the user exists via their email
        user_exists = User.query.filter_by(email=user['email']).first()

        if user_exists:
            return make_response(
                "User already exists", 400
            )
        new_user = User(
            first_name=user['first_name'],
            last_name=user['last_name'],
            email=user['email'],
            phone=user['phone'],
            password=user['password']
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response({
            'first_name': new_user.first_name,
            'last_name': new_user.last_name,
            'email': new_user.email,
            'phone': new_user.phone,
        }, 200)


api.add_resource(Signup, '/signup')


# class UserById(Resource):
#     def get(self, user_id):
#         user = User.query.get(user_id)
#         if user is None:
#             return {'message': 'User not found'}, 404
#         return user_schema.dump(user), 200


# api.add_resource(UserById, '/userbyid/<int:user_id>')


class ReviewResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('user_email', required=True)
    parser.add_argument('rating', required=True)
    parser.add_argument('feedback')

    @jwt_required()
    def post(self):
        data = ReviewResource.parser.parse_args()

        user = User.query.filter_by(email=data['user_email']).first()
        if not user:
            return {"error": "User not found"}, 404

        new_review = Review(
            user_id=user.id,
            rating=data['rating'],
            feedback=data.get('feedback', None)
        )

        db.session.add(new_review)
        db.session.commit()

        response_body = {
            "user_id": new_review.user_id(),
            "rating": new_review.rating(),
            "feedback": new_review.feedback()
        }

        return make_response("Success", 201)


api.add_resource(ReviewResource, '/review')

# Address


class Address(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()

        required_fields = ['user_email', 'city',
                           'area', 'street', 'building', 'room']
        if not all(field in data for field in required_fields):
            return make_response(jsonify({"error": "Missing required fields"}), 400)

        user = User.query.filter_by(email=data['user_email']).first()
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)

        new_address = Address(
            user_id=user.id,
            city=data['city'],
            area=data['area'],
            street=data['street'],
            building=data['building'],
            room=data['room'],
            notes=data.get('notes', None)
        )

        db.session.add(new_address)
        db.session.commit()

        response_body = {
            "id": new_address.id,
            "user_email": data['user_email'],
            "city": new_address.city,
            "area": new_address.area,
            "street": new_address.street,
            "building": new_address.building,
            "room": new_address.room,
            "notes": new_address.notes,
        }

        return make_response(jsonify(response_body), 201)


api.add_resource(Address, '/address')

# Menu


class Dishes(Resource):
    def get(self):
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


api.add_resource(Dishes, '/dishes')

# Locations


class Loction(Resource):
    def get(self):
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


api.add_resource(Loction, '/locations')


if __name__ == '__main__':
    # Modify the database to have pasw
    app.run(port=5000, debug=True)