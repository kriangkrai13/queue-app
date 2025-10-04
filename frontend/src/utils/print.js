// Print utility for queue tickets
export const printUtils = {
  // Print queue ticket with specific dimensions (50mm x 60mm)
  printQueueTicket: (queueData) => {
    const {
      queueNumber,
      timestamp,
      waitingCount,
      serviceChannel = ''
    } = queueData;

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=400,height=300');
    
    // Format timestamp
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: '2-digit',  
      day: '2-digit'
    });
    const formattedTime = date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // HTML content for the ticket
    const ticketHTML = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ใบคิว ${queueNumber}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: 50mm 60mm;
            margin: 2mm;
          }
          
          body {
            font-family: 'Prompt', 'Sarabun', sans-serif;
            width: 46mm;
            height: 56mm;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 2mm;
            background: white;
            color: black;
            font-size: 8pt;
            line-height: 1.2;
          }
          
          .header {
            text-align: center;
            width: 100%;
            border-bottom: 1px dashed #333;
            padding-bottom: 1mm;
            margin-bottom: 1mm;
          }
          
          .logo {
            font-size: 12pt;
            font-weight: 700;
            margin-bottom: 1mm;
          }
          
          .shop-name {
            font-size: 7pt;
            font-weight: 500;
          }
          
          .queue-section {
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
          }
          
          .queue-label {
            font-size: 8pt;
            margin-bottom: 1mm;
            font-weight: 500;
          }
          
          .queue-number {
            font-size: 24pt;
            font-weight: 700;
            margin: 2mm 0;
            letter-spacing: 1px;
          }
          
          .service-channel {
            font-size: 7pt;
            margin-top: 1mm;
            font-weight: 500;
          }
          
          .info-section {
            width: 100%;
            font-size: 6pt;
            text-align: center;
            border-top: 1px dashed #333;
            padding-top: 1mm;
          }
          
          .datetime {
            margin-bottom: 1mm;
          }
          
          .waiting-info {
            margin-bottom: 1mm;
          }
          
          .footer-text {
            font-size: 5pt;
            color: #666;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎫 QUEUE</div>
          <div class="shop-name">ระบบจัดการคิว</div>
        </div>
        
        <div class="queue-section">
          <div class="queue-label">หมายเลขคิว</div>
          <div class="queue-number">${queueNumber}</div>
          ${serviceChannel ? `<div class="service-channel">ช่อง: ${serviceChannel}</div>` : ''}
        </div>
        
        <div class="info-section">
          <div class="datetime">
            <div>${formattedDate}</div>
            <div>${formattedTime}</div>
          </div>
          <div class="waiting-info">
            คิวที่รออยู่: ${waitingCount} คิว
          </div>
          <div class="footer-text">
            โปรดเก็บใบคิวไว้
          </div>
        </div>
      </body>
      </html>
    `;

    // Write content to print window
    printWindow.document.write(ticketHTML);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close window after printing (optional)
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    };
  },

  // Print with custom data
  printCustomTicket: (customData) => {
    printUtils.printQueueTicket({
      queueNumber: customData.queueNumber || 'N/A',
      timestamp: customData.timestamp || new Date(),
      waitingCount: customData.waitingCount || 0,
      serviceChannel: customData.serviceChannel || ''
    });
  }
};

export default printUtils;