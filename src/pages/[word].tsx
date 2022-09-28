import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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
	const word = json[0];

	return {
		props: {
			word,
		},
	};
};

const WordPage = ({
	word,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	if (!word)
		return (
			<div className='font-bold text-8xl text-center my-4'>
				404 word not found
			</div>
		);

	console.log(word);

	return (
		<div className='text-center'>
			<h1 className='text-gray-700 font-bold text-5xl my-4 underline underline-offset-1'>
				{word.word}
			</h1>
			<p>
				<span className='font-bold'>Definition: </span>
				{word.meanings[0].definitions[0].definition}
			</p>
		</div>
	);
};

export default WordPage;
