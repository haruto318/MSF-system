'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Result() {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
  const router = useRouter()

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <div>
      <div className="container mx-auto p-6">
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
          onClick={() => router.push('/')}
        >
          戻る
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">AI共通点ゲーム</h1>

          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: data.length }, (_, index) => {
              const evaluation = data.find(evaluation => evaluation.team_name === alphabet[index]);
              console.log("gweg")
              return (
                <div key={index} className="flex items-center space-x-5 p-4">
                  <div className="text-3xl font-semibold mb-2">
                      <h3>{alphabet[index]}</h3>
                  </div>
                  <div className="w-full">
                    <div className="relative flex items-center space-x-5 p-4">
                      {/* 共通点 */}
                      {evaluation ? (
                        <div className="border-2 border-rose-600 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                          <h3 className="text-base break-words line-clamp-2 text-center">{evaluation.common_point}</h3>
                        </div>
                      ) : (
                        <div className="border-2 border-rose-600 bg-gray-200 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                          <h3 className="text-base break-words line-clamp-2 text-center">Thinking</h3>
                        </div>
                      )}
                      
                      {/* 得点 */}
                      <div className="rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center ">
                        <h3 className="text-3xl font-semibold mr-5">▶︎</h3>
                        <h3 className="text-3xl font-semibold">{evaluation.rate}点 {evaluation.isAll ? "+ 5点" : ""}</h3>
                      </div>
                    </div>

                    {/* コメント */}
                    <div>
                      <p>{evaluation.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
