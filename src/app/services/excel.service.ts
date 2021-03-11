import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private datePipe: DatePipe
  ) { }

  downloadWithImage(name: string, header: { name: string; width: number, sheet: number }[], data: any, total: boolean, images: any[], sheets) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    let fileName = name

    const workbook = new Workbook();
   

    sheets.forEach((sh, index) => {
      const worksheet = workbook.addWorksheet(sh);

      let nameHeader = header.filter(h => h.sheet == index).map(el => el.name)
      header.filter(h => h.sheet == index).forEach((h, ind) => {
        worksheet.getColumn(ind + 1).width = h.width;
      })

      let init = 'A1:'
      let end = letters[header.filter(h => h.sheet == index).length - 1] + '1'
      worksheet.autoFilter = init + end

      const headerRow = worksheet.addRow(nameHeader, '');

      headerRow.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4F81BD' }
        };

        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      });

      data.data.filter(h => h.sheet == index).forEach((d, index) => {
        const row = worksheet.addRow(d.rowData, '');

        row.getCell(1).alignment = { horizontal: 'left' };

        row.border = {
          top: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          left: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          bottom: { style: 'thin', color: { argb: 'FFDCE6F1' } },
          right: { style: 'thin', color: { argb: 'FFDCE6F1' } }
        };

        if (index % 2 === 0) {
          row.eachCell(cell => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFDCE6F1' }
            };
          });
        }
      });

      if (total) {
        let totalRow = ['', 'TOTAL'].concat(data.total.find(h => h.sheet == index).data)
        const totrow = worksheet.addRow(totalRow, '');
        totrow.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4F81BD' }
          };

          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        });
      }

      //imagen
      let img = images.find(im => im.sheet == index)
      if (img) {
        
        let height = data.data.filter(h => h.sheet == index).length + 4
        const logo = workbook.addImage({
          base64: img.base,
          extension: 'png',
        });

        worksheet.addImage(logo,  {
          tl: { col: 0, row: height },
          ext: { width: img.width, height: img.height }
        });
        //worksheet.mergeCells(pos);
      }

    })


    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName);
    });
  }
}
