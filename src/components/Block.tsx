import Link from 'next/link';

export interface Definition {
	partOfSpeech: string;
	definitions: { definition: string }[];
	synonyms: string[];
}

export interface Word {
	word: string;
	phonetic: string;
	meanings: Definition[];
	phonetics: { audio: string }[];
}

const Block = ({ word }: { word: Word }) => {
	return (
		<>
			{' '}
			{word?.meanings?.map((m: Definition, i: number) => {
				return (
					<div key={i} className='mt-8'>
						<p className='font-bold text-2xl'>{m.partOfSpeech}</p>
						<ul>
							{m.definitions?.map(
								(
									d: {
										definition: string;
									},
									i: number
								) => (
									<li key={i} className='mt-2'>
										{i + 1} - {d.definition}
									</li>
								)
							)}
						</ul>
						{m?.synonyms.length > 0 ? (
							<>
								<p className='font-bold text-xl mt-4'>synonyms</p>
								<ul>
									{m.synonyms?.map((s: string, i: number) => (
										<Link href={`/${s}`} key={i}>
											<a className='mr-2 hover:link cursor-pointer'>{s}</a>
										</Link>
									))}
								</ul>
								<div className='divider'></div>
							</>
						) : (
							''
						)}
					</div>
				);
			})}
		</>
	);
};

export default Block;
