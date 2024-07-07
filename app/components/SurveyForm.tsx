'use client';
import { useState, ChangeEvent } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { Select, Option } from "@material-tailwind/react";
import { db } from '../firebase';

export default function SurveyForm({ groupId, groupNum }) {
  const [answers, setAnswers] = useState({});
  const [team, setTeam] = useState("A");

  const handleSubmit = async () => {
    await addDoc(collection(db, 'answers'), {
      groupId,
      answers,
      team
    });
    alert('Survey submitted!');
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // アルファベットの配列を作成
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Survey for Group {groupId}</h1>
        <p className="text-center text-gray-500">(チーム数: {groupNum})</p>
        
        <form className="space-y-6">
          <div>
            <Select label="Select Team" value={team}  onChange={(val) => setTeam(val)} className="w-full"
            >
              {Array.from({ length: groupNum }, (_, index) => (
                <Option key={index} value={alphabet[index]}>
                  {alphabet[index]}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Answer</label>
            <input type="text" name="answer" onChange={onChangeAnswer} placeholder='共通点'
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button type="button" onClick={handleSubmit}
              className="w-full px-4 py-2 font-bold text-gray-900 bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
