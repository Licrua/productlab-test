'use client'
import { useState } from 'react';
import { useTokenStore } from '../../store/tokenStore';
// import { useTokenStore } from '../store/tokenStore';
// import { useTokenStore } from './store/tokenStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [budgetFrom, setBudgetFrom] = useState<number | ''>('');
  const [budgetTo, setBudgetTo] = useState<number | ''>('');
  const [deadlineDays, setDeadlineDays] = useState<number | ''>('');
  const [numberOfReminders, setNumberOfReminders] = useState<number | ''>('');
  const [isHard, setIsHard] = useState(false);

  const token = useTokenStore((state) => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      title,
      description,
      tags,
      budget_from: budgetFrom,
      budget_to: budgetTo,
      deadline_days: deadlineDays,
      number_of_reminders: numberOfReminders,
      private_content: null,
      is_hard: isHard,
      all_auto_responses: false,
      rules: {
        budget_from: 5000,
        budget_to: 8000,
        deadline_days: 5,
        qty_freelancers: 1,
        task_id: 567,
      },
    };

    try {
      const response = await fetch('/api/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert('Задача успешно опубликована!');
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.message}`);
      }
    } catch (error) {
      alert('Произошла ошибка при отправке задачи.');
    }
  };

  return (
	<div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
	<h1 className="text-3xl font-semibold text-center text-gray-800">Создать задачу</h1>
	<form onSubmit={handleSubmit} className="space-y-5">
	  <div>
		<label className="block text-gray-600 font-medium">Название задачи</label>
		<input
		  type="text"
		  value={title}
		  onChange={(e) => setTitle(e.target.value)}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		  required
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Описание</label>
		<textarea
		  value={description}
		  onChange={(e) => setDescription(e.target.value)}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		  required
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Теги (через запятую)</label>
		<input
		  type="text"
		  value={tags.join(', ')}
		  onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Бюджет от</label>
		<input
		  type="number"
		  value={budgetFrom}
		  onChange={(e) => setBudgetFrom(e.target.value ? parseInt(e.target.value) : '')}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Бюджет до</label>
		<input
		  type="number"
		  value={budgetTo}
		  onChange={(e) => setBudgetTo(e.target.value ? parseInt(e.target.value) : '')}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Дедлайн (дни)</label>
		<input
		  type="number"
		  value={deadlineDays}
		  onChange={(e) => setDeadlineDays(e.target.value ? parseInt(e.target.value) : '')}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <div>
		<label className="block text-gray-600 font-medium">Количество напоминаний</label>
		<input
		  type="number"
		  value={numberOfReminders}
		  onChange={(e) => setNumberOfReminders(e.target.value ? parseInt(e.target.value) : '')}
		  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <div className="flex items-center">
		<input
		  type="checkbox"
		  checked={isHard}
		  onChange={(e) => setIsHard(e.target.checked)}
		  className="mr-3 rounded-md border-gray-300 focus:ring-blue-500"
		/>
		<label className="text-gray-600">Сложная задача</label>
	  </div>
	  <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
		Опубликовать задачу
	  </button>
	</form>
  </div>
  );
}
