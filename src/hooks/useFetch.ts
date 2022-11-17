import { useCallback, useState } from "react";

import { ApiResponse } from "../@types/api";

export const useFetch = <T>() => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	const request = useCallback(async (endpoint: string, method?: string, body?: BodyInit, headers?: HeadersInit) => {
		setError(null);
		setData(null);
		setLoading(true);

		try {
			if (body) {
				headers = {
					...headers,
					"Content-Type": "application/json",
				};
			}

			const init = {
				method,
				body,
				headers,
			};

			const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}${endpoint}`, init);

			const data = (await response.json()) as ApiResponse<T>;

			if (!response.ok && !data.success) {
				setLoading(false);
				throw new Error(data.error.message);
			}

			if (data.success) {
				setData(data.data);
				setLoading(false);
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
			setLoading(false);
		}
	}, []);

	return { loading, error, data, request };
};
