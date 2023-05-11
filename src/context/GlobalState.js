import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function deleteTransaction(id){
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
    
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.res.data.error
            });
        }
    }

    async function getTransactions() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/v1/transactions`);

            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            });

        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.res.data.error
            });
        }
    }

    async function addTransaction(transaction){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/v1/transactions`, transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.res.data.error
            });
        }
    }

    return(<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        }}>
        {children}
    </GlobalContext.Provider>)
}