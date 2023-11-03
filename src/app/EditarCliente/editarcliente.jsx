import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar/navbar";
import firebase from "../Config/firebase";
import "firebase/firestore";
import ClientChangeHistory from "../Historico/ClientChangeHistory";
import "./editarcliente.css";

function EditarCliente(props) {
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

  useEffect(() => {
    firebase
      .firestore()
      .collection("clientes")
      .doc(props.match.params.id)
      .get()
      .then((resultado) => {
        setNome(resultado.data().nome);
        setEndereco(resultado.data().endereco);
        setFone(resultado.data().fone);
        setSexo(resultado.data().sexo);
        setNascimento(resultado.data().nascimento);
        setCargo(resultado.data().cargo);
        setAdm(resultado.data().adm);
        setSetor(resultado.data().setor);
        setSalario(resultado.data().salario);
        setEmail(resultado.data().email);
        setNacionalidade(resultado.data().nacionalidade);
        setSobrenome(resultado.data().sobrenome);
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
      setMensagem("Informe o nome");
    } else if (endereco.length === 0) {
      setMensagem("Informe o endereço");
    } else {
      db.collection("clientes")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          const data = doc.data();
          const changes = [];

          if (data.nome !== nome) {
            changes.push(createChangeRecord("nome", data.nome, nome));
          }
          if (data.endereco !== endereco) {
            changes.push(
              createChangeRecord("endereco", data.endereco, endereco)
            );
          }
          if (data.fone !== fone) {
            changes.push(createChangeRecord("fone", data.fone, fone));
          }
          if (data.sexo !== sexo) {
            changes.push(createChangeRecord("sexo", data.sexo, sexo));
          }
          if (data.sexo !== nascimento) {
            changes.push(
              createChangeRecord("nascimento", data.nascimento, nascimento)
            );
          }
          if (data.cargo !== cargo) {
            changes.push(createChangeRecord("cargo", data.cargo, cargo));
          }
          if (data.adm !== adm) {
            changes.push(createChangeRecord("adm", data.adm, adm));
          }
          if (data.setor !== setor) {
            changes.push(createChangeRecord("setor", data.setor, setor));
          }
          if (data.salario !== salario) {
            changes.push(createChangeRecord("salario", data.salario, salario));
          }
          if (data.email !== email) {
            changes.push(createChangeRecord("email", data.email, email));
          }
          if (data.nacionalidade !== nacionalidade) {
            changes.push(
              createChangeRecord(
                "nacionalidade",
                data.nacionalidade,
                nacionalidade
              )
            );
          }
          if (data.sobrenome !== sobrenome) {
            alert("Preencha o campo sobrenome");
            changes.push(
              createChangeRecord("sobrenome", data.sobrenome, sobrenome)
            );
          }

          return db
            .collection("clientes")
            .doc(props.match.params.id)
            .update({
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

              if (changes.length > 0) {
                db.collection("client_history")
                  .doc(props.match.params.id)
                  .collection("changes")
                  .add({
                    timestamp: new Date(),
                    changes,
                  });
              }
            });
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
          <h2>Editar Cliente</h2>

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
                  placeholder="sobrenome"
                  onChange={(e) => setSobrenome(e.target.value)}
                  value={sobrenome}
                  type="text"
                  className="input"
                  id="sobrenomeInput"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="foto"></div>
            </div>

            <input
              placeholder="Cargo"
              onChange={(e) => setCargo(e.target.value)}
              value={cargo}
              type="text"
              className="input"
              id="cargoInput"
              aria-describedby="emailHelp"
            />

            <input
              placeholder="Endereço"
              onChange={(e) => setEndereco(e.target.value)}
              value={endereco}
              type="text"
              className="input"
              id="enderecoInput"
              aria-describedby="emailHelp"
            />

            <input
              placeholder="Sexo"
              onChange={(e) => setSexo(e.target.value)}
              value={sexo}
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
                  value={fone}
                  type="text"
                  className="input"
                  id="foneInput"
                  aria-describedby="emailHelp"
                />

                <input
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  value={nacionalidade}
                  type="text"
                  className="input"
                  id="nacionalidadeInput"
                  aria-describedby="emailHelp"
                />

                <input
                  placeholder="Data de nascimento"
                  onChange={(e) => setNascimento(e.target.value)}
                  value={nascimento}
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
              value={adm}
              type="date"
              className="input"
              id="admInput"
              aria-describedby="emailHelp"
            />

            <input
              placeholder="Setor"
              onChange={(e) => setSetor(e.target.value)}
              value={setor}
              type="text"
              className="input"
              id="setorInput"
              aria-describedby="emailHelp"
            />

            <input
              placeholder="Salário"
              onChange={(e) => setSalario(e.target.value)}
              value={salario}
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
                onClick={AlterarCliente}
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

      <ClientChangeHistory clientId={props.match.params.id} />
    </div>
  );
}

export default EditarCliente;
