'use client';

import { useSearchParams } from 'next/navigation';


export default function Result() {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

  
  return (
    <div>
      <h1>Result Page</h1>
      <div style={{ marginTop: '20px' }}>
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
