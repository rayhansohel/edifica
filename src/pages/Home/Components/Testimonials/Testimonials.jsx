import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";

const fakeTestimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    feedback: "Amazing service! Highly recommended.",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.5,
    feedback: "Great experience, but there's room for improvement.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 5,
    feedback: "Amazing service! Highly recommended.",
  },
  {
    id: 4,
    name: "Adam Smith",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    rating: 4,
    feedback: "Good quality, but delivery was a bit late.",
  },
];

// Function to display star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-accent" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-accent" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-500" />);
    }
  }
  return stars;
};

const Testimonials = () => {
  return (
    <section className="pb-8 md:pb-20">
      <SectionTitle title="Testimonials" subtitle="What Our Clients Say" />
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fakeTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 border border-base-300 rounded-box bg-base-100 transition-transform duration-300 5"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p>{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
