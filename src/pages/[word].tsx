import Block from './../components/Block';
import { GetServerSideProps } from 'next';
import { Word } from './../components/Block';

export const getServerSideProps: GetServerSideProps = async (context) => {
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

interface props {
	word: Word;
}

const WordPage = ({ word }: props) => {
	if (!word)
		return (
			<div className='font-bold text-8xl text-center my-4'>
				404 word not found
			</div>
		);

	console.log(word?.phonetics);

	const audio = new Audio(
		word?.phonetics[word.phonetics.length - 1]?.audio ||
			word?.phonetics[0]?.audio ||
			''
	);

	return (
		<div className='container mx-auto p-4 xl:max-w-[60%] lg:max-w-[70%] text-lg'>
			<h1 className=' font-bold text-5xl my-4 flex items-center'>
				<span>{word.word}</span>
				<span className='text-xl no-underline ml-4'>{word.phonetic}</span>
				<button
					className='btn btn-primary btn-ghost ml-4'
					onClick={() => {
						audio.play();
					}}>
					<svg
						className='swap-on fill-current'
						xmlns='http://www.w3.org/2000/svg'
						width='30'
						height='30'
						viewBox='0 0 24 24'>
						<path d='M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z' />
					</svg>
				</button>
			</h1>
			<div className='divider'></div>
			<Block word={word} />
		</div>
	);
};

export default WordPage;
