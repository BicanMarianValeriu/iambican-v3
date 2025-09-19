import React, { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../General';
import { Button } from './../ui/button';
import { serializeData, jsonpFetch } from '../../utils';
import { subscribeSchema } from '../../utils/types';

const NewsLetter = () => {
	const { control, handleSubmit, formState, reset } = useForm({
		mode: 'onChange',
		resolver: zodResolver(subscribeSchema),
		defaultValues: {
			EMAIL: ''
		}
	});

	const [pending, setPending] = useState(false);
	const [showTimeout, setShowTimeout] = useState(false);
	const [validMessage, setValidMessage] = useState('');

	const onSubmit = async (data) => {
		if (pending === true) {
			return;
		}

		setPending(true);
		setValidMessage('');
		clearTimeout(showTimeout);

		const path = 'https://wecodeart.us2.list-manage.com/subscribe/post-json?u=ab68e00b82ffb88387f008ce7&amp;id=abee3454c2';
		const url = `${path}&${serializeData(data)}`;

		try {
			const response = await jsonpFetch(url);
			const { msg } = response;

			setValidMessage(msg);
		} catch (err) {
			console.log(err);
			setValidMessage('There is an error - please try again.');
		}

		// Clear the valid message after a while
		reset({ EMAIL: '' });
		setShowTimeout(setTimeout(() => setValidMessage(''), 5000));
		setPending(false);
	}

	return (
		<div className="newsletter newsletter--footer">
			<div className="container py-10 flex flex-wrap gap-y-5">
				<div className="w-full md:w-1/2 text-center md:text-start">
					<h4 className="text-2xl">Abonați-vă la <strong>Newsletter-ul meu</strong></h4>
					<p className="text-slate-500">Stai la curent cu noutăți despre cursuri.</p>
				</div>
				<div className="w-full md:w-1/2">
					<form className="newsletter__form relative" name="newsletter" noValidate onSubmit={handleSubmit(onSubmit)}>
						<div className="relative flex gap-x-3">
							<FormField
								type="email"
								name="EMAIL"
								autoComplete="email"
								placeholder="Adresă de email"
								{...{ control }}
							/>
							<Button type="submit" disabled={!formState.isValid || pending} title="Abonează-te la newsletter">
								<HiPaperAirplane className="block size-5 md:hidden" />
								<span className="hidden md:block">{pending ? 'LOADING...' : 'SUBSCRIBE'}</span>
							</Button>
						</div>
						<div className="relative my-1 md:absolute lg:top-full lg:left-0 text-sm">
							{validMessage && <span className="text-zinc-500">{validMessage}</span>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewsLetter;
