import React, { useState, useEffect } from 'react';
import firebase from '../Config/firebase';

function ClientChangeHistory(props) {
    const [changeHistory, setChangeHistory] = useState([]);
    const db = firebase.firestore();

    useEffect(() => {
        // Load change history for the client
        const unsubscribe = db
            .collection('client_history')
            .doc(props.clientId)
            .collection('changes')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                const history = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();

                    // Check if the data is different from the last entry in the history
                    if (
                        history.length === 0 ||
                        !isDataEqual(history[0], data)
                    ) {
                        history.unshift(data);
                    }
                });

                setChangeHistory(history);
            });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }, [props.clientId, db]);

    // Function to compare if two data objects are equal
    const isDataEqual = (data1, data2) => {
        // Implement your comparison logic here, e.g., compare field values
        return (
            data1.fieldName === data2.fieldName &&
            data1.oldValue === data2.oldValue &&
            data1.newValue === data2.newValue
        );
    };

    return (
        <div>
            <h2>Histórico de mudanças</h2>
            <ul>
                {changeHistory.map((entry, index) => (
                    <li key={index}>
                        {new Date(entry.timestamp.toDate()).toLocaleString()}: alteração
                        {entry.changes.map((change, i) => (
                            <div key={i}>
                                - Campo: {change.fieldName}, valor anterior: {change.oldValue}, Novo
                                Valor: {change.newValue}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientChangeHistory;
