import React, { useState, useEffect } from 'react';
import firebase from '../Config/firebase';

function ClientChangeHistory(props) {
    const [changeHistory, setChangeHistory] = useState([]);
    const db = firebase.firestore();

    useEffect(() => {
        // Load change history for the client
        db.collection('client_history')
            .doc(props.clientId)
            .collection('changes')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                const history = [];
                snapshot.forEach((doc) => {
                    history.push(doc.data());
                });
                setChangeHistory(history);
            });
    }, [props.clientId, db]);

    return (
        <div>
            <h2>Historico de mudança</h2>
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
