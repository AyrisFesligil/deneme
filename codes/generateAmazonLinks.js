function generateKeywordCombinations(keywords) {
    const combinations = [];
  
    // Her bir kelimeyi tek başına ekle
    for (let i = 0; i < keywords.length; i++) {
      combinations.push([keywords[i]]);
    }
  
    // İkili kombinasyonlar üret
    for (let i = 0; i < keywords.length; i++) {
      for (let j = i + 1; j < keywords.length; j++) {
        combinations.push([keywords[i], keywords[j]]);
      }
    }
  
    return combinations;
  }
  
  // 🔧 Amazon linklerini oluşturan ana fonksiyon
  export function generateAmazonLinks(keywords) {
    const baseUrl = 'https://www.amazon.com/s?k=';
    const combinations = generateKeywordCombinations(keywords);
    const links = [];
  
    combinations.forEach((combo) => {
      const searchQuery = combo.join('+');
      const url = `${baseUrl}${searchQuery}`; // template literal kullandım
      links.push({
        title: combo.join(' '), // Başlık olarak kelimeleri boşlukla birleştir
        url: url,
        image: `https://source.unsplash.com/400x400/?${searchQuery}` // 🔗 Anahtar kelimelere göre rastgele görsel
      });
    });
  
    return links;
  }
  