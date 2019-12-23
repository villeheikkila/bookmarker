import axios from 'axios';

export const GetDataByISBN = async (isbn: string) => {
    try {
        const url = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=details&format=json';
        const response = await axios.get(url);
        return response.data['ISBN:' + isbn].details;
    } catch (error) {
        return error;
    }
};
