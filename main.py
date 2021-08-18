from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        form_data = request.get_data()
        print(form_data)

        data = {'valid': True}
        return jsonify(data)

    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
