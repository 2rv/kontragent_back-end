import { RevisionEntity } from 'src/core/revision/revision.entity';

export default function (revision: RevisionEntity) {
  const {
    id,
    createDate,
    status,
    price,
    paymentPrice,
    creator,
    company,
    revisionKontragent,
    review,
    filesReview,
  } = revision;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    </head>
  
    <style>
      h1 {
        font-size: 39px;
        font-weight: 800;
        font-style: normal;
        font-family: "Inter", sans-serif;
        color: #2d9cdb;
        margin: 0;
        line-height: 1;
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }
      h2 {
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        font-family: "Inter", sans-serif;
        color: #252525;
        margin: 0;
        line-height: 1;
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }
      h3 {
        font-size: 21px;
        font-style: normal;
        font-family: "Inter", sans-serif;
        color: #707070;
        margin: 0;
        font-weight: 400;
        line-height: 1;
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }
      #divider {
        margin-top: 24px;
        margin-bottom: 24px;
        border-radius: 15px;
        height: 3px;
        width: 100%;
        background-color: #f3f3f3;
      }
      #list {
      }
      #list-item {
        background-color: #f3f3f3;
        padding: 24px;
        border-radius: 15px;
        margin-bottom: 32px;
      }
      span {
        font-size: 16px;
        color: #252525;
        font-weight: 600;
      }
    </style>
  
    <body style="margin: 48px">
      <a href="https://контрагент.рф/" style="text-decoration: none">
        <h1
          style="
            background: linear-gradient(
              126.21deg,
              #2d9cdb 21.14%,
              #0098ee 21.14%,
              #54b6ed 78.86%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Контрагент
        </h1>
      </a>
      
      <div id="divider"></div>

      <h2 style="font-size: 27px">Проверка контрагента №${id}</h2>
      <h3>Информация о заказе на проверку выбранных контрагентов</h3>

      <div id="divider"></div>
  
      <h2>ИНН Компании</h2>
      <h3>${company.inn}</h3>
  
      <h2>Дата создания</h2>
      <h3>${new Date(createDate).toLocaleString()}</h3>
  
      <h2>Сумма</h2>
      <h3>${paymentPrice} ₽</h3>

      <div id="divider"></div>

      <h2 style="font-size: 27px">Контрагенты</h2>
      <div id="list">
        ${revisionKontragent.map((kontragent) => {
          return `
            <div id="list-item">
              <h2>ИНН Компании</h2>
              <h3>${company.inn}</h3>
      
              <h2>Описание</h2>
              <h3>${kontragent.description}</h3>
      
              <h2>Файлы для описания компании</h2>
             ${
               !!kontragent.files?.length
                 ? kontragent.files.map(
                     (file) => `
                <a href="${file.url}" style="padding-right: 10px">
                  <span>${file.originalName}</span>
                </a>
             `,
                   )
                 : '<h3>Файлы не предоставлены</h3>'
             }
    
              <div>
                <h2>Периоды проверки</h2>
                ${kontragent.period.map((period) => {
                  return `
                    <div style="margin-top: 8px">
                      <span
                        >${period.year} Год (
                          ${period.kvartal1 ? ' 1 квартал, ' : ''}
                          ${period.kvartal2 ? ' 2 квартал, ' : ''}
                          ${period.kvartal3 ? ' 3 квартал, ' : ''}
                          ${period.kvartal4 ? ' 4 квартал' : ''}
                        )</span
                      >
                    </div>
                    `;
                })}
              </div>
            </div>
            `;
        })}
      </div>
    </body>
  </html>
  `;
}
