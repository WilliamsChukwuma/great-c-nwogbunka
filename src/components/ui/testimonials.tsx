
import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Review {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  created_at?: string;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newReview, setNewReview] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Fetch reviews from Supabase on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      
      if (!supabase) {
        console.error('Supabase client not available');
        // Fallback to localStorage if Supabase is not available
        const savedReviews = localStorage.getItem('customer-reviews');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('Fetching reviews from Supabase');
        const { data, error } = await supabase
          .from('customer_reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching reviews:', error);
          // Fallback to localStorage if Supabase query fails
          const savedReviews = localStorage.getItem('customer-reviews');
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
          }
        } else {
          console.log('Reviews fetched successfully:', data);
          setReviews(data || []);
        }
      } catch (error) {
        console.error('Error in fetchReviews:', error);
        // Fallback to localStorage if try/catch fails
        const savedReviews = localStorage.getItem('customer-reviews');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.content) {
      toast({
        title: "Missing information",
        description: "Please provide your name and review content.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: formattedDate
    };
    
    try {
      if (supabase) {
        console.log('Saving review to Supabase');
        const { data, error } = await supabase
          .from('customer_reviews')
          .insert([
            { 
              name: review.name,
              company: review.company,
              content: review.content,
              rating: review.rating,
              date: formattedDate,
              created_at: currentDate.toISOString()
            }
          ])
          .select();
        
        if (error) {
          console.error('Error saving review to Supabase:', error);
          // Fall back to localStorage
          const allReviews = [review, ...reviews];
          localStorage.setItem('customer-reviews', JSON.stringify(allReviews));
          setReviews(allReviews);
        } else {
          console.log('Review saved to Supabase:', data);
          // Update with the data from Supabase
          const newReviewFromDB = data[0];
          setReviews(prev => [newReviewFromDB, ...prev]);
        }
      } else {
        // Fallback to localStorage
        const allReviews = [review, ...reviews];
        localStorage.setItem('customer-reviews', JSON.stringify(allReviews));
        setReviews(allReviews);
      }
      
      setNewReview({
        name: '',
        company: '',
        content: '',
        rating: 5
      });
      
      setIsFormOpen(false);
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience!",
      });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast({
        title: "Error submitting review",
        description: "There was a problem saving your review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
  };

  return (
    <div ref={sectionRef} className="py-24 sm:py-32 bg-brand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={`inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Customer Testimonials
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            What Our Clients Say
          </h2>
          <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Hear from professionals who rely on Great C Nwogbunka for their building material needs
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
        }`}>
          <Button 
            onClick={toggleForm} 
            size="lg" 
            className="mx-auto block"
          >
            {isFormOpen ? "Cancel" : "Share Your Experience"}
          </Button>
        </div>
        
        {/* Review Form */}
        {isFormOpen && (
          <div className={`max-w-3xl mx-auto mb-16 transition-all duration-500 ${
            isFormOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Write a Review</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={newReview.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                  <textarea
                    id="content"
                    name="content"
                    value={newReview.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" variant="outline" className="mr-2" onClick={toggleForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Reviews Display */}
        <div className={`space-y-8 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
              {!isFormOpen && (
                <Button variant="outline" onClick={toggleForm}>
                  Write a Review
                </Button>
              )}
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-6 sm:p-8 transition hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{review.name}</h3>
                    {review.company && (
                      <p className="text-gray-600 text-sm">{review.company}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">"{review.content}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
