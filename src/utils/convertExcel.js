import * as XLSX from 'xlsx';

import storage from 'firebase/storage'

export const convertExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    let workBook = null;
    let jsonData = null;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type:'binary', cellDates:true, cellNF: false, cellText:false});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet,  {dateNF:'dd/mm/yyy'});
        return initial;
      }, {});
      const nameSheet = Object.keys(jsonData)[0]
      const objectData = jsonData[nameSheet];
      console.log(objectData);  
      return resolve(objectData);
    }
    reader.readAsBinaryString(file);
  });
}
