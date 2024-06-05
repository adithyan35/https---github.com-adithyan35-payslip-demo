// function convertToPDF() {
//     const element = document.getElementById('content');
//     html2pdf().from(element).save();
// }

// function convertToWord() {
//     const content = document.getElementById('content').cloneNode(true);

//     // Include form field values
//     const inputs = content.querySelectorAll('input');
//     inputs.forEach(input => {
//         const value = input.value;
//         const span = document.createElement('span');
//         span.textContent = value;
//         input.replaceWith(span);
//     });

//     const blob = new Blob(['<html><body>' + content.innerHTML + '</body></html>'], {
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     });

//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'document.docx';
//     link.click();
// }



// another mentod



// Get the payslip container element
const payslipContainer = document.getElementById('payslip-container');

// Set the payslip data
const payslipData = {
  company_name: 'ABC Company',
  company_address: '123 Main St, Anytown, USA',
  employee_name: 'John Doe',
  employee_id: '12345',
  basic_salary: 5000,
  bonus: 1000,
  overtime: 500,
  epf: 500,
  income_tax: 1000,
  superannuation: 500,
  net_pay: 8000,
  net_pay_in_words: 'Eight Thousand Dollars'
};

// Function to generate the payslip in PDF format
function generatePdf() {
  const pdf = new jsPDF();
  pdf.fromHTML(payslipContainer, 15, 15, {
    'width': 170
  });
  pdf.save('payslip.pdf');
}

// Function to generate the payslip in Word format
function generateWord() {
  const doc = new docxtemplater();
  const content = fs.readFileSync('payslip.docx', 'binary');
  doc.load(content);
  doc.setData(payslipData);
  doc.compile();
  const out = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE'
  });
  fs.writeFileSync('payslip.docx', out, 'binary');
}

// Add event listener to the download button
document.getElementById('download-payslip').addEventListener('click', () => {
  generatePdf();
  generateWord();
});