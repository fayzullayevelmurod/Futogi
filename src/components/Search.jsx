// import { useState, useEffect } from 'react';
// import assets from '../assets';

// export const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (searchTerm.trim()) {
//         setLoading(true);
//         try {
//           const response = await fetch(`https://api.futoji.ru/products/getByName?s=${searchTerm}`);
//           const data = await response.json();
//           setProducts(data);
//           setError('');
//         } catch (err) {
//           setError('Natijalar yuklanmadi, iltimos qayta urinib ko\'ring');
//           setProducts([]);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setProducts([]);
//         setError('');
//       }
//     };

//     const debounceFetch = setTimeout(fetchProducts, 500);

//     return () => clearTimeout(debounceFetch);
//   }, [searchTerm]);

//   return (
//     <>
//       <button>
//         <img src={assets.headerSearch} alt="" />
//       </button>
//       <input
//         type="search"
//         placeholder="Введите название блюда"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="result_products">
//         {loading && <p className='loading'>Загрузка...</p>}
//         {error && <p>{error}</p>}
//         {/* {products.length === 0 && !loading && !error && searchTerm && <p>Mahsulot topilmadi</p>} */}
//         {products?.data?.map((product) => (
//           <div key={product.id} className="result_products-box">
//             <img src={assets.product1} alt="product img" width={112} height={70} />
//             <div className="product_content">
//               <div className="left_box">
//                 <span className="product_tip">{product.tip}</span>
//                 <h4 className="product_name">{product.name}</h4>
//               </div>
//               <span className="product_price">{product.price}Р</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };


// Search.js
import { useState, useEffect, useContext } from 'react';
import assets from '../assets';
import { Modal } from './Modal';
import { BasketContext } from '../context/BasketContext';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToBasket } = useContext(BasketContext);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.trim()) {
        setLoading(true);
        try {
          const response = await fetch(`https://api.futoji.ru/products/getByName?s=${searchTerm}`);
          const data = await response.json();
          setProducts(data);
          setError('');
        } catch (err) {
          setError('Не удалось загрузить результаты. Повторите попытку.');
          setProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setError('');
      }
    };

    const debounceFetch = setTimeout(fetchProducts, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToBasket = (product) => {
    setShowModal(false);
    addToBasket(product);
    setProducts([]);
    setSearchTerm('');
  };

  return (
    <>
      <button>
        <img src={assets.headerSearch} alt="" />
      </button>
      <input
        type="search"
        placeholder="Введите название блюда"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="result_products">
        {loading && <p className='loading'> Загрузка...</p>}
        {error && <p>{error}</p>}
        {/* {products.length === 0 && !loading && !error && searchTerm && <p className='loading'>Товар не найден</p>} */}
        {products?.data?.map((product) => (
          <div
            key={product.id}
            className="result_products-box"
            onClick={() => handleProductClick(product)}
          >
            <img src={assets.product1} alt="product img" width={112} height={70} />
            <div className="product_content">
              <div className="left_box">
                <span className="product_tip">{product.description}</span>
                <h4 className="product_name">{product.name}</h4>
              </div>
              <span className="product_price">{product.price}Р</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          product={selectedProduct}
          handleAddToBasket={handleAddToBasket}
        />
      )}
    </>
  );
};
