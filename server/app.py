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




################## Bisection ##################
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





################## Regula Falsi ##########################
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



#---------------------- Newton Raphson ------------------------

def newton_raphson_method(func, x0, tolerance, max_iterations):
    iteration = 0
    results = []

    if x0 is None:
        raise ValueError("Invalid value for 'x0'")

    x = Symbol('x')
    func_diff = diff(func, x)
    func_lambda = lambdify(x, func)
    func_diff_lambda = lambdify(x, func_diff, 'numpy')

    while iteration < max_iterations:
        f_x0 = func_lambda(x0)
        f_prime_x0 = func_diff_lambda(x0)

        if f_prime_x0 == 0:
            # Avoid division by zero
            return results, iteration, "Newton-Raphson method failed: derivative is zero"

        x1 = x0 - f_x0 / f_prime_x0
        f_x1 = func_lambda(x1)

        result = {
            "iteration": iteration,
            "x0": x0,
            "x1": x1,
            "f_x0": f_x0,
            "f_prime_x0": f_prime_x0,
            "f_x1": f_x1,
        }

        results.append(result)

        if abs(x0-x1) < tolerance:
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







########################UNIT2################################
def format_matrix(matrix):
     return '\n'.join([' '.join(map(str, row)) for row in matrix])

def gaussian_elimination(matrix):
    n = len(matrix)
    steps = [format_matrix(matrix.copy())]

    for i in range(n):
        # Check if the diagonal element is zero, and swap rows if needed
        if matrix[i][i] == 0:
            for k in range(i + 1, n):
                if matrix[k][i] != 0:
                    matrix[i], matrix[k] = matrix[k], matrix[i]
                    steps.append(format_matrix(matrix.copy()))
                    break
            else:
                raise ValueError("Matrix is singular and cannot be solved.")

        # Make the diagonal elements 1
        divisor = matrix[i][i]
        for j in range(i, n + 1):
            matrix[i][j] /= divisor

        steps.append(format_matrix(matrix.copy()))

        # Make the elements below the diagonal equal to 0
        for k in range(i + 1, n):
            factor = matrix[k][i]
            for j in range(i, n + 1):
                matrix[k][j] -= factor * matrix[i][j]

        steps.append(format_matrix(matrix.copy()))

    # Back-substitution
    solution = [0] * n
    for i in range(n - 1, -1, -1):
        solution[i] = matrix[i][n]
        for j in range(i + 1, n):
            solution[i] -= matrix[i][j] * solution[j]

    return steps, solution

@app.route('/hi',methods=['POST'])
def greet():
    print('hey from server')
    return jsonify ("greeting from backend")

def format_solution(solution):
    variable_names = ['x', 'y', 'z']
    result = ', '.join([f"{variable_names[i]} = {solution[i]}" for i in range(len(solution))])
    return f"Solution: {result}"

@app.route('/api/ge', methods=['POST'])
def solve_system():
    try:
        print('heyyyy')
        data = request.json
        rows = [list(map(float, row.split(', '))) for row in data.values()]

        # Augment the matrix with the constants on the right side
        augmented_matrix = [row[:-1] + [row[-1]] for row in rows]

        # Solve the system using Gaussian elimination and get steps
        try:
            steps, solution = gaussian_elimination(augmented_matrix)
            formatted_solution = format_solution(solution)
            return jsonify({"steps": steps, "solution": formatted_solution})
        except ValueError as e:
            return jsonify({"error": str(e)})

    except Exception as e:
        return jsonify({"error": str(e)})
    





#////////////////////Guass Jordon//////////////////////////

def gauss_jordan_elimination(matrix):
    n = len(matrix)
    steps = [format_matrix(matrix.copy())]

    for i in range(n):
        # Make the diagonal elements 1
        divisor = matrix[i][i]
        for j in range(i, n + 1):
            matrix[i][j] /= divisor

        steps.append(format_matrix(matrix.copy()))

        # Make the elements above and below the diagonal equal to 0
        for k in range(n):
            if k != i:
                factor = matrix[k][i]
                for j in range(i, n + 1):
                    matrix[k][j] -= factor * matrix[i][j]

        steps.append(format_matrix(matrix.copy()))

    # Extract the solution
    solution = [row[-1] for row in matrix]

    return steps, solution

def format_matrix(matrix):
    return '\n'.join([' '.join(map(str, row)) for row in matrix])

def format_solution(solution):
    variable_names = ['x', 'y', 'z']
    result = ', '.join([f"{variable_names[i]} = {solution[i]}" for i in range(len(solution))])
    return f"Solution: {result}"

@app.route('/solve_system_gauss_jordan', methods=['POST'])
def solve_system_gauss_jordan():
    try:
        data = request.json
        rows = [list(map(float, row.split(', '))) for row in data.values()]

        # Augment the matrix with the constants on the right side
        augmented_matrix = [row[:-1] + [row[-1]] for row in rows]

        # Solve the system using Gauss-Jordan elimination and get steps
        try:
            steps, solution = gauss_jordan_elimination(augmented_matrix)
            formatted_solution = format_solution(solution)
            return jsonify({"steps": steps, "solution": formatted_solution})
        except ValueError as e:
            return jsonify({"error": str(e)})

    except Exception as e:
        return jsonify({"error": str(e)})


#-----------------------Guss Seidal----------------------------






if __name__ == '__main__':
    app.run('0.0.0.0', port=5000,debug=true)

