import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function clientesPDF(clientes) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Título do relatório
  const reportTitle = [
    {
      text: 'Clientes',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45] // left, top, right, bottom
    }
  ];

  // Dados dos clientes
  const dados = clientes.map((cliente) => {
    return [
      { text: cliente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.endereco, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.fone, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.sexo, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.nascimento, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.cargo, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.adm, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.setor, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: cliente.salario, fontSize: 9, margin: [0, 2, 0, 2] }
    ];
  });

  // Detalhes da tabela
  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'Endereço', style: 'tableHeader', fontSize: 10 },
            { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
            { text: 'Sexo', style: 'tableHeader', fontSize: 10 },
            { text: 'Nascimento', style: 'tableHeader', fontSize: 10 },
            { text: 'Cargo', style: 'tableHeader', fontSize: 10 },
            { text: 'Data de Admissão', style: 'tableHeader', fontSize: 10 },
            { text: 'Setor', style: 'tableHeader', fontSize: 10 },
            { text: 'Salario', style: 'tableHeader', fontSize: 10 }
          ],
          ...dados
        ]
      },
      layout: 'lightHorizontalLines' // headerLineOnly
    }
  ];

  // Rodapé do documento
  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0] // left, top, right, bottom
      }
    ];
  }

  // Configurações do documento
  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape
  };

  // Cria e faz o download do PDF
  pdfMake.createPdf(docDefinitions).download();
}

export default clientesPDF;
