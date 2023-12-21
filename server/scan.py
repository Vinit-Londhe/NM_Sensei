#scan.py
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
        num=data.get('inputValue')
        print(num)
        print('calling...............')
        print(extracted_text)
        # Call the OpenAI API
        prom=extracted_text
        
        
        print('calling GPT-----------------')
        response = client.chat.completions.create(
                    model="gpt-3.5-turbo-16k",
                    messages=[
                        {
                        "role": "system",
                        "content": "you are numerical analysis calculator whateever user sends question answer accroding with upto 3 decimal give answer accurate dont give extrad details just a"
                        },
                        {
                        "role": "user",
                        "content": "Find a root of an equation f(x)=x3-x-1 using False Position method upto decimals"
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
