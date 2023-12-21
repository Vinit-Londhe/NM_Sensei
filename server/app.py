# app/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from sympy import Symbol, lambdify
import numpy as np
from numpy.linalg import solve
from sympy import *
from sympy import symbols, parse_expr, diff

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def bisection_method(func, a, b, tolerance, max_iterations):
    iteration = 0
    results = []

    if a is None or b is None:
        raise ValueError("Invalid values for 'a' or 'b'")

    while iteration < max_iterations:
        c = a + (b - a) / 2
        fc = func(c)

        result = {
            "iteration": iteration,
            "a": a,
            "b": b,
            "c": c,
            "fc": fc,
        }

        results.append(result)

        if abs(b - a) < tolerance or fc == 0:
            # If the interval is small enough or the function value is exactly zero, continue iterating
            iteration += 1
            continue

        iteration += 1

        if func(a) * fc < 0:
            b = c
        else:
            a = c

    # If the maximum number of iterations is reached without convergence
    results.append({
        "iteration": iteration,
        "a": a,
        "b": b,
        "c": a + (b - a) / 2,
        "fc": func(a + (b - a) / 2),
    })

    answer_iteration = iteration - 1  # Answer found at the previous iteration
    message = f"Answer found  {c} \n at {answer_iteration} th Iteration "

    return results, answer_iteration, message

def false_position_method(func, a, b, tolerance, max_iterations):
    iteration = 0
    results = []

    if a is None or b is None:
        raise ValueError("Invalid values for 'a' or 'b'")

    while iteration < max_iterations:
        fa = func(a)
        fb = func(b)

        c = (a * fb - b * fa) / (fb - fa)
        fc = func(c)

        result = {
            "iteration": iteration,
            "a": a,
            "b": b,
            "c": c,
            "fa": fa,
            "fb": fb,
            "fc": fc,
        }

        results.append(result)

        if abs(fc) < tolerance:
            # If the function value is small enough, break
            iteration += 1
            break

        iteration += 1

        if fa * fc < 0:
            b = c
        else:
            a = c

    answer_iteration = iteration - 1  # Answer found at the previous iteration
    message = f"Answer found  {c} \n at {answer_iteration} th Iteration"

    return results, answer_iteration, message

def newton_raphson_method(func, x0, tolerance, max_iterations,funD):
    iteration = 0
    results = []

    if x0 is None:
        raise ValueError("Invalid value for 'x0'")

    
    func_diff = funD
    

    while iteration < max_iterations:
        f_x0 = func(x0)
        f_prime_x0 = func_diff(x0)

        if f_prime_x0 == 0:
            # Avoid division by zero
            return results, iteration, "Newton-Raphson method failed: derivative is zero"

        x1 = x0 - f_x0 / f_prime_x0
        f_x1 = func(x1)

        result = {
            "iteration": iteration,
            "x0": x0,
            "x1": x1,
            "f_x0": f_x0,
            "f_prime_x0": f_prime_x0,
            "f_x1": f_x1,
        }

        results.append(result)

        if abs(f_x1) < tolerance:
            # If the function value is small enough, break
            iteration += 1
            break

        x0 = x1
        iteration += 1

    answer_iteration = iteration - 1  # Answer found at the previous iteration
    message = f"Answer found at iteration {answer_iteration}"

    return results, answer_iteration, message

@app.route('/api/bisection', methods=['POST'])
def perform_bisection():
    try:
        data = request.json
        func_str = data.get('func')
        a = data.get('a')
        b = data.get('b')
        tolerance = data.get('tolerance')

        # Provide a default value of 50 for max_iterations
        max_iterations = data.get('maxIterations')

        # Convert the function string to an actual function
        func = eval(f"lambda x: {func_str}")

        results, answer_iteration, message = bisection_method(func, a, b, tolerance, max_iterations)

        return jsonify({'method': 'bisection', 'results': results, 'iterations': answer_iteration, 'message': message})

    except Exception as e:
        # Print the full traceback for detailed error analysis
        import traceback
        traceback.print_exc()

        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/false_position', methods=['POST'])
def perform_false_position():
    try:
        data = request.json
        func_str = data.get('func')
        a = data.get('a')
        b = data.get('b')
        tolerance = data.get('tolerance')

        # Provide a default value of 50 for max_iterations
        max_iterations = data.get('maxIterations')

        # Convert the function string to an actual function
        func = eval(f"lambda x: {func_str}")

        results, answer_iteration, message = false_position_method(func, a, b, tolerance, max_iterations)

        return jsonify({'method': 'false_position', 'results': results, 'iterations': answer_iteration, 'message': message})

    except Exception as e:
        # Print the full traceback for detailed error analysis
        import traceback
        traceback.print_exc()

        return jsonify({'error': 'Internal server error'}), 500

def newton_raphson_method(func, x0, tolerance, max_iterations):
    iteration = 0
    results = []

    if x0 is None:
        raise ValueError("Invalid value for 'x0'")

    x = Symbol('x')
    func_diff = diff(func, x)
    func = lambdify(x, func)
    func_diff = lambdify(x, func_diff)

    while iteration < max_iterations:
        f_x0 = func(x0)
        f_prime_x0 = func_diff(x0)

        if f_prime_x0 == 0:
            # Avoid division by zero
            return results, iteration, "Newton-Raphson method failed: derivative is zero"

        x1 = x0 - f_x0 / f_prime_x0
        f_x1 = func(x1)

        result = {
            "iteration": iteration,
            "x0": x0,
            "x1": x1,
            "f_x0": f_x0,
            "f_prime_x0": f_prime_x0,
            "f_x1": f_x1,
        }

        results.append(result)

        if abs(f_x1) < tolerance:
            # If the function value is small enough, break
            iteration += 1
            break

        x0 = x1
        iteration += 1

    answer_iteration = iteration - 1  # Answer found at the previous iteration
    message = f"Answer found at iteration {answer_iteration}"

    return results, answer_iteration, message

@app.route('/api/newton_raphson', methods=['POST'])
def perform_newton_raphson():
    try:
        data = request.json
        func_str = data.get('func')
        x0 = data.get('x0')
        tolerance = data.get('tolerance')

        # Provide a default value of 50 for max_iterations
        max_iterations = data.get('maxIterations')

        # Convert the function string to a symbolic expression
        x = Symbol('x')
        func = parse_expr(func_str)

        results, answer_iteration, message = newton_raphson_method(func, x0, tolerance, max_iterations)

        return jsonify({'method': 'newton_raphson', 'results': results, 'iterations': answer_iteration, 'message': message})

    except Exception as e:
        # Print the full traceback for detailed error analysis
        import traceback
        traceback.print_exc()

        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000)

