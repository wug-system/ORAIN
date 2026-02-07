import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Star, Heart, User, Menu, X, Filter, ChevronRight, Eye, Download, Clock, TrendingUp, Sparkles, LogOut, CreditCard, Package, Settings, Bell } from 'lucide-react';

const OrainPlatform = () => {
  // State Management
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [reviews, setReviews] = useState({});
  const [userReview, setUserReview] = useState({ rating: 5, comment: '' });

  // Load data from storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const cartData = await window.storage.get('orain-cart', false);
      const wishlistData = await window.storage.get('orain-wishlist', false);
      const userData = await window.storage.get('orain-user', false);
      const reviewsData = await window.storage.get('orain-reviews', true);

      if (cartData) setCart(JSON.parse(cartData.value));
      if (wishlistData) setWishlist(JSON.parse(wishlistData.value));
      if (userData) setUser(JSON.parse(userData.value));
      if (reviewsData) setReviews(JSON.parse(reviewsData.value));
    } catch (error) {
      console.log('Loading initial data...');
    }
  };

  // Save to storage
  const saveCart = async (newCart) => {
    setCart(newCart);
    await window.storage.set('orain-cart', JSON.stringify(newCart), false);
  };

  const saveWishlist = async (newWishlist) => {
    setWishlist(newWishlist);
    await window.storage.set('orain-wishlist', JSON.stringify(newWishlist), false);
  };

  const saveUser = async (newUser) => {
    setUser(newUser);
    await window.storage.set('orain-user', JSON.stringify(newUser), false);
  };

  const saveReviews = async (newReviews) => {
    setReviews(newReviews);
    await window.storage.set('orain-reviews', JSON.stringify(newReviews), true);
  };

  // Sample Prompts Data
  const prompts = [
    {
      id: 1,
      title: "SEO Blog Writer Pro",
      description: "Generate SEO-optimized blog posts with perfect structure, keywords, and engaging content",
      category: "content",
      price: 99000,
      rating: 4.8,
      reviews: 156,
      author: "ContentMaster",
      image: "📝",
      tags: ["SEO", "Blog", "Content"],
      sales: 1250,
      featured: true
    },
    {
      id: 2,
      title: "Instagram Caption Generator",
      description: "Create viral Instagram captions with hashtags and emojis for maximum engagement",
      category: "social-media",
      price: 49000,
      rating: 4.9,
      reviews: 342,
      author: "SocialGenius",
      image: "📱",
      tags: ["Instagram", "Social", "Marketing"],
      sales: 2100,
      featured: true
    },
    {
      id: 3,
      title: "Code Documentation Master",
      description: "Automatically generate comprehensive documentation for your code projects",
      category: "development",
      price: 149000,
      rating: 4.7,
      reviews: 89,
      author: "DevPro",
      image: "💻",
      tags: ["Code", "Documentation", "Dev"],
      sales: 567,
      featured: false
    },
    {
      id: 4,
      title: "Product Description Creator",
      description: "Write compelling product descriptions that convert browsers into buyers",
      category: "ecommerce",
      price: 79000,
      rating: 4.6,
      reviews: 203,
      author: "EcomExpert",
      image: "🛍️",
      tags: ["E-commerce", "Product", "Sales"],
      sales: 890,
      featured: true
    },
    {
      id: 5,
      title: "Email Marketing Wizard",
      description: "Craft high-converting email campaigns with proven templates and strategies",
      category: "marketing",
      price: 129000,
      rating: 4.9,
      reviews: 445,
      author: "MarketingPro",
      image: "📧",
      tags: ["Email", "Marketing", "Conversion"],
      sales: 1678,
      featured: true
    },
    {
      id: 6,
      title: "AI Art Prompt Generator",
      description: "Create stunning AI art prompts for Midjourney, DALL-E, and Stable Diffusion",
      category: "creative",
      price: 89000,
      rating: 4.8,
      reviews: 567,
      author: "ArtisticAI",
      image: "🎨",
      tags: ["Art", "Creative", "AI"],
      sales: 2340,
      featured: true
    },
    {
      id: 7,
      title: "YouTube Script Writer",
      description: "Generate engaging YouTube video scripts that keep viewers watching",
      category: "content",
      price: 119000,
      rating: 4.7,
      reviews: 234,
      author: "VideoMaster",
      image: "🎥",
      tags: ["YouTube", "Video", "Script"],
      sales: 1123,
      featured: false
    },
    {
      id: 8,
      title: "LinkedIn Post Creator",
      description: "Write professional LinkedIn posts that get engagement and generate leads",
      category: "social-media",
      price: 69000,
      rating: 4.8,
      reviews: 178,
      author: "B2BExpert",
      image: "💼",
      tags: ["LinkedIn", "B2B", "Professional"],
      sales: 765,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Prompts', icon: '🎯' },
    { id: 'content', name: 'Content Writing', icon: '📝' },
    { id: 'social-media', name: 'Social Media', icon: '📱' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛍️' },
    { id: 'marketing', name: 'Marketing', icon: '📧' },
    { id: 'creative', name: 'Creative', icon: '🎨' }
  ];

  // Functions
  const addToCart = async (prompt) => {
    if (!cart.find(item => item.id === prompt.id)) {
      await saveCart([...cart, prompt]);
    }
  };

  const removeFromCart = async (promptId) => {
    await saveCart(cart.filter(item => item.id !== promptId));
  };

  const toggleWishlist = async (prompt) => {
    if (wishlist.find(item => item.id === prompt.id)) {
      await saveWishlist(wishlist.filter(item => item.id !== prompt.id));
    } else {
      await saveWishlist([...wishlist, prompt]);
    }
  };

  const addReview = async (promptId) => {
    if (!user) {
      alert('Please login to add a review');
      return;
    }
    
    const newReviews = { ...reviews };
    if (!newReviews[promptId]) newReviews[promptId] = [];
    
    newReviews[promptId].push({
      user: user.name,
      rating: userReview.rating,
      comment: userReview.comment,
      date: new Date().toISOString()
    });
    
    await saveReviews(newReviews);
    setUserReview({ rating: 5, comment: '' });
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      setCurrentPage('auth');
      return;
    }
    setCurrentPage('checkout');
  };

  const handlePakasirPayment = () => {
    // Pakasir Integration - User will need to provide their API key and slug
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    
    alert(`Integrating with Pakasir...\n\nTotal: Rp ${totalAmount.toLocaleString('id-ID')}\n\nNote: Add your Pakasir API key and slug in the code to complete integration.`);
    
    // Example Pakasir API call structure:
    // fetch('https://api.pakasir.com/v1/transaction', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify({
    //     slug: 'YOUR_SLUG',
    //     amount: totalAmount,
    //     customer_name: user.name,
    //     customer_email: user.email,
    //     items: cart.map(item => ({
    //       name: item.title,
    //       price: item.price,
    //       quantity: 1
    //     }))
    //   })
    // })
  };

  const login = async (email, password) => {
    // Simple demo login
    const newUser = {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      purchases: []
    };
    await saveUser(newUser);
    setCurrentPage('home');
  };

  const logout = async () => {
    await window.storage.delete('orain-user', false);
    setUser(null);
    setCurrentPage('home');
  };

  // Filter and sort prompts
  const filteredPrompts = prompts
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'popular': return b.sales - a.sales;
        default: return 0;
      }
    });

  // Components
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3 group"
            >
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                ORAIN
              </div>
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage('catalog')}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
              >
                Catalog
              </button>
              <button className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Trending
              </button>
              <button className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
                New
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage('wishlist')}
              className="relative p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-purple-400 text-purple-400' : 'text-gray-400'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400 hidden sm:block">{user.name}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Login
              </button>
            )}

            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-8 border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Premium AI Prompts Marketplace</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Unlock AI Power
            </span>
            <br />
            <span className="text-white">With Expert Prompts</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover, purchase, and master AI prompts crafted by professionals. Boost your productivity and creativity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Explore Prompts
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Featured Prompts</h2>
              <p className="text-gray-400">Top-rated prompts from our community</p>
            </div>
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.filter(p => p.featured).slice(0, 6).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                500+
              </div>
              <div className="text-gray-400 font-medium">Premium Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                10K+
              </div>
              <div className="text-gray-400 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                4.8★
              </div>
              <div className="text-gray-400 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                24/7
              </div>
              <div className="text-gray-400 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const PromptCard = ({ prompt }) => {
    const isInWishlist = wishlist.find(item => item.id === prompt.id);
    const isInCart = cart.find(item => item.id === prompt.id);

    return (
      <div 
        className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">{prompt.image}</div>
            <button 
              onClick={() => toggleWishlist(prompt)}
              className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-purple-400 text-purple-400' : 'text-gray-400'}`} />
            </button>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {prompt.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {prompt.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">{prompt.rating}</span>
              <span className="text-xs text-gray-400">({prompt.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">{prompt.sales} sales</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Rp {prompt.price.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-gray-500">by {prompt.author}</div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSelectedPrompt(prompt);
                  setCurrentPage('detail');
                }}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              
              {isInCart ? (
                <button 
                  onClick={() => setCurrentPage('cart')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm"
                >
                  View Cart
                </button>
              ) : (
                <button 
                  onClick={() => addToCart(prompt)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CatalogPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts, categories, tags..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-bold">{filteredPrompts.length}</span> prompts
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No prompts found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );

  const DetailPage = () => {
    if (!selectedPrompt) return null;

    const promptReviews = reviews[selectedPrompt.id] || [];
    const avgRating = promptReviews.length > 0
      ? promptReviews.reduce((sum, r) => sum + r.rating, 0) / promptReviews.length
      : selectedPrompt.rating;

    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column */}
            <div>
              <div className="text-8xl mb-8">{selectedPrompt.image}</div>
              
              <h1 className="text-4xl font-black text-white mb-4">
                {selectedPrompt.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-white">{avgRating.toFixed(1)}</span>
                  <span className="text-gray-400">({promptReviews.length + selectedPrompt.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Download className="w-4 h-4" />
                  <span>{selectedPrompt.sales} sales</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedPrompt.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPrompt.tags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-bold">{selectedPrompt.author}</div>
                    <div className="text-sm text-gray-400">Verified Creator</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Purchase */}
            <div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 sticky top-24">
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-6">
                  Rp {selectedPrompt.price.toLocaleString('id-ID')}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400">✓</span>
                    </div>
                    <span>Instant download</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400">✓</span>
                    </div>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400">✓</span>
                    </div>
                    <span>Free updates</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400">✓</span>
                    </div>
                    <span>Premium support</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(selectedPrompt)}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedPrompt)}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
                  >
                    <Heart className={`w-6 h-6 ${wishlist.find(i => i.id === selectedPrompt.id) ? 'fill-purple-400 text-purple-400' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>

            {/* Add Review Form */}
            {user && (
              <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserReview({ ...userReview, rating: star })}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= userReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Comment</label>
                  <textarea
                    value={userReview.comment}
                    onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    rows="4"
                  />
                </div>
                <button
                  onClick={() => addReview(selectedPrompt.id)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Submit Review
                </button>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {promptReviews.map((review, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{review.user}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(review.date).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black text-white mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Add some prompts to get started!</p>
              <button 
                onClick={() => setCurrentPage('catalog')}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Browse Prompts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex gap-6">
                      <div className="text-5xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-white font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
                          Rp {item.price.toLocaleString('id-ID')}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>Rp 0</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-2xl font-black text-white mb-6">
                    <span>Total</span>
                    <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CheckoutPage = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black text-white mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-left hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-bold text-white">Pakasir Payment</div>
                        <div className="text-sm text-gray-400">Secure payment via Pakasir</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Billing Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-300">
                      <span className="flex-1 truncate">{item.title}</span>
                      <span className="ml-4">Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-2xl font-black text-white mb-6">
                  <span>Total</span>
                  <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={handlePakasirPayment}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 mb-3"
                >
                  Pay with Pakasir
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By completing this purchase you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WishlistPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-white mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6">Start adding prompts you love!</p>
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Browse Prompts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-md mx-auto px-4 py-24">
          <div className="text-center mb-8">
            <div className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Welcome to ORAIN
            </div>
            <p className="text-gray-400">Login to continue</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <button
                onClick={() => login(email, password)}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">0</div>
                <div className="text-sm text-gray-400">Purchases</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">{wishlist.length}</div>
                <div className="text-sm text-gray-400">Wishlist Items</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">0</div>
                <div className="text-sm text-gray-400">Reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                {user?.name}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'catalog': return <CatalogPage />;
      case 'detail': return <DetailPage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'wishlist': return <WishlistPage />;
      case 'auth': return <AuthPage />;
      case 'dashboard': return <DashboardPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        body {
          background: #000;
          overflow-x: hidden;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Header />
      {renderPage()}
    </div>
  );
};

export default OrainPlatform;