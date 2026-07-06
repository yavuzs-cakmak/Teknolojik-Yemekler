describe('Pizza Sipariş Formu Testleri', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:5173/PizzaSiparisi');
  });

  it('İsim ve Notlar inputuna metin girilmeli ve değerler doğrulanmalı', () => {
    const testIsmi = 'Ahmet Yılmaz';
    const testNotu = 'Lütfen zile basmayın, bebek uyuyor.';

    cy.get('[data-cy="isim-input"]')
      .type(testIsmi)
      .should('have.value', testIsmi);

    cy.get('[data-cy="notlar-input"]')
      .type(testNotu)
      .should('have.value', testNotu);
  });

  it('Birden fazla ek malzeme seçilebilmeli ve seçili durumda olmalı', () => {
    cy.get('[data-cy="malzeme-Pepperoni"]').check().should('be.checked');
    cy.get('[data-cy="malzeme-Sosis"]').check().should('be.checked');
    cy.get('[data-cy="malzeme-Mısır"]').check().should('be.checked');
    cy.get('[data-cy="malzeme-Domates"]').check().should('be.checked');

    cy.get('[data-cy="malzeme-Ananas"]').should('not.be.checked');
  });

  it('Tüm zorunlu alanlar doldurulduğunda form başarıyla gönderilmeli ve onay sayfasına geçilmeli', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza').as('siparisGonder');

    cy.get('[data-cy="orta-boyut"]').check(); 
    cy.get('[data-cy="hamur-secimi"]').select('İnce'); 
    
    cy.get('[data-cy="malzeme-Pepperoni"]').check(); 
    cy.get('[data-cy="malzeme-Sosis"]').check();
    cy.get('[data-cy="malzeme-Domates"]').check();
    cy.get('[data-cy="malzeme-Mısır"]').check();

    cy.get('[data-cy="isim-input"]').type('Frontend Geliştirici');

    cy.get('[data-cy="submit-button"]')
      .should('not.be.disabled')
      .click();

    cy.wait('@siparisGonder').its('response.statusCode').should('eq', 201);

    cy.url().should('include', '/Onay');
    cy.contains('TEBRİKLER!').should('be.visible');
  });



it('En az 4 malzeme seçilmediğinde veya isim 5 karakterden az olduğunda buton disabled kalmalı', () => {
  cy.get('[data-cy="malzeme-Pepperoni"]').check();
  cy.get('[data-cy="malzeme-Sosis"]').check();
  
  cy.get('[data-cy="isim-input"]').type('Ali');

  cy.get('[data-cy="submit-button"]').should('be.disabled');

  cy.contains('En az 4, en fazla 10 malzeme seçebilirsiniz.').should('be.visible');
  cy.contains('Ad ve Soyad toplam en az 5 karakter olmalıdır.').should('be.visible');
  });

  it('10 malzeme seçildiğinde geri kalan malzemeler seçilemez (disabled) olmalı', () => {
  const onMalzeme = [
    'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 
    'Soğan', 'Domates', 'Mısır', 'Sucuk', 'Jalapeno', 'Sarımsak'
  ];

  onMalzeme.forEach(malzeme => {
    cy.get(`[data-cy="malzeme-${malzeme}"]`).check();
  });

  cy.get('[data-cy="malzeme-Biber"]').should('be.disabled');
});

it('Adet artırıldığında sipariş toplam tutarı doğru hesaplanmalı', () => {
 
  cy.get('[data-cy="malzeme-Pepperoni"]').check();
  cy.get('[data-cy="malzeme-Sosis"]').check();
  cy.get('[data-cy="malzeme-Mısır"]').check();
  cy.get('[data-cy="malzeme-Domates"]').check();

  cy.get('[data-cy="counter-arttir"]').click();

  cy.get('[data-cy="counter-value"]').should('have.text', '2');

  cy.contains('211.00₺').should('be.visible');
});
});

describe('Anasayfa Navigasyon Testleri', () => {
it('Anasayfadan ACIKTIM butonuna basılarak sipariş formuna gidilebilmeli', () => {
  cy.visit('http://localhost:5173/');
  cy.get('[data-cy="aciktim-button"]').click();
  cy.url().should('include', '/PizzaSiparisi');
  cy.get('[data-cy="pizza-baslik"]')
    .should('be.visible')
    .and('have.text', 'Position Absolute Acı Pizza');
});
});
