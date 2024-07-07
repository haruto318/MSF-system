
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Commons() {
  const searchParams = useSearchParams();
  const router = useRouter();

  var data = [
    { team_name: "A", common_point: "タッチタイピングができる。" },
    { team_name: "B", common_point: "タッチタイピングができる。" },
    { team_name: "C", common_point: "使用しているOSがMacである。" },
    { team_name: "D", common_point: "使用しているOSがウェグァ絵がうぇがウィ絵うギアwげいう亜w上技雨アウェぎうgMacである。" },
    { team_name: "E", common_point: "タッチタイピングができる。" },
    { team_name: "F", common_point: "使用しているOSがMacである。" },
    { team_name: "G", common_point: "タッチタイピングができる。" },
    { team_name: "H", common_point: "タッチタイピングができる。" }
  ];

  return (
    <div className="container mx-auto p-6">
      <button 
        type="button" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
        onClick={() => router.push('/')}
      >
        戻る
      </button>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">AI共通点ゲーム</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {Array.isArray(data) ? (
            data.map((evaluation, index) => (
              <div key={index} className="flex items-center space-x-5 p-4 ">
                <div className="text-3xl font-semibold mb-2">
                  <h3>{evaluation.team_name}</h3>
                </div>
                <div className="border-2 border-rose-600 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                  <h3 className="text-base break-words line-clamp-2 text-center">{evaluation.common_point}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>評価結果がありません</p>
          )}
        </div>
        <button 
          type="button" 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-6 rounded-lg"
          onClick={() => router.push('/')}
        >採点</button>
      </div>
    </div>
  );
}
