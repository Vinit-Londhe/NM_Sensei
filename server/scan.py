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
        extracted_text = data.get('extractedText')
        print('calling...............')
        print(extracted_text)
        # Call the OpenAI API
        prom=extracted_text
        response = client.chat.completions.create(
                    model="gpt-3.5-turbo-16k",
                    messages=[
                        {
                        "role": "user",
                        "content": prom,
                        }
                    ],
                    temperature=1,
                    max_tokens=3000,
                    top_p=1,
                    frequency_penalty=0,
                    presence_penalty=0
        )

        result=response.choices[0].message.content
        print(result)
        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run('0.0.0.0',debug=True)
