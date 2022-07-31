export const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');
        
        let headers = {};

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken
        }

        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url, { headers })
        } else {
            buildRequest = fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }

        const response = await buildRequest;

        const result = await response.json();

        if (result.message) {
            throw Error(result.message)
        }

        return result;
    } catch (error) {
        alert(error);
    }
}

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST')
export const put = request.bind({}, 'PUT')
export const patch = request.bind({}, 'PATCH')
export const del = request.bind({}, 'DELETE')