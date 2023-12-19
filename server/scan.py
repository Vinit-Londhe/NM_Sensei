from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

client=OpenAI(
    api_key="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"
)

# Set your OpenAI API key
#openai.api_key = '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'

@app.route('/api/process_text', methods=['POST'])
def process_text():
    print('calling...............')
    try:
        data = request.json
        extracted_text = data.get('extractedText', '')
        print('calling...............')
        # Call the OpenAI API
        prom="you are numrical analysis calculator calculate"+extracted_text
        chat_completion = client.chat.completions.create(
            
            messages=[
                # {"role":"system","content":prom},
                {"role": "assistant", "content": prom},
                {"role": "assistant", "content": prom},
            ],
            model="gpt-3.5-turbo",
        )

        result = chat_completion
        print(result)
        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run('0.0.0.0',debug=True)
