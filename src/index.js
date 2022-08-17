const url = "https://platzi-avo.vercel.app/api/avo";
const urlBase = 'https://platzi-avo.vercel.app';
const appNode = document.querySelector('#app');

const formatPrice = (price)=> {
  const newPrice = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
  
  return newPrice;
}

// conectarnos al server
window
  .fetch(url)

  // procesar la respuesta y covertir en JSON
  .then(respuesta => respuesta.json())

  // JSON => Data => Renderizar info browser
  .then(responseJson => {
    const todosLosItems = []
    responseJson.data.forEach( item  => {

      // crear imagen
      const imagen = document.createElement('img');
      imagen.src = urlBase + item.image;
      imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

      // crear titulo
      const titulo = document.createElement('h2');
      titulo.textContent = item.name;
      titulo.className = 'text-lg';

      // crear precio
      const precio = document.createElement('div');
      precio.textContent = formatPrice(item.price);
      precio.className = 'text-gray-600';

      // contenedor de textos
      const priceAndTitle = document.createElement('div')
      priceAndTitle.className = 'text-center md:text-left'
      priceAndTitle.append(titulo, precio)

      // contener etiquetas
      const contenedor = document.createElement('div');
      contenedor.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
      

      contenedor.append(imagen, priceAndTitle);

      // agregar elementos a una lista
      todosLosItems.push(contenedor);
    });

    appNode.append(...todosLosItems);
  })