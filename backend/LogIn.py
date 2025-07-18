from flask import Flask, request, render_template, redirect, url_for, session, flash
from pymongo import MongoClient
import bcrypt
import uuid

app = Flask(__name__)
app.secret_key = str(uuid.uuid4())  # Secure random secret key for sessions

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['task_app']
users_collection = db['users']

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password'].encode('utf-8')

    user = users_collection.find_one({'email': email})
    if user and bcrypt.checkpw(password, user['password_hash']):
        session['user_id'] = str(user['_id'])
        session['username'] = user['username']
        flash('Login successful!', 'success')
        return redirect(url_for('dashboard'))
    else:
        flash('Invalid email or password', 'error')
        return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    return f"Welcome, {session['username']}!"

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('Logged out successfully', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)