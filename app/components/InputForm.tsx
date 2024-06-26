'use client'
import { useState } from 'react';

export default function InputForm() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const onSubmit = async () => {
    setLoading(true);
    chatMessages.push(question);

    const response = await fetch('/app/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(question),
    });

    if (response.status == 200) {
      const data = await response.json();
      chatMessages.push(data.data);
      setChatMessages([...chatMessages]);
      setQuestion('');
    }
    setLoading(false);
  };

  return (
    <form className="my-6 w-full md:w-4/5 mx-auto">
      {chatMessages ? (
        <div className="flex flex-col justify-start">
          {chatMessages.map((message, index) => {
            return (
              <div key={index} className={`text-left text-gray-800 mb-2`}>
                {message}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="flex flex-col w-full">
        <div className="flex flex-col sm:flex-row mb-5">
          <div className="w-full">
            <textarea
              className="py-2 px-3 w-full leading-tight rounded border text-gray-700 focus:outline-none focus:shadow-outline"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-10 md:mb-20 sm:ml-8">
        <button
          disabled={loading}
          onClick={onSubmit}
          className="flex justify-center items-center py-2 px-4 w-40 font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <div role="status" className="mr-2">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-white animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}{" "}
          {loading ? "処理中..." : "送信"}
        </button>
      </div>
    </form>
  );
}