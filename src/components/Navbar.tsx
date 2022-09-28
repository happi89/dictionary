import React from 'react';
import WordForm from './WordForm';
export function Navbar({}) {
	return (
		<main className='container mx-auto flex flex-col items-center p-4'>
			<h1 className='text-5xl leading-normal font-extrabold'>Dictionary</h1>
			<WordForm />
		</main>
	);
}
