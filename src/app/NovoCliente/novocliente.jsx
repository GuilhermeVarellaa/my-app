import React, { useState } from 'react';
import {Link, Redirect}  from 'react-router-dom';
import Navbar from '../Components/Navbar/navbar';
import './novocliente.css';
import firebase from '../Config/firebase';


function NovoCliente(){

    const [nome, setNome] = useState('');
    const [endereco, setEdereco] = useState('');
    const [fone, setFone] = useState('');
    const [sexo, setSexo] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [cargo, setCargo] = useState('');
    const [adm, setAdm] = useState('');
    const [setor, setSetor] = useState('');
    const [salario, setSalario] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('N');
    const db = firebase.firestore();

    function CadastrarCliente(){

      if (nome.length === 0){
        setMensagem('Informe o nome');
      }
      else if (endereco.length === 0){
        setMensagem('Informe o e-mail');
      }
      else{
          db.collection('clientes').add({
            nome: nome,
            endereco: endereco,
            fone: fone,
            sexo: sexo,
            nascimento: nascimento,
            cargo: cargo,
            adm: adm,
            setor: setor,
            salario: salario,
          }).then(() => {
            setMensagem('');
            setSucesso('S');
          }).catch((erro) =>{
            setMensagem(erro);
            setSucesso('N');
          })
        }
      }

    return <div>
        <Navbar/>
        <div className="container-fluid titulo">

          <div className="offset-lg-3 col-lg-6">
            <h1>Novo Cliente</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="nomeInput" className="form-label">Nome</label>
                <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nomeInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="enderecoInput" className="form-label">Endereço</label>
                <input onChange={(e) => setEdereco(e.target.value)} type="text" className="form-control" id="enderecoInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="foneInput" className="form-label">Fone</label>
                <input  onChange={(e) => setFone(e.target.value)} type="text" className="form-control" id="foneInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="sexoInput" className="form-label">Sexo</label>
                <input  onChange={(e) => setSexo(e.target.value)} type="text" className="form-control" id="sexoInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="nascimentoInput" className="form-label">Nascimento</label>
                <input  onChange={(e) => setNascimento(e.target.value)} type="date" className="form-control" id="nascimentoInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="cargoInput" className="form-label">Cargo</label>
                <input  onChange={(e) => setCargo(e.target.value)} type="text" className="form-control" id="cargoInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="admInput" className="form-label">Data de Admissão</label>
                <input  onChange={(e) => setAdm(e.target.value)} type="date" className="form-control" id="admInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="setorInput" className="form-label">Setor</label>
                <input  onChange={(e) => setSetor(e.target.value)} type="text" className="form-control" id="setorInput" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-4">
                <label htmlFor="salarioInput" className="form-label">Salário</label>
                <input  onChange={(e) => setSalario(e.target.value)} type="text" className="form-control" id="salarioInput" aria-describedby="emailHelp" />              
              </div>


              <div className="text-center">
                <Link to="/app/home" className="btn btn-outline-primary btn-acao">Cancelar</Link>
                <button onClick={CadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
              </div>

              {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
              {sucesso === 'S' ? <Redirect to='/app/home' /> : null}

            </form>
          </div>
        </div>
    </div>;  
  }

export default NovoCliente;