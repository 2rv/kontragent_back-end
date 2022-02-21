import { CreatePdfDto } from 'src/core/revision-share/dto/create-revision-share.dto';

export default function (data: CreatePdfDto) {
  const { id, createDate, inn, name, price } = data;

  return `
	<!doctype html>
	<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
      rel="stylesheet"
    />
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

    <h2>Сумма</h2>
    <h3>${price} ₽</h3>

    <h2>Дата создания</h2>
    <h3>${createDate}</h3>

    <h2>ИНН Компании</h2>
    <h3>${inn}</h3>
  </body>
</html>
	`;
}
