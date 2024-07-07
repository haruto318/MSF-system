'use client';
import { useState, ChangeEvent } from 'react';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function SurveyForm({ groupId, groupNum }) {
  const [answers, setAnswers] = useState({});
  const [team, setTeam] = useState("A");

  const handleSubmit = async () => {
    const fetchAnswers = async () => {
      try {
        // クエリを作成してgroupIdが一致するドキュメントのみを取得
        const q = query(collection(db, 'answers'), where('groupId', '==', groupId));
        const querySnapshot = await getDocs(q);
        const answersData = querySnapshot.docs.map(doc => doc.data());
        const isAnswered = answersData.some(group => group.team === team);

        if (isAnswered) {
          alert('正しいチームを選んでください\n回答は一度限りです');
        } else {
          await addDoc(collection(db, 'answers'), {
            groupId,
            answers,
            team
          });
          alert('Survey submitted!');
        }
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    if (groupId) {
      fetchAnswers();
      console.log("fetched");
    }
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // アルファベットの配列を作成
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">共通点回答フォーム {groupId}</h1>
        <p className="text-center text-gray-500">(チーム数: {groupNum})</p>
        
        <form className="space-y-10">
          <div className="relative h-10 w-full">
            <label className="block text-sm font-medium text-gray-700 mt-2">Select Team</label>
            <select 
              value={team} 
              onChange={(e) => setTeam(e.target.value)} 
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Array.from({ length: groupNum }, (_, index) => (
                <option key={index} value={alphabet[index]}>
                  {alphabet[index]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Answer</label>
            <input 
              type="text" 
              name="answer" 
              onChange={onChangeAnswer} 
              placeholder="共通点"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button type="button" onClick={handleSubmit} className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              提出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
