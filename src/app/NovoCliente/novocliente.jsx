import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar/navbar";
import "../EditarCliente/editarcliente.css";
import firebase from "../Config/firebase";

function NovoCliente() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [fone, setFone] = useState("");
  const [sexo, setSexo] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [adm, setAdm] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");
  const [email, setEmail] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState("N");
  const db = firebase.firestore();
  








  function CadastrarCliente() {
    if (nome.length === 0) {
      setMensagem("Informe o nome");
    } else if (endereco.length === 0) {
      setMensagem("Informe o e-mail");
    } else {
      db.collection("clientes")
        .add({
          nome: nome,
          endereco: endereco,
          fone: fone,
          sexo: sexo,
          nascimento: nascimento,
          cargo: cargo,
          adm: adm,
          setor: setor,
          salario: salario,
          email: email,
          nacionalidade: nacionalidade,
          sobrenome: sobrenome,
        })
        .then(() => {
          setMensagem("");
          setSucesso("S");
        })
        .catch((erro) => {
          setMensagem(erro);
          setSucesso("N");
        });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid titulo">
        <div className="Forms">
          <h2>Fale-nos um pouco sobre você</h2>

          <form className="classform">
            <div className="informacoes">
              <div className="nomes">
              <input
                  placeholder="nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                  type="text"
                  className="input"
                  id="nomeInput"
                  aria-describedby="emailHelp"
                />
            
               
                  <input
                  placeholder="Sobrenome"
                    onChange={(e) => setSobrenome(e.target.value)}
                    type="text"
                    className="input"
                    id="sobrenomeInput"
                    aria-describedby="emailHelp"
                  />
                
              </div>

            </div>

           
             
              <input
              placeholder="Cargo"
                onChange={(e) => setCargo(e.target.value)}
                type="text"
                className="input"
                id="cargoInput"
                aria-describedby="emailHelp"
              />
           

            
              
              <input
              placeholder="Endereço"
                onChange={(e) => setEndereco(e.target.value)}
                type="text"
                className="input"
                id="enderecoInput"
                aria-describedby="emailHelp"
              />
           

           
              
              <input
              placeholder="Sexo"
                onChange={(e) => setSexo(e.target.value)}
                type="text"
                className="input"
                id="sexoInput"
                aria-describedby="emailHelp"
              />
            

            
              
            <div className="elementos">
              <div className="telemail">
                <input
                  placeholder="fone"
                  onChange={(e) => setFone(e.target.value)}
                  type="text"
                  className="input"
                  id="foneInput"
                  aria-describedby="emailHelp"
                />

                <input
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="input"
                  id="emailInput"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="nascimento">
                <input
                  placeholder="Nacionalidade"
                  onChange={(e) => setNacionalidade(e.target.value)}
                  type="text"
                  className="input"
                  id="nacionalidadeInput"
                  aria-describedby="emailHelp"
                />

                <input
                  placeholder="Data de nascimento"
                  onChange={(e) => setNascimento(e.target.value)}
                  type="date"
                  className="input"
                  id="nascimentoInput"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          

            
              <input
              placeholder="Data de Admissão"
                onChange={(e) => setAdm(e.target.value)}
                type="date"
                className="input"
                id="admInput"
                aria-describedby="emailHelp"
              />
            

            
              <input
              placeholder="Setor"
                onChange={(e) => setSetor(e.target.value)}
                type="text"
                className="input"
                id="setorInput"
                aria-describedby="emailHelp"
              />
          

            
              <input
              placeholder="Salário"
                onChange={(e) => setSalario(e.target.value)}
                type="text"
                className="input"
                id="salarioInput"
                aria-describedby="emailHelp"
              />
           

            <div className="text-center">
              <Link to="/app/home" className="btn btn-outline-primary btn-acao">
                Cancelar
              </Link>
              <button
                onClick={CadastrarCliente}
                type="button"
                className="btn btn-primary btn-acao"
              >
                Salvar
              </button>
            </div>

            {mensagem.length > 0 ? (
              <div className="alert alert-danger mt-2" role="alert">
                {mensagem}
              </div>
            ) : null}
            {sucesso === "S" ? <Redirect to="/app/home" /> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NovoCliente;