'use client';

import { useSearchParams, useRouter } from 'next/navigation';
/// add api


export default function Result() {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
  const router = useRouter()

  return (

    <div>
      <button type="button" className="bg-red-500 hover:bg-red-700 text-white 
        font-bold py-2 px-4 m-4 rounded-full" 
        onClick={() => router.push('/')}>
        戻る
        </button> 
      <h1>Back Page</h1>
      <div>
        {Array.isArray(data) ? (
          data.map((evaluation, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <h2>チーム名: {evaluation.team_name}</h2>
              <h3>共通点: {evaluation.common_point}</h3>
              <p>評価点数: {evaluation.rate}</p>
              <p>{evaluation.comment}</p>
            </div>
          ))
        ) : (
          <p>評価結果がありません</p>
        )}
      </div>
    </div>
  );
}
