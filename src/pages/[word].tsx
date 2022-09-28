import Block from './../components/Block';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	console.log(context.query);
	const res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${context.query.word}`
	);

	if (res.status === 404) {
		return {
			props: {
				word: null,
			},
		};
	}

	const json = await res.json();
	const word: Word = json[0];

	return {
		props: {
			word,
		},
	};
};

const WordPage = ({ word }: { word: Word }) => {
	if (!word)
		return (
			<div className='font-bold text-8xl text-center my-4'>
				404 word not found
			</div>
		);

	console.log(word);

	return (
		<div className='container mx-auto p-4 xl:max-w-[60%] lg:max-w-[70%] text-lg'>
			<h1 className=' font-bold text-5xl my-4'>
				<span className='underline underline-offset-1'>{word.word}</span>
				<span className='text-xl no-underline ml-4'>{word.phonetic}</span>
			</h1>
			<div className='divider'></div>
			<Block word={word} />
		</div>
	);
};

export default WordPage;
