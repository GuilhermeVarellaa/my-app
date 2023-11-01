import React from 'react';
import {Link} from 'react-router-dom';
import './listacliente.css';

function ListaClientes(props){
    
    return <table className="table table-hover table-bordered">
            <thead>
            <tr className="table-secondary">
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">Endereço</th>
                <th scope="col">Telefone</th>
                <th scope="col">Sexo</th>
                <th scope="col" className="col-acao"></th>
            </tr>
            </thead>
            <tbody>

            {
                props.arrayClientes.map((cliente) => {
                    return <tr key={cliente.id}>
                    <th scope="row">{cliente.id}</th>
                    <td>{cliente.nome}</td>
                    <td>{cliente.endereco}</td>
                    <td>{cliente.fone}</td>
                    <td>{cliente.sexo}</td>
                    <td>
                        <Link to={'/app/editarcliente/' + cliente.id}><i className="fas fa-edit icone-acao"></i></Link>
                        <Link to='#' onClick={() => props.clickDelete(cliente.id)}><i className="far fa-trash-alt icone-acao red"></i></Link>
                    </td>
                </tr>
                })
            }
                       
            
            </tbody>
        </table>
}

export default ListaClientes;