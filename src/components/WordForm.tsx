import { useRouter } from 'next/router';
import { useState } from 'react';

const WordForm = () => {
	const [word, setWord] = useState('');
	const router = useRouter();

	return (
		<form
			className='flex gap-4'
			onSubmit={(e) => {
				e.preventDefault();
				router.push(`/${word}`);
			}}>
			<input
				type='text'
				className='input input-bordered w-full focus:outline-none max-w-sm'
				value={word}
				onChange={({ target }) => setWord(target.value)}
			/>
			<button className='btn btn-primary px-8'>Search</button>
		</form>
	);
};

export default WordForm;
