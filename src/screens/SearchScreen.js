import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchBar from './components/SearchBar';
import yelp from './api/yelp';


const SearchScreen = () => {
    const [term, setTerm] = useState('');
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

    //Bad way of initializing first search
    // searchApi('pasta');


    return(
        <View>
            <SearchBar
                term = {term}
                onTermChange = {(newTerm => setTerm(newTerm))}
                onTermSubmit = {() => searchApi(term)}
            />
            
            {errorMessage ? <Text> {errorMessage}</Text> : null}

            <Text>We have found {results.length} results</Text>
        </View>
    )
}

const styles =StyleSheet.create({});

export default SearchScreen;