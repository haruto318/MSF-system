'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams, useSearchParams } from 'next/navigation';

export default function GroupPage() {
  const { groupId } = useParams(); // URLパラメータからgroupIdを取得

  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // クエリを作成してgroupIdが一致するドキュメントのみを取得
        const q = query(collection(db, 'answers'), where('groupId', '==', groupId));
        const querySnapshot = await getDocs(q);
        const answersData = querySnapshot.docs.map(doc => doc.data());
        setAnswers(answersData);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };
  
    if (groupId) {
      fetchAnswers();
    }
  }, [groupId]);

  // アルファベットの配列を作成
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <div>
      <h1>{groupId}</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{JSON.stringify(answer)}</li>
        ))}
      </ul>
      {Array.from({ length: data }, (_, index) => (
        <div key={index} >
          {alphabet[index]}
        </div>
      ))}

{/*  */}
      <div className="container mx-auto p-6">
        <button type="button" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
          onClick={() => router.push('/')}
        >
          戻る
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">AI共通点ゲーム</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: data }, (_, index) => (
              <div key={index} className="flex items-center space-x-5 p-4 ">
                <div className="text-3xl font-semibold mb-2">
                  <h3>{alphabet[index]}</h3>
                </div>
                {answers.some(answer => answer.team === alphabet[index]) ? 
                  <div className="border-2 border-rose-600 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                    <h3 className="text-base break-words line-clamp-2 text-center">{answers[answers.findIndex(answer => answer.team === alphabet[index])].answers.answer}</h3>
                  </div> 
                  : 
                  <div className="border-2 border-rose-600 bg-gray-200 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                    <h3 className="text-base break-words line-clamp-2 text-center">Thinking</h3>
                  </div>
                }
              </div>
            ))}
          </div>
          <button 
            type="button" 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
            onClick={() => router.push('/')}
          >採点</button>
        </div>
      </div>
    </div>
  );
}
