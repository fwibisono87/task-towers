//Function used to create user with supabase
// Honestly IDK if i will use this, might just use sign-in w/ magic links instead, which allows no pw signins

import { createClient } from '@supabase/supabase-js';

export type SignUpData = {
	email: string;
	passsword: string;
	first_name: string;
};

export const handler = async (context) => {
	if (process.env.SUPABASE_URL && process.env.SUPABASE_PUBKEY) {
		const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBKEY);
		const { email, password, first_name } = context.queryStringParameters;
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					first_name: first_name
				}
			}
		});

		if (!error) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: 'signup OK!',
					query: context.queryStringParameters,
					data,
					error
				})
			};
		} else {
			return {
				statusCode: error.status,
				body: JSON.stringify({
					name: error.name,
					message: 'Supabase Error: ' + error.message
				})
			};
		}
	} else {
		const errorMessage =
			!process.env.SUPABASE_URL && !process.env.SUPABASE_PUBKEY
				? 'Both Supabase URL and Supabase Public key are not defined'
				: !process.env.SUPABASE_URL
				? 'Supabase URL is not defined'
				: 'Supabase Public Key is not defined';
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Server Error, ' + errorMessage
			})
		};
	}
};
