import {useEffect, useState} from 'react';
import yelp from '../api/yelp';


/*
    useEffect(() => {}) -> Run the arrow function every time the component is rendered
    useEffect(() => {}, []) -> Run the arrow function only when  the component is first rendered
    useEffect(() =>{}, [value]) => Run the arrow function only when  the component is first rendered and when the 'value' changes
*/

export default(() => {
    const [results, setResults] = useState([]);
    const [errorMessage, seterrorMessage] = useState('')

    const searchApi = async (searchTerm) =>{
        try{
            const response = await yelp.get('/search',{
                params:{
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses)
        }catch(e){
            seterrorMessage('Something went wrong')
        }
        
    }

    useEffect(() =>{
        searchApi('street')
    }, []);

    return [searchApi, results, errorMessage ]
})