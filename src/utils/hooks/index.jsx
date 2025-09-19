import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { requestApi } from '../wordpress';

const useContactForm = (options) => {
	const formRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const { control, handleSubmit, reset, formState: { errors } } = useForm(options);

	useEffect(() => {
		if (formRef.current) {
			const onSubmit = async (formData) => {
				if (isLoading === true) {
					return;
				}

				const formId = formRef.current.getAttribute('id');
				const formURL = `https://dev.mvbican.com/mvbican/wp-json/contact-form-7/v1/contact-forms/${formId.split('wpcf-')[1]}/feedback`;
				const newData = new FormData();

				Object.keys(formData).forEach((key) => newData.append(key, formData[key]));
				newData.append('_wpcf7_unit_tag', formId);
				
				setIsLoading(true);
				try {
					const { data } = await requestApi.post(formURL, newData);
					toast.success(data.message);
				} catch (error) {
					const { response: { data = {} } = {} } = error;
					toast.error(data.message);
				} finally {
					setIsLoading(false);
					reset();
				}
			}

			formRef.current.onsubmit = handleSubmit(onSubmit);
		};
	}, [formRef, handleSubmit, reset, errors, isLoading]);

	return {
		formRef,
		control,
		isLoading,
	};
};

export {
	useContactForm
};
