import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar/navbar';
import './editarcliente.css';
import firebase from '../Config/firebase';
import 'firebase/firestore';
import ClientChangeHistory from '../Historico/ClientChangeHistory';

function EditarCliente(props) {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [fone, setFone] = useState('');
    const [sexo, setSexo] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('N');
    const db = firebase.firestore();

    useEffect(() => {
        firebase.firestore().collection('clientes').doc(props.match.params.id).get().then((resultado) => {
            setNome(resultado.data().nome);
            setEndereco(resultado.data().endereco);
            setFone(resultado.data().fone);
            setSexo(resultado.data().sexo);
        });
    }, [props.match.params.id]);

    function createChangeRecord(fieldName, oldValue, newValue) {
        return {
            fieldName,
            oldValue,
            newValue,
            timestamp: new Date(),
        };
    }

    function AlterarCliente() {
        if (nome.length === 0) {
            setMensagem('Informe o nome');
        } else if (endereco.length === 0) {
            setMensagem('Informe o endereço');
        } else {
            db.collection('clientes')
                .doc(props.match.params.id)
                .get()
                .then((doc) => {
                    const data = doc.data();
                    const changes = [];

                    if (data.nome !== nome) {
                        changes.push(createChangeRecord('nome', data.nome, nome));
                    }
                    if (data.endereco !== endereco) {
                        changes.push(createChangeRecord('endereco', data.endereco, endereco));
                    }
                    if (data.fone !== fone) {
                        changes.push(createChangeRecord('fone', data.fone, fone));
                    }
                    if (data.sexo !== sexo) {
                        changes.push(createChangeRecord('sexo', data.sexo, sexo));
                    }

                    return db.collection('clientes').doc(props.match.params.id).update({
                        nome: nome,
                        endereco: endereco,
                        fone: fone,
                        sexo: sexo,
                    }).then(() => {
                        setMensagem('');
                        setSucesso('S');

                        if (changes.length > 0) {
                            db.collection('client_history')
                                .doc(props.match.params.id)
                                .collection('changes')
                                .add({
                                    timestamp: new Date(),
                                    changes,
                                });
                        }
                    });
                })
                .catch((erro) => {
                    setMensagem(erro);
                    setSucesso('N');
                });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid titulo">
                <div className="offset-lg-3 col-lg-6">
                    <h1>Editar Cliente</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Nome</label>
                            <input onChange={(e) => setNome(e.target.value)} value={nome} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Endereço</label>
                            <input onChange={(e) => setEndereco(e.target.value)} value={endereco} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Fone</label>
                            <input onChange={(e) => setFone(e.target.value)} value={fone} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Sexo</label>
                            <input onChange={(e) => setSexo(e.target.value)} value={sexo} type="text" className="form-control" id="sexoInput" aria-describedby="emailHelp" />
                        </div>

                        <div className="text-center">
                            <Link to="/app/home" className="btn btn-outline-primary btn-acao">Cancelar</Link>
                            <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
                        </div>

                        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                        {sucesso === 'S' ? <Redirect to='/app/home' /> : null}
                    </form>
                </div>
            </div>

            <ClientChangeHistory clientId={props.match.params.id} />
        </div>
    );
}

export default EditarCliente;
