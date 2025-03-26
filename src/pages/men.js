import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import '../styles/men.css';
import testphoto from '../assets/img/stupid.png';
// Sample product data - in a real app, this would come from an API
const sampleProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Produkt męski ${i + 1}`,
  price: Math.floor(Math.random() * 400) + 99,
  color: ['czarny', 'biały', 'niebieski', 'szary', 'czerwony'][Math.floor(Math.random() * 5)],
  size: ['S', 'M', 'L', 'XL', 'XXL'][Math.floor(Math.random() * 5)],
//   image: `/placeholder.svg?height=300&width=300&text=Produkt+${i + 1}`,
  image: testphoto
}));

const MensCategory = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: { min: 0, max: 1000 }
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    color: true,
    size: true,
    price: true
  });

  const productsPerPage = 30;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Available filter options
  const colorOptions = ['czarny', 'biały', 'niebieski', 'szary', 'czerwony'];
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
  const priceRanges = [
    { min: 0, max: 100, label: 'do 100 zł' },
    { min: 100, max: 200, label: '100 zł - 200 zł' },
    { min: 200, max: 300, label: '200 zł - 300 zł' },
    { min: 300, max: 500, label: '300 zł - 500 zł' },
    { min: 500, max: 1000, label: 'powyżej 500 zł' }
  ];

  // Toggle filter sections
  const toggleFilterSection = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section]
    });
  };

  // Handle color filter changes
  const handleColorFilter = (color) => {
    if (filters.color.includes(color)) {
      setFilters({
        ...filters,
        color: filters.color.filter(c => c !== color)
      });
    } else {
      setFilters({
        ...filters,
        color: [...filters.color, color]
      });
    }
  };

  // Handle size filter changes
  const handleSizeFilter = (size) => {
    if (filters.size.includes(size)) {
      setFilters({
        ...filters,
        size: filters.size.filter(s => s !== size)
      });
    } else {
      setFilters({
        ...filters,
        size: [...filters.size, size]
      });
    }
  };

  // Handle price filter changes
  const handlePriceFilter = (min, max) => {
    setFilters({
      ...filters,
      price: { min, max }
    });
  };

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply color filter
    if (filters.color.length > 0) {
      result = result.filter(product => filters.color.includes(product.color));
    }
    
    // Apply size filter
    if (filters.size.length > 0) {
      result = result.filter(product => filters.size.includes(product.size));
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= filters.price.min && 
      product.price <= filters.price.max
    );
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products]);

  // Handle page change
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      color: [],
      size: [],
      price: { min: 0, max: 1000 }
    });
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Odzież męska</h1>
        <p>{filteredProducts.length} produktów</p>
        
        <button className="mobile-filter-button" onClick={toggleMobileFilters}>
          <Filter size={18} />
          <span>Filtry</span>
        </button>
      </div>

      <div className="category-content">
        {/* Desktop Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2>Filtry</h2>
            {(filters.color.length > 0 || filters.size.length > 0 || filters.price.min > 0 || filters.price.max < 1000) && (
              <button className="clear-filters" onClick={clearFilters}>
                Wyczyść wszystkie
              </button>
            )}
          </div>

          <div className="filter-section">
            <div 
              className="filter-header" 
              onClick={() => toggleFilterSection('color')}
            >
              <h3>Kolor</h3>
              {expandedFilters.color ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            
            {expandedFilters.color && (
              <div className="filter-options">
                {colorOptions.map(color => (
                  <label key={color} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.color.includes(color)}
                      onChange={() => handleColorFilter(color)}
                    />
                    <span className="color-box" style={{ 
                      backgroundColor: 
                        color === 'czarny' ? '#000' : 
                        color === 'biały' ? '#fff' : 
                        color === 'niebieski' ? '#0066cc' : 
                        color === 'szary' ? '#888' : 
                        color === 'czerwony' ? '#cc0000' : '#ddd'
                    }}></span>
                    <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div 
              className="filter-header" 
              onClick={() => toggleFilterSection('size')}
            >
              <h3>Rozmiar</h3>
              {expandedFilters.size ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            
            {expandedFilters.size && (
              <div className="filter-options size-options">
                {sizeOptions.map(size => (
                  <label key={size} className="size-option">
                    <input
                      type="checkbox"
                      checked={filters.size.includes(size)}
                      onChange={() => handleSizeFilter(size)}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div 
              className="filter-header" 
              onClick={() => toggleFilterSection('price')}
            >
              <h3>Cena</h3>
              {expandedFilters.price ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            
            {expandedFilters.price && (
              <div className="filter-options">
                {priceRanges.map((range, index) => (
                  <label key={index} className="filter-option">
                    <input
                      type="radio"
                      name="price-range"
                      checked={filters.price.min === range.min && filters.price.max === range.max}
                      onChange={() => handlePriceFilter(range.min, range.max)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Filters */}
        <div className={`mobile-filters ${mobileFiltersOpen ? 'open' : ''}`}>
          <div className="mobile-filters-header">
            <h2>Filtry</h2>
            <button onClick={toggleMobileFilters}>
              <X size={24} />
            </button>
          </div>

          <div className="mobile-filters-content">
            <div className="filter-section">
              <div 
                className="filter-header" 
                onClick={() => toggleFilterSection('color')}
              >
                <h3>Kolor</h3>
                {expandedFilters.color ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              
              {expandedFilters.color && (
                <div className="filter-options">
                  {colorOptions.map(color => (
                    <label key={color} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.color.includes(color)}
                        onChange={() => handleColorFilter(color)}
                      />
                      <span className="color-box" style={{ 
                        backgroundColor: 
                          color === 'czarny' ? '#000' : 
                          color === 'biały' ? '#fff' : 
                          color === 'niebieski' ? '#0066cc' : 
                          color === 'szary' ? '#888' : 
                          color === 'czerwony' ? '#cc0000' : '#ddd'
                      }}></span>
                      <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-section">
              <div 
                className="filter-header" 
                onClick={() => toggleFilterSection('size')}
              >
                <h3>Rozmiar</h3>
                {expandedFilters.size ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              
              {expandedFilters.size && (
                <div className="filter-options size-options">
                  {sizeOptions.map(size => (
                    <label key={size} className="size-option">
                      <input
                        type="checkbox"
                        checked={filters.size.includes(size)}
                        onChange={() => handleSizeFilter(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-section">
              <div 
                className="filter-header" 
                onClick={() => toggleFilterSection('price')}
              >
                <h3>Cena</h3>
                {expandedFilters.price ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              
              {expandedFilters.price && (
                <div className="filter-options">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="filter-option">
                      <input
                        type="radio"
                        name="price-range-mobile"
                        checked={filters.price.min === range.min && filters.price.max === range.max}
                        onChange={() => handlePriceFilter(range.min, range.max)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-filters-actions">
              <button className="apply-filters" onClick={toggleMobileFilters}>
                Zastosuj filtry
              </button>
              <button className="clear-filters" onClick={clearFilters}>
                Wyczyść wszystkie
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price} zł</p>
                  <div className="product-details">
                    <span className="product-color">Kolor: {product.color}</span>
                    <span className="product-size">Rozmiar: {product.size}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>Nie znaleziono produktów spełniających kryteria.</p>
              <button onClick={clearFilters}>Wyczyść filtry</button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-button prev" 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
            <span>Poprzednia</span>
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => {
                // Add ellipsis
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="pagination-ellipsis">...</span>
                      <button 
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button 
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </button>
                );
              })}
          </div>
          
          <button 
            className="pagination-button next" 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Następna</span>
            <ChevronRight size={20} />
          </button>
          
          <div className="pagination-info">
            Strona {currentPage} z {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default MensCategory;
