/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
    let redirect = url.searchParams.get('redirect');
	return {
        redirect
    };
}