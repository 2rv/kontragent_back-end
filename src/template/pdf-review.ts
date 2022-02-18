import { CreatePdfDto } from 'src/core/pdf-share/dto/create-pdf.dto';

export default function (data: CreatePdfDto) {
  const { id, createDate, inn, name, price } = data;

  return `
	<!doctype html>
	<html>
		 <body>
		 id ${id}
		 createDate ${createDate}
		 inn ${inn}
		 name ${name}
		 price ${price}
		 </body>
	</html>
	`;
}
