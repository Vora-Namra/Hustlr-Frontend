
const Testimonials = () => {
    const testimonials = [
    {
        name: "Sarah Chen",
        img: "https://i.pravatar.cc/100?img=1",
        text: "This platform completely transformed my job search! Within 3 weeks, I landed my dream role as a Software Engineer at a top tech company. The resume builder helped me highlight my skills perfectly, and the application tracking feature kept me organized throughout the process. Couldn't recommend it enough!"
    },
    {
        name: "Michael Rodriguez",
        img: "https://i.pravatar.cc/100?img=4",
        text: "After being laid off, I was worried about finding a new position quickly. This platform not only helped me discover relevant job opportunities in my field but also provided great interview preparation resources. Within a month, I had multiple offers to choose from. The job alert feature was particularly helpful."
    },
    {
        name: "Emily Thompson",
        img: "https://i.pravatar.cc/100?img=5",
        text: "As a recent graduate, I was struggling to find entry-level positions that matched my skills. The platform's filtering system helped me find companies that welcome fresh graduates features helped me understand where I stood in the market. I'm now working at an amazing startup, thanks to Hustlr!"
    }
];

    return (
        <div className="min-w-screen min-h-screen bg-mine-shaft-950 text-bright-sun-100">
            <div className="w-full border-t border-b px-5 py-16 md:py-24 border-mine-shaft-700">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto">
                        <h1 className="text-6xl md:text-5xl font-bold mb-5 text-bright-sun-400">What people <br />are saying.</h1>
                        <h3 className="text-xl mb-5 font-light text-bright-sun-400">Here are some testimonials from our users.</h3>
                        <div className="text-center mb-10">
                            <hr/><hr /><hr />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex items-start">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="px-3 md:w-1/3">
                                <div className="w-full mx-auto rounded-lg border p-5 font-light mb-6 bg-mine-shaft-800 border-mine-shaft-700 text-bright-sun-200">
                                    <div className="w-full flex mb-4 items-center">
                                        <div className="overflow-hidden rounded-full w-10 h-10 bg-mine-shaft-950 border border-mine-shaft-700">
                                            <img src={testimonial.img} alt={testimonial.name} />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-bold text-sm uppercase text-mine-shaft-100">{testimonial.name}</h6>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm ">
                                            <span className="text-lg leading-none italic font-bold text-bright-sun-100 mr-1">"</span>
                                            {testimonial.text}
                                            <span className="text-lg leading-none italic font-bold text-bright-sun-100 ml-1">"</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Testimonials;
