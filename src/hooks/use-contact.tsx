import { useState, useEffect, useRef, RefObject } from 'react';
import { toast } from 'react-toastify';
import { useForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { requestApi } from './../utils/wordpress';

type ContactFormOptions<TFieldValues extends FieldValues = FieldValues> = UseFormProps<TFieldValues>;
type UseContactFormReturn<TFieldValues extends FieldValues = FieldValues> = {
	formRef: RefObject<HTMLFormElement>;
	control: UseFormReturn<TFieldValues>['control'];
	isLoading: boolean;
};

function useContactForm<TFieldValues extends FieldValues = FieldValues>(
	options?: ContactFormOptions<TFieldValues>
): UseContactFormReturn<TFieldValues> {
	const formRef = useRef<HTMLFormElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { control, handleSubmit, reset, formState: { errors } } = useForm<TFieldValues>(options);

	useEffect(() => {
		if (formRef.current) {
			const onSubmit = async (formData: TFieldValues) => {
				if (isLoading === true) {
					return;
				}

				const formId = formRef.current?.getAttribute('id');
				if (!formId) return;

				const formURL = `https://wordpress.mvbican.com/wp-json/contact-form-7/v1/contact-forms/${formId.split('wpcf-')[1]}/feedback`;
				const newData = new FormData();

				Object.keys(formData).forEach((key) => {
					const value = (formData as Record<string, unknown>)[key];
					// FormData.append expects string|Blob, cast if value is defined
					if (typeof value !== "undefined" && value !== null) {
						newData.append(key, value as string | Blob);
					}
				});
				newData.append('_wpcf7_unit_tag', formId);

				setIsLoading(true);
				try {
					const { data } = await requestApi.post(formURL, newData);
					toast.success(data.message);
				} catch (error: unknown) {
					// error may be any, so destructure carefully
					const data =
						(error && typeof error === 'object' && 'response' in error && error.response
							&& typeof error.response === 'object' && error.response && 'data' in error.response
							? (error.response as { data?: { message?: string } }).data
							: {}
						) || {};
					toast.error((data as { message?: string }).message);
				} finally {
					setIsLoading(false);
					reset();
				}
			};

			// as HTMLFormElement so TS recognizes onsubmit
			(formRef.current as HTMLFormElement).onsubmit = handleSubmit(onSubmit);
		}
	}, [formRef, handleSubmit, reset, errors, isLoading]);

	return {
		formRef,
		control,
		isLoading,
	};
}

export {
	useContactForm
};
