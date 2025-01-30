import { Component } from '@angular/core';

@Component({
  selector: 'app-fuck',
  templateUrl: './fuck.component.html',
  styleUrls: ['./fuck.component.css']
})
export class FuckComponent {


   // Método para abrir o link do WhatsApp
   sendWhatsApp() {
    const whatsappLink = 'https://wa.me/5511978327459'; // Link com seu número
    window.open(whatsappLink, '_blank'); // Abre o link em uma nova aba
  }

  
  faqs = [
    { question: 'Quem te fez essas perguntas?', answer: 'Ninguém.', open: false },
    { question: 'Se eu comprar uma caneca, ela vai chegar?', answer: 'Sim, se o Correios permitir e não agredir muito a encomenda (protegida com espumas).', open: false },
    { question: 'Consigo comprar sem criar conta no app?', answer: 'Sim, na verdade é o único jeito, porque estou com preguiça de programar essa parte.', open: false },
    { question: 'Como é feito o pagamento?', answer: 'O pagamento é feito com PagSeguro, onde você coloca seu e-mail e faz o pagamento com Pix ou Cartão de Débito e Crédito.', open: false },
    { question: 'Tem cupom de desconto?', answer: 'Óbvio que não, já tem um desconto de 345,90 para 34,90, vocês querem me falir mesmo.', open: false },
    { question: 'Vocês só têm canecas brancas simples de porcelana?', answer: 'Sim, isso é uma crítica?', open: false },
    { question: 'Como é a qualidade da imagem das canecas?', answer: 'Depende do meme que você escolher, se a qualidade for ruim, faz parte do aesthetic.', open: false },
    { question: 'Podemos fazer críticas às canecas e ao site?', answer: 'Não.', open: false },
    { question: 'Não tem como salvar as canecas nos favoritos para eu comprar depois?', answer: 'Use o carrinho como favoritos, eles não vão ser removidos, a não ser que você limpe os cookies do navegador.', open: false },
    { question: 'Podemos enviar memes para seu WhatsApp?', answer: 'Pode, porém não garanto que vai virar uma caneca.', open: false },
    { question: 'Podemos criar nossas próprias canecas?', answer: 'Sim, é só usar a ferramenta de criar canecas e não cometer nenhum crime na imagem, é importante.', open: false },
    { question: 'Podemos sugerir mudanças no site e criação de categorias etc?', answer: 'Sim, mande no WhatsApp suas sugestões e eu vou pensar se crio ou não.', open: false },
    { question: 'Como é feito o envio?', answer: 'O envio é feito pelos Correios. Tanto eu quanto você temos que rezar para as canecas chegarem inteiras. Caso haja algum problema com a caneca, fazemos o reembolso.', open: false },
    { question: 'Tem reembolso e devolução?', answer: 'Apenas em caso de quebras no envio, mas por arrependimento, um abraço, seu dinheiro virou sushi na minha mesa.', open: false },
    { question: 'Tem galantia?', answer: 'Não tem galantia, complou pq quis.', open: false },
    { question: 'Quem cria as canecas?', answer: 'A arte é feita com memes da Internet, e a caneca é feita com as máquinas de sublimação da loja da minha irmã, a GeekCo.', open: false },
    { question: 'Quem é você e qual o objetivo da loja?', answer: 'Sou Gabriel, 23 anos, programador e estudante de TI. Fiz esse site para vender canecas com imagens engraçadas. O objetivo é fazer uma renda extra e dar risada com as canecas absurdas.', open: false },
    { question: 'Por que o nome Memes in Mugs?', answer: 'Porque tem memes nas canecas. Bem criativo, né? Gostou?', open: false },
    { question: 'Por que tem tanto meme de animais?', answer: 'Porque tem muitos memes de animais e eles são engraçados e fofinhos.', open: false },
    { question: 'Quando vai ter canecas boas?', answer: 'Se depender de mim, nunca! Sempre estarei aqui lutando pela baixa qualidade e o chorume, não se preocupem.', open: false }
  ];

  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
